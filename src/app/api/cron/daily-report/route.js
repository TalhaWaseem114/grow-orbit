import { NextResponse } from "next/server";
import { db, auth } from "@/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function GET(request) {
  return handleDailyReport(request);
}

export async function POST(request) {
  return handleDailyReport(request);
}

async function handleDailyReport(request) {
  try {
    // 1. Verify Security Token
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const cronSecret = process.env.CRON_SECRET || "groworbit_cron_secret";

    if (!token || token !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Authenticate as Admin if credentials are provided in env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      try {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      } catch (authErr) {
        console.warn("[Cron/Daily-Report] Admin authentication failed:", authErr.message);
      }
    }

    // 3. Fetch Discord Webhook URL from settings
    let webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK || "";
    if (!webhookUrl) {
      try {
        const settingsRef = doc(db, "settings", "global");
        const settingsSnap = await getDoc(settingsRef);
        if (settingsSnap.exists()) {
          webhookUrl = settingsSnap.data().leadNotificationWebhook || "";
        }
      } catch (dbErr) {
        console.warn("[Cron/Daily-Report] Failed to fetch settings webhook:", dbErr.message);
      }
    }

    // Fallback if not saved in Firestore yet
    if (!webhookUrl) {
      webhookUrl = "https://discord.com/api/webhooks/1516758228304789564/YTW0PNv2rNzCg-gyNWSr1bA_z8n7V35akqWchpnRT-O-hlDbgf2jBAthgsAYaUkHasmS";
    }

    // 4. Define Swedish timezone formatted date (YYYY-MM-DD) in Pakistan/Karachi Local Time
    const todayStr = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Karachi" });

    // Boundaries for Today in Server time (UTC)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // 5. Fetch all documents from both possible collection casings ('leads' and 'Leads')
    const allLeadsMap = new Map();
    const queryErrors = [];

    const fetchCollection = async (collectionName) => {
      try {
        const snap = await getDocs(collection(db, collectionName));
        snap.docs.forEach(docSnap => {
          allLeadsMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
        });
      } catch (err) {
        console.warn(`[Cron/Daily-Report] Collection '${collectionName}' query failed:`, err.message);
        queryErrors.push({ collection: collectionName, error: err.message, code: err.code });
      }
    };

    await fetchCollection("leads");
    await fetchCollection("Leads");

    const allLeads = Array.from(allLeadsMap.values());

    // 6. Filter and process leads for "Today" and "Follow-Ups"
    let newLeadsCount = 0;
    let meetingsBookedCount = 0;
    const todayLeadsList = [];
    const sourceCounts = {};
    const serviceCounts = {};

    // Follow-ups due today in the Pakistan/Karachi local timezone
    const todayFollowUps = [];

    allLeads.forEach(lead => {
      if (lead.type === "booking_confirmation") return;

      const createdAtDate = lead.createdAt?.toDate 
        ? lead.createdAt.toDate() 
        : (lead.createdAt ? new Date(lead.createdAt) : null);

      const createdToday = createdAtDate && createdAtDate >= startOfToday && createdAtDate <= endOfToday;

      // Check if meeting was booked today
      let bookedToday = false;
      if (lead.meetingBooked) {
        if (createdToday) {
          bookedToday = true;
        } else {
          const timeline = lead.timeline || [];
          bookedToday = timeline.some(entry => {
            const entryText = entry.text || "";
            const isBookingMsg = entryText.toLowerCase().includes("scheduled on calendly") || 
                                 entryText.toLowerCase().includes("meeting successfully");
            if (!isBookingMsg) return false;

            const entryDate = entry.timestamp?.toDate 
              ? entry.timestamp.toDate() 
              : (entry.timestamp ? new Date(entry.timestamp) : null);
            
            return entryDate && entryDate >= startOfToday && entryDate <= endOfToday;
          });
        }
      }

      if (createdToday) {
        newLeadsCount++;
        todayLeadsList.push(lead);

        const src = lead.source || "Website Form";
        sourceCounts[src] = (sourceCounts[src] || 0) + 1;

        const svc = lead.requestedService || "Not specified";
        serviceCounts[svc] = (serviceCounts[svc] || 0) + 1;
      }

      if (bookedToday) {
        meetingsBookedCount++;
      }

      // Check if next follow-up is scheduled for today (format: YYYY-MM-DD)
      if (lead.nextFollowUp === todayStr && lead.status !== "won" && lead.status !== "lost") {
        todayFollowUps.push(lead);
      }
    });

    // Check if today is Monday in the Pakistan/Karachi timezone
    const isMonday = new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Karachi" }) === "Monday";

    // Skip digest execution if no activity is found today and it is not Monday
    if (newLeadsCount === 0 && meetingsBookedCount === 0 && todayFollowUps.length === 0 && !isMonday) {
      return NextResponse.json({
        success: true,
        leadsProcessed: 0,
        meetingsProcessed: 0,
        followUpsProcessed: 0,
        message: "No leads, bookings, or follow-ups due today. Skipped sending daily summary report to prevent spam.",
        debugTotalLeads: allLeads.length,
        debugErrors: queryErrors,
      });
    }

    // 7. Build the Discord Embed Payload
    const formattedDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Karachi"
    });

    const payload = {
      embeds: [
        {
          title: "📊 Grow Orbit Daily Summary Report",
          description: `Summary of website leads and scheduled strategy sessions for **${formattedDate}**.`,
          color: 3447003, // Sleek dark blue `#3498db` in decimal
          fields: [
            {
              name: "📈 Traffic & Lead Volume",
              value: `• **New Leads Received:** ${newLeadsCount}\n• **Meetings Booked Today:** ${meetingsBookedCount}`,
              inline: false,
            }
          ]
        }
      ]
    };

    // Add Follow-Ups Due Today Section
    if (todayFollowUps.length > 0) {
      const followUpsContent = todayFollowUps.map((l, i) => {
        return `${i + 1}. **${l.fullName || "N/A"}** - *${l.requestedService || "General enquiry"}* (Email: ${l.email || "N/A"})`;
      }).join("\n");

      payload.embeds[0].fields.push({
        name: `⏰ Follow-Ups Due Today (${todayFollowUps.length})`,
        value: followUpsContent,
        inline: false
      });
    } else {
      payload.embeds[0].fields.push({
        name: "⏰ Follow-Ups Due Today",
        value: "No follow-ups scheduled for today.",
        inline: false
      });
    }

    // Add Leads Breakdown list if there are leads today
    if (newLeadsCount > 0) {
      const listContent = todayLeadsList.map((lead, index) => {
        const revenueText = lead.monthlyRevenue ? ` | Rev: ${lead.monthlyRevenue}` : "";
        const bookedText = lead.meetingBooked ? " *(📅 Booked)*" : "";
        return `${index + 1}. **${lead.fullName || "N/A"}** (${lead.email || "N/A"}) - *${lead.requestedService || "General enquiry"}*${revenueText}${bookedText}`;
      }).join("\n");

      payload.embeds[0].fields.push({
        name: "📋 Today's Leads Detail",
        value: listContent,
        inline: false,
      });

      // Add Source & Service breakdowns
      const sourcesText = Object.entries(sourceCounts)
        .map(([src, count]) => `• **${src}**: ${count}`)
        .join("\n");
      
      const servicesText = Object.entries(serviceCounts)
        .map(([svc, count]) => `• **${svc}**: ${count}`)
        .join("\n");

      payload.embeds[0].fields.push(
        { name: "🔍 Lead Traffic Sources", value: sourcesText, inline: true },
        { name: "🏷️ Requested Services", value: servicesText, inline: true }
      );
    }

    // 8. Add Weekly Performance Report Embed (on Mondays)
    if (isMonday) {
      const now = new Date();
      const startOfThisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const startOfLastWeek = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

      const thisWeekLeads = [];
      const lastWeekLeads = [];

      allLeads.forEach(lead => {
        if (lead.type === "booking_confirmation") return;
        const createdDate = lead.createdAt?.toDate 
          ? lead.createdAt.toDate() 
          : (lead.createdAt ? new Date(lead.createdAt) : null);
        
        if (createdDate) {
          if (createdDate >= startOfThisWeek) {
            thisWeekLeads.push(lead);
          } else if (createdDate >= startOfLastWeek && createdDate < startOfThisWeek) {
            lastWeekLeads.push(lead);
          }
        }
      });

      // Conversion rates computation
      const thisWeekWonCount = thisWeekLeads.filter(l => l.status === "won").length;
      const lastWeekWonCount = lastWeekLeads.filter(l => l.status === "won").length;

      const thisWeekConvRate = thisWeekLeads.length > 0 ? (thisWeekWonCount / thisWeekLeads.length) * 100 : 0;
      const lastWeekConvRate = lastWeekLeads.length > 0 ? (lastWeekWonCount / lastWeekLeads.length) * 100 : 0;
      const convRateChange = thisWeekConvRate - lastWeekConvRate;

      // Pipeline values computation
      const thisWeekPipelineValue = thisWeekLeads.reduce((acc, l) => acc + (Number(l.estimatedDealValue) || 0), 0);
      const lastWeekPipelineValue = lastWeekLeads.reduce((acc, l) => acc + (Number(l.estimatedDealValue) || 0), 0);
      const pipelineValueChange = thisWeekPipelineValue - lastWeekPipelineValue;

      const weeklyEmbed = {
        title: "📈 Grow Orbit Weekly Performance Report",
        description: `Weekly comparative performance digest for **${formattedDate}**.`,
        color: 15105570, // Gold/Orange `#e67e22` in decimal
        fields: [
          {
            name: "🆕 New Leads Volume",
            value: `• **This Week:** ${thisWeekLeads.length}\n• **Last Week:** ${lastWeekLeads.length}\n• **Change:** ${thisWeekLeads.length - lastWeekLeads.length >= 0 ? "+" : ""}${thisWeekLeads.length - lastWeekLeads.length}`,
            inline: true
          },
          {
            name: "🎉 Conversion Rate",
            value: `• **This Week:** ${thisWeekConvRate.toFixed(1)}%\n• **Last Week:** ${lastWeekConvRate.toFixed(1)}%\n• **Change:** ${convRateChange >= 0 ? "+" : ""}${convRateChange.toFixed(1)}%`,
            inline: true
          },
          {
            name: "💰 Pipeline Value Change",
            value: `• **This Week:** $${thisWeekPipelineValue.toLocaleString()}\n• **Last Week:** $${lastWeekPipelineValue.toLocaleString()}\n• **Change:** ${pipelineValueChange >= 0 ? "+" : ""}$${pipelineValueChange.toLocaleString()}`,
            inline: false
          }
        ]
      };

      payload.embeds.push(weeklyEmbed);
    }

    payload.embeds[0].footer = {
      text: `Grow Orbit Audit Reporter • ${new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })}`,
    };

    // 9. Dispatch Webhook
    if (webhookUrl && webhookUrl.trim()) {
      const cleanUrl = webhookUrl.trim();
      const res = await fetch(cleanUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error(`Discord Webhook responded with status: ${res.status}`);
      }
    }

    return NextResponse.json({
      success: true,
      leadsProcessed: newLeadsCount,
      meetingsProcessed: meetingsBookedCount,
      followUpsProcessed: todayFollowUps.length,
      isMondayReport: isMonday,
      debugTotalLeads: allLeads.length,
      debugErrors: queryErrors,
    });

  } catch (error) {
    console.error("[Cron/Daily-Report] Crash:", error);
    return NextResponse.json({ error: "Daily report compile failed", details: error.message }, { status: 500 });
  }
}
