import { NextResponse } from "next/server";
import { db as clientDb } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, orderBy, limit as fbLimit } from "firebase/firestore";
import { calculateLeadScore, calculateLeadPriority, getScoreCategory } from "@/lib/crmHelpers";

// Status configuration matching the Admin Dashboard pipeline
const STATUS_CONFIG = {
  new:           { label: "Lead In",          phase: "lead_in" },
  contacted:     { label: "Contacted",        phase: "contact" },
  qualified:     { label: "Researched",       phase: "research" },
  hot:           { label: "Meeting Booked 🔥", phase: "meeting_booked" },
  proposal_sent: { label: "Proposal Sent",    phase: "proposal" },
  won:           { label: "Won 🎉",            phase: "outcome" },
  lost:          { label: "Lost ❌",           phase: "outcome" },
  cold:          { label: "Cold ❄️",           phase: "lead_in" },
  replied:       { label: "Replied",          phase: "contact" },
};

function verifyAgentAuth(request) {
  const authHeader = request.headers.get("authorization") || "";
  const apiKeyHeader = request.headers.get("x-api-key") || "";
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get("apiKey") || searchParams.get("token") || "";

  let providedKey = "";
  if (authHeader.startsWith("Bearer ")) {
    providedKey = authHeader.substring(7).trim();
  } else if (apiKeyHeader) {
    providedKey = apiKeyHeader.trim();
  } else if (queryKey) {
    providedKey = queryKey.trim();
  }

  const validKey = process.env.MUSE_AI_API_KEY || process.env.AGENT_API_KEY || "groworbit_muse_live_key_2026";
  return providedKey && providedKey === validKey;
}

function parseDateToIso(dateVal) {
  if (!dateVal) return null;
  try {
    if (dateVal.toDate && typeof dateVal.toDate === "function") {
      return dateVal.toDate().toISOString();
    }
    if (dateVal._seconds || dateVal.seconds) {
      const sec = dateVal._seconds || dateVal.seconds;
      return new Date(sec * 1000).toISOString();
    }
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toISOString();
    }
  } catch (e) {
    // ignore parse error
  }
  return null;
}

function calculateAgeDays(isoDateStr) {
  if (!isoDateStr) return 0;
  const createdMs = new Date(isoDateStr).getTime();
  const nowMs = Date.now();
  return Math.max(0, Math.floor((nowMs - createdMs) / (1000 * 60 * 60 * 24)));
}

/**
 * GET /api/v1/agent/leads
 * Strictly Read-Only API for Muse AI to fetch Leads Pipeline data
 */
export async function GET(request) {
  // 1. Authenticate Muse AI request
  if (!verifyAgentAuth(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized. Missing or invalid Muse AI API key. Provide via 'Authorization: Bearer <key>', 'x-api-key', or '?apiKey=<key>'.",
      },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status")?.toLowerCase()?.trim();
    const phaseFilter = searchParams.get("phase")?.toLowerCase()?.trim();
    const searchFilter = searchParams.get("search")?.toLowerCase()?.trim();
    const sinceFilter = searchParams.get("since")?.trim(); // e.g. YYYY-MM-DD
    const limitParam = parseInt(searchParams.get("limit") || "100", 10);
    const maxLimit = Math.min(Math.max(1, isNaN(limitParam) ? 100 : limitParam), 500);

    // 2. Fetch leads from Firestore
    // We fetch with desc createdAt ordering
    let rawDocs = [];
    try {
      const q = query(collection(clientDb, "leads"), orderBy("createdAt", "desc"), fbLimit(maxLimit));
      const snapshot = await getDocs(q);
      rawDocs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (fbErr) {
      console.warn("[MuseAI API] Ordered fetch failed, falling back to unordered fetch:", fbErr.message);
      const fallbackSnap = await getDocs(collection(clientDb, "leads"));
      rawDocs = fallbackSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    // 3. Filter out non-lead records (like standalone booking confirmations)
    const actualLeads = rawDocs.filter(d => d.type !== "booking_confirmation");

    // 4. Initialize pipeline breakdown counts
    const pipelineBreakdown = {
      leadIn: 0,
      meetingBooked: 0,
      researched: 0,
      contacted: 0,
      proposalSent: 0,
      won: 0,
      lost: 0,
      cold: 0,
    };

    let hotCount = 0;
    let wonCount = 0;

    // 5. Transform, normalize, and score each lead
    const normalizedLeads = actualLeads.map((d) => {
      let status = d.status || "new";
      const createdAtIso = parseDateToIso(d.createdAt);
      const updatedAtIso = parseDateToIso(d.updatedAt);
      const bookedAtIso = parseDateToIso(d.bookedAt);
      const ageDays = calculateAgeDays(createdAtIso);

      // Auto-age new leads older than 7 days to 'cold' matching dashboard logic
      if (status === "new" && ageDays > 7) {
        status = "cold";
      }

      const statusMeta = STATUS_CONFIG[status] || { label: status, phase: "lead_in" };
      const phaseKey = statusMeta.phase;

      // Increment breakdown counts
      if (status === "new") pipelineBreakdown.leadIn++;
      else if (status === "cold") pipelineBreakdown.cold++;
      else if (status === "hot") pipelineBreakdown.meetingBooked++;
      else if (status === "qualified") pipelineBreakdown.researched++;
      else if (status === "contacted" || status === "replied") pipelineBreakdown.contacted++;
      else if (status === "proposal_sent") pipelineBreakdown.proposalSent++;
      else if (status === "won") pipelineBreakdown.won++;
      else if (status === "lost") pipelineBreakdown.lost++;

      const isMeetingBooked = Boolean(
        d.meetingBooked === true ||
        status === "hot" ||
        d.calendlyEventUri ||
        d.bookedAt
      );

      const leadScore = calculateLeadScore({ ...d, meetingBooked: isMeetingBooked, status });
      const priority = calculateLeadPriority({ ...d, meetingBooked: isMeetingBooked, status });
      const scoreCategory = getScoreCategory(leadScore);

      if (priority === "high" || isMeetingBooked || leadScore >= 61) {
        hotCount++;
      }
      if (status === "won") {
        wonCount++;
      }

      return {
        id: d.id,
        fullName: d.fullName || d.name || "Anonymous Lead",
        email: d.email || null,
        whatsapp: d.whatsapp || d.phone || null,
        brandName: d.brandName || d.brand || d.company || null,
        requestedService: d.requestedService || d.service || "General enquiry",
        monthlyRevenue: d.monthlyRevenue || d.revenue || "Not specified",
        asinOrUrl: d.asinOrUrl || d.asin || d.storeLink || null,
        notes: d.notes || d.message || "",
        status: status,
        statusLabel: statusMeta.label,
        pipelinePhase: phaseKey,
        priority: priority,
        leadScore: leadScore,
        scoreCategory: scoreCategory.label,
        meetingBooked: isMeetingBooked,
        bookedAt: bookedAtIso,
        calendlyEventUri: d.calendlyEventUri || null,
        calendlyInviteeUri: d.calendlyInviteeUri || null,
        source: d.source || "Website Form",
        landingUrl: d.landingUrl || null,
        referrer: d.referrer || null,
        utm: {
          source: d.utm_source || null,
          medium: d.utm_medium || null,
          campaign: d.utm_campaign || null,
          term: d.utm_term || null,
          content: d.utm_content || null,
        },
        createdAt: createdAtIso,
        updatedAt: updatedAtIso,
        ageDays: ageDays,
      };
    });

    // 6. Apply Query Filters
    let filteredLeads = normalizedLeads;

    // Filter by status
    if (statusFilter) {
      filteredLeads = filteredLeads.filter(l => l.status === statusFilter);
    }

    // Filter by pipeline phase
    if (phaseFilter) {
      filteredLeads = filteredLeads.filter(l => l.pipelinePhase === phaseFilter);
    }

    // Filter by date (since)
    if (sinceFilter) {
      const sinceMs = new Date(sinceFilter).getTime();
      if (!isNaN(sinceMs)) {
        filteredLeads = filteredLeads.filter(l => {
          if (!l.createdAt) return false;
          return new Date(l.createdAt).getTime() >= sinceMs;
        });
      }
    }

    // Filter by search term
    if (searchFilter) {
      filteredLeads = filteredLeads.filter(l => {
        const textToSearch = [
          l.fullName,
          l.email,
          l.whatsapp,
          l.brandName,
          l.requestedService,
          l.notes,
        ].filter(Boolean).join(" ").toLowerCase();
        return textToSearch.includes(searchFilter);
      });
    }

    // 7. Return clean JSON to Muse AI
    return NextResponse.json(
      {
        success: true,
        agent: "Muse AI",
        accessMode: "read_only",
        timestamp: new Date().toISOString(),
        summary: {
          totalLeadsInDatabase: actualLeads.length,
          returnedLeadsCount: filteredLeads.length,
          hotLeadsCount: hotCount,
          wonLeadsCount: wonCount,
          pipelineBreakdown,
        },
        filtersApplied: {
          status: statusFilter || null,
          phase: phaseFilter || null,
          search: searchFilter || null,
          since: sinceFilter || null,
          limit: maxLimit,
        },
        leads: filteredLeads,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json",
          "Allow": "GET",
        },
      }
    );
  } catch (error) {
    console.error("[MuseAI Leads API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error fetching leads.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle non-GET methods: strictly prevent any write, update, or deletion
 */
function readOnlyHandler() {
  return NextResponse.json(
    {
      success: false,
      error: "Method Not Allowed. This endpoint is strictly READ-ONLY for Muse AI. Data modification, creation, and deletion are disabled.",
      allowedMethods: ["GET"],
    },
    {
      status: 405,
      headers: {
        "Allow": "GET",
      },
    }
  );
}

export async function POST() { return readOnlyHandler(); }
export async function PUT() { return readOnlyHandler(); }
export async function PATCH() { return readOnlyHandler(); }
export async function DELETE() { return readOnlyHandler(); }
