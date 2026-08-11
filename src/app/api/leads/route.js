import { NextResponse, after } from "next/server";
import { db as clientDb } from "@/firebase/firebaseConfig";
import { collection, addDoc, doc, updateDoc, getDoc, getDocs, query, where, arrayUnion } from "firebase/firestore";
import { sendTikTokServerEvent } from "@/lib/tiktokEventsApi";

// Lazy-load firebase-admin to prevent route crash if module fails to load on Vercel
let _adminDb = null;
let _FieldValue = null;
let _adminLoaded = false;

async function getAdmin() {
  if (_adminLoaded) return { adminDb: _adminDb, FieldValue: _FieldValue };
  _adminLoaded = true;
  try {
    const mod = await import("@/firebase/firebaseAdmin");
    _adminDb = mod.adminDb;
    _FieldValue = mod.FieldValue;
    console.log("[API/Leads] firebase-admin loaded successfully");
  } catch (err) {
    console.warn("[API/Leads] firebase-admin failed to load, using client SDK only:", err.message);
    _adminDb = null;
    _FieldValue = null;
  }
  return { adminDb: _adminDb, FieldValue: _FieldValue };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const DUPLICATE_WINDOW_MS = 15 * 60 * 1000;

const rateLimitStore = globalThis.__growOrbitLeadRateLimitStore || new Map();
globalThis.__growOrbitLeadRateLimitStore = rateLimitStore;

function cleanString(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim();
}

function normalizeEmail(value) {
  return cleanString(value).toLowerCase();
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateLimitStore.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getCreatedAtMs(leadDoc) {
  const createdAt = leadDoc.data().createdAt;
  if (createdAt?.toDate) return createdAt.toDate().getTime();
  if (createdAt) {
    const parsed = new Date(createdAt).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function getNewestDoc(snapshot) {
  if (snapshot.empty) return null;
  return [...snapshot.docs].sort((a, b) => getCreatedAtMs(b) - getCreatedAtMs(a))[0];
}

function truncateForDiscord(value, maxLength = 900) {
  const text = cleanString(value, "N/A") || "N/A";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

async function dispatchWebhook(webhookUrl, payload) {
  const cleanWebhookUrl = webhookUrl?.trim();
  if (!cleanWebhookUrl) return;

  const response = await fetch(cleanWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }
}

async function resolveWebhookUrl() {
  let webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK || "";
  if (webhookUrl) return webhookUrl;

  const { adminDb } = await getAdmin();
  if (adminDb) {
    try {
      const settingsSnap = await adminDb.collection("settings").doc("global").get();
      if (settingsSnap.exists) {
        webhookUrl = settingsSnap.data().leadNotificationWebhook || "";
      }
    } catch (error) {
      console.warn("[API/Leads] Failed to fetch settings webhook:", error.message);
    }
  }

  return webhookUrl;
}

async function findLeadById(leadId) {
  if (!leadId) return null;

  const { adminDb } = await getAdmin();
  if (adminDb) {
    try {
      const snap = await adminDb.collection("leads").doc(leadId).get();
      if (snap.exists) {
        return { leadDoc: snap, leadId: snap.id };
      }
    } catch (error) {
      console.warn("[API/Leads] Direct document lookup by ID via adminDb failed, trying clientDb:", error.message);
    }
  }

  try {
    const snap = await getDoc(doc(clientDb, "leads", leadId));
    if (snap.exists()) {
      return { leadDoc: snap, leadId: snap.id };
    }
  } catch (clientError) {
    console.error("[API/Leads] clientDb findById failed:", clientError);
  }

  return null;
}

async function findLeadByEmail(email) {
  if (!email) return null;

  const { adminDb } = await getAdmin();
  if (adminDb) {
    try {
      const snap = await adminDb.collection("leads").where("email", "==", email).get();
      const docSnap = getNewestDoc(snap);
      if (docSnap) return { leadDoc: docSnap, leadId: docSnap.id };
    } catch (error) {
      console.warn("[API/Leads] Email lookup via adminDb failed, trying clientDb:", error.message);
    }
  }

  try {
    const q = query(collection(clientDb, "leads"), where("email", "==", email));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const sortedDocs = [...snap.docs].sort((a, b) => getCreatedAtMs(b) - getCreatedAtMs(a));
      return { leadDoc: sortedDocs[0], leadId: sortedDocs[0].id };
    }
  } catch (clientError) {
    console.error("[API/Leads] clientDb findByEmail failed:", clientError);
  }

  return null;
}

async function findRecentDuplicateLead(email, source) {
  if (!email) return null;

  const { adminDb } = await getAdmin();
  if (adminDb) {
    try {
      const snapshot = await adminDb.collection("leads").where("email", "==", email).get();
      const now = Date.now();
      const found = snapshot.docs.find((leadDoc) => {
        const data = leadDoc.data();
        if (source && data.source && data.source !== source) return false;
        const createdAt = getCreatedAtMs(leadDoc);
        return createdAt && now - createdAt < DUPLICATE_WINDOW_MS;
      });
      if (found) return found;
    } catch (error) {
      console.warn("[API/Leads] Duplicate lookup via adminDb failed, trying clientDb:", error.message);
    }
  }

  try {
    const q = query(collection(clientDb, "leads"), where("email", "==", email));
    const snapshot = await getDocs(q);
    const now = Date.now();
    return snapshot.docs.find((leadDoc) => {
      const data = leadDoc.data();
      if (source && data.source && data.source !== source) return false;
      const createdAt = getCreatedAtMs(leadDoc);
      return createdAt && now - createdAt < DUPLICATE_WINDOW_MS;
    }) || null;
  } catch (clientError) {
    console.error("[API/Leads] clientDb findRecentDuplicateLead failed:", clientError);
    return null;
  }
}

function createDiscordLeadPayload(leadDoc) {
  const fields = [
    { name: "Name", value: truncateForDiscord(leadDoc.fullName), inline: true },
    { name: "Email", value: truncateForDiscord(leadDoc.email), inline: true },
    { name: "WhatsApp", value: truncateForDiscord(leadDoc.whatsapp), inline: true },
  ];



  if (leadDoc.brandName) {
    fields.push({ name: "Brand Name", value: truncateForDiscord(leadDoc.brandName), inline: true });
  }

  fields.push({ name: "Notes / Message", value: truncateForDiscord(leadDoc.notes), inline: false });

  if (leadDoc.utm_source || leadDoc.utm_medium || leadDoc.utm_campaign || leadDoc.fbclid || leadDoc.gclid) {
    fields.push({
      name: "Attribution",
      value: [
        `Source: ${leadDoc.utm_source || "-"}`,
        `Medium: ${leadDoc.utm_medium || "-"}`,
        `Campaign: ${leadDoc.utm_campaign || "-"}`,
        `fbclid: ${leadDoc.fbclid ? "captured" : "-"}`,
        `gclid: ${leadDoc.gclid ? "captured" : "-"}`,
      ].join(" | "),
      inline: false,
    });
  }

  return {
    embeds: [
      {
        title: `New Lead: ${leadDoc.requestedService || "General Inquiry"}`,
        description: `A new inquiry was submitted via ${leadDoc.source || "Website Form"}.`,
        color: 16350229,
        fields,
        footer: {
          text: `Grow Orbit Lead Alert System - ${new Date().toLocaleString()}`,
        },
      },
    ],
  };
}

function createDiscordBookingPayload(leadData, email) {
  const fields = [
    { name: "Name", value: truncateForDiscord(leadData.fullName), inline: true },
    { name: "Email", value: truncateForDiscord(email || leadData.email), inline: true },
    { name: "WhatsApp", value: truncateForDiscord(leadData.whatsapp), inline: true },
    { name: "Requested Service", value: truncateForDiscord(leadData.requestedService || "Not specified"), inline: false },
  ];

  if (leadData.brandName) {
    fields.push({ name: "Brand Name", value: truncateForDiscord(leadData.brandName), inline: true });
  }



  if (leadData.utm_source || leadData.utm_medium || leadData.utm_campaign || leadData.fbclid || leadData.gclid) {
    fields.push({
      name: "Attribution",
      value: [
        `Source: ${leadData.utm_source || "-"}`,
        `Medium: ${leadData.utm_medium || "-"}`,
        `Campaign: ${leadData.utm_campaign || "-"}`,
        `fbclid: ${leadData.fbclid ? "captured" : "-"}`,
        `gclid: ${leadData.gclid ? "captured" : "-"}`,
      ].join(" | "),
      inline: false,
    });
  }

  return {
    embeds: [
      {
        title: "Strategy Session Scheduled",
        description: "A strategy call was booked via Calendly and the CRM lead was promoted to Hot.",
        color: 3066993,
        fields,
        footer: {
          text: `Grow Orbit Calendar Alert - ${new Date().toLocaleString()}`,
        },
      },
    ],
  };
}

function createDiscordOrphanBookingPayload(body, email) {
  return {
    embeds: [
      {
        title: "Strategy Session Scheduled",
        description: "A strategy call was booked via Calendly.",
        color: 3066993,
        fields: [
          { name: "Email", value: truncateForDiscord(email || "N/A"), inline: true },
        ],
        footer: {
          text: `Grow Orbit Calendar Alert - ${new Date().toLocaleString()}`,
        },
      },
    ],
  };
}

async function notifyWebhook(webhookUrl, discordPayload, slackText) {
  const cleanWebhookUrl = webhookUrl?.trim();
  if (!cleanWebhookUrl) return;

  if (cleanWebhookUrl.includes("discord.com/api/webhooks/")) {
    await dispatchWebhook(cleanWebhookUrl, discordPayload);
    return;
  }

  if (cleanWebhookUrl.includes("hooks.slack.com/services/")) {
    await dispatchWebhook(cleanWebhookUrl, { text: slackText });
  }
}

async function handleBookingConfirmation(body, webhookUrl, clientIp = "unknown", userAgent = "") {
  const email = normalizeEmail(body.email);
  if (!body.leadId && !email) {
    return NextResponse.json({ error: "Missing lead reference for booking confirmation" }, { status: 400 });
  }

  const { adminDb, FieldValue } = await getAdmin();
  const match = (await findLeadById(cleanString(body.leadId))) || (await findLeadByEmail(email));

  if (match) {
    const leadData = match.leadDoc.data();
    const alreadyBooked = leadData.meetingBooked === true;

    // Try admin SDK first
    if (adminDb && FieldValue) {
      const bookingUpdate = {
        meetingBooked: true,
        status: "hot",
        priority: "high",
        calendlyEventUri: cleanString(body.calendlyEventUri),
        calendlyInviteeUri: cleanString(body.calendlyInviteeUri),
        updatedAt: FieldValue.serverTimestamp(),
      };
      if (!alreadyBooked) {
        bookingUpdate.bookedAt = FieldValue.serverTimestamp();
        bookingUpdate.timeline = FieldValue.arrayUnion({
          text: "Meeting successfully scheduled on Calendly.",
          timestamp: new Date(),
          adminName: "System",
          adminId: "system",
        });
      }
      try {
        const leadRef = adminDb.collection("leads").doc(match.leadId);
        await leadRef.update(bookingUpdate);
      } catch (adminError) {
        console.warn("[API/Leads] adminDb lead update failed, trying clientDb fallback:", adminError.message);
        // Fall through to client SDK below
        await updateBookingWithClientSdk(match.leadId, body, alreadyBooked);
      }
    } else {
      // No admin SDK available, use client SDK directly
      await updateBookingWithClientSdk(match.leadId, body, alreadyBooked);
    }

    if (!alreadyBooked) {
      after(() => {
        notifyWebhook(
          webhookUrl,
          createDiscordBookingPayload(leadData, email),
          [
            "*Strategy Call Scheduled!*",
            `Name: ${leadData.fullName || "N/A"}`,
            `Email: ${email || leadData.email || "N/A"}`,
            `WhatsApp: ${leadData.whatsapp || "N/A"}`,
            `Service: ${leadData.requestedService || "Not specified"}`,
          ].join("\n")
        ).catch((error) => {
          console.error("[API/Leads] Webhook notification dispatch failed for booking:", error);
        });

        sendTikTokServerEvent({
          eventName: "Subscribe",
          email: email || leadData.email,
          phone: leadData.whatsapp,
          contentName: "Strategy Session Booked",
          pageUrl: "https://www.groworbitofficial.com/get-started/book-meeting",
          clientIp,
          userAgent,
          eventId: `sub_${match.leadId || Date.now()}`,
        }).catch((err) => {
          console.error("[API/Leads] TikTok Server Event dispatch failed for booking:", err);
        });
      });
    }

    return NextResponse.json({ success: true, id: match.leadId, merged: true, alreadyBooked });
  }

  // Orphan booking - no existing lead found
  const confirmationDoc = {
    fullName: "Calendly Booking",
    email,
    whatsapp: "N/A",
    requestedService: "Strategy Session Booked",
    notes: `Calendly booking confirmation. Lead ID: ${body.leadId || "N/A"}`,
    source: "Calendly Booking Confirmation",
    type: "booking_confirmation_orphan",
    status: "hot",
    priority: "high",
    leadId: cleanString(body.leadId) || null,
    meetingBooked: true,
    calendlyEventUri: cleanString(body.calendlyEventUri),
    calendlyInviteeUri: cleanString(body.calendlyInviteeUri),
    timeline: [
      {
        text: "Meeting booked in Calendly, but no matching lead record was found.",
        timestamp: new Date(),
        adminName: "System",
        adminId: "system",
      },
    ],
    createdAt: new Date(),
  };

  let docRef;
  if (adminDb && FieldValue) {
    try {
      docRef = await adminDb.collection("leads").add({ ...confirmationDoc, createdAt: FieldValue.serverTimestamp() });
    } catch (adminError) {
      console.warn("[API/Leads] adminDb add orphan booking failed, trying clientDb fallback:", adminError.message);
    }
  }
  if (!docRef) {
    try {
      const clientDocRef = await addDoc(collection(clientDb, "leads"), confirmationDoc);
      docRef = { id: clientDocRef.id };
    } catch (clientError) {
      console.error("[API/Leads] clientDb orphan booking write failed:", clientError);
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
    }
  }

  after(() => {
    notifyWebhook(
      webhookUrl,
      createDiscordOrphanBookingPayload(body, email),
      `Strategy call scheduled, but no matching lead was found. Email: ${email || "N/A"} Lead ID: ${body.leadId || "N/A"}`
    ).catch((error) => {
      console.error("[API/Leads] Webhook notification dispatch failed for orphaned booking:", error);
    });
  });

  return NextResponse.json({ success: true, id: docRef.id, merged: false });
}

async function updateBookingWithClientSdk(leadId, body, alreadyBooked) {
  const clientBookingUpdate = {
    meetingBooked: true,
    status: "hot",
    priority: "high",
    calendlyEventUri: cleanString(body.calendlyEventUri),
    calendlyInviteeUri: cleanString(body.calendlyInviteeUri),
    updatedAt: new Date(),
  };
  if (!alreadyBooked) {
    clientBookingUpdate.bookedAt = new Date();
    clientBookingUpdate.timeline = arrayUnion({
      text: "Meeting successfully scheduled on Calendly.",
      timestamp: new Date(),
      adminName: "System",
      adminId: "system",
    });
  }
  await updateDoc(doc(clientDb, "leads", leadId), clientBookingUpdate);
}

async function handleLeadIntake(body, webhookUrl, clientIp = "unknown", userAgent = "") {
  const normalizedFullName = cleanString(body.fullName);
  const normalizedEmail = normalizeEmail(body.email);
  const normalizedSource = cleanString(body.source, "API Request") || "API Request";

  if (!normalizedFullName || !normalizedEmail) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  const duplicateLead = await findRecentDuplicateLead(normalizedEmail, normalizedSource);
  if (duplicateLead) {
    return NextResponse.json({ success: true, id: duplicateLead.id, duplicate: true });
  }

  const { adminDb, FieldValue } = await getAdmin();

  const requestedService = cleanString(body.requestedService, "Not specified") || "Not specified";
  const initialPriority = body.meetingBooked ? "high" : "low";

  const leadDoc = {
    fullName: normalizedFullName,
    email: normalizedEmail,
    whatsapp: cleanString(body.whatsapp, "N/A") || "N/A",
    requestedService,
    notes: cleanString(body.notes, "No message provided") || "No message provided",
    source: normalizedSource,
    status: "new",
    priority: initialPriority,
    createdAt: new Date(),
    brandName: cleanString(body.brandName) || null,
    utm_source: cleanString(body.utm_source),
    utm_medium: cleanString(body.utm_medium),
    utm_campaign: cleanString(body.utm_campaign),
    utm_content: cleanString(body.utm_content),
    utm_term: cleanString(body.utm_term),
    gclid: cleanString(body.gclid),
    fbclid: cleanString(body.fbclid),
    landingUrl: cleanString(body.landingUrl),
    currentUrl: cleanString(body.currentUrl),
    referrer: cleanString(body.referrer),
    utm_captured_at: cleanString(body.utm_captured_at),
    timeline: [
      {
        text: `Lead submitted via ${normalizedSource}.`,
        timestamp: new Date(),
        adminName: "System",
        adminId: "system",
      },
    ],
  };

  let docRef;

  // Try admin SDK first
  if (adminDb && FieldValue) {
    try {
      docRef = await adminDb.collection("leads").add({ ...leadDoc, createdAt: FieldValue.serverTimestamp() });
    } catch (adminError) {
      console.warn("[API/Leads] adminDb lead intake failed, trying clientDb fallback:", adminError.message);
    }
  }

  // Fallback to client SDK
  if (!docRef) {
    try {
      const clientDocRef = await addDoc(collection(clientDb, "leads"), leadDoc);
      docRef = { id: clientDocRef.id };
    } catch (clientError) {
      console.error("[API/Leads] clientDb lead intake write failed:", clientError);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }
  }

  after(() => {
    notifyWebhook(
      webhookUrl,
      createDiscordLeadPayload(leadDoc),
      [
        "*New Lead Received!*",
        `Name: ${leadDoc.fullName}`,
        `Email: ${leadDoc.email}`,
        `WhatsApp: ${leadDoc.whatsapp}`,
        `Service: ${leadDoc.requestedService}`,
        `Notes: ${leadDoc.notes}`,
        `Source: ${leadDoc.source}`,
      ].join("\n")
    ).catch((error) => {
      console.error("[API/Leads] Webhook notification dispatch failed:", error);
    });

    sendTikTokServerEvent({
      eventName: "SubmitForm",
      email: leadDoc.email,
      phone: leadDoc.whatsapp,
      contentName: leadDoc.requestedService || "Grow Orbit Lead",
      pageUrl: leadDoc.currentUrl || leadDoc.landingUrl || "https://www.groworbitofficial.com/get-started",
      clientIp,
      userAgent,
      eventId: `lead_${docRef?.id || Date.now()}`,
    }).catch((err) => {
      console.error("[API/Leads] TikTok Server Event SubmitForm failed:", err);
    });

    sendTikTokServerEvent({
      eventName: "CompleteRegistration",
      email: leadDoc.email,
      phone: leadDoc.whatsapp,
      contentName: leadDoc.requestedService || "Grow Orbit Lead",
      pageUrl: leadDoc.currentUrl || leadDoc.landingUrl || "https://www.groworbitofficial.com/get-started",
      clientIp,
      userAgent,
      eventId: `reg_${docRef?.id || Date.now()}`,
    }).catch((err) => {
      console.error("[API/Leads] TikTok Server Event CompleteRegistration failed:", err);
    });
  });

  return NextResponse.json({ success: true, id: docRef.id });
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (body.website_confirm && cleanString(body.website_confirm) !== "") {
      console.warn("[API/Leads] Spam submission caught via honeypot:", body.email);
      return NextResponse.json({ success: true, id: "spam_filtered" });
    }

    const clientIp = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "";
    if (isRateLimited(clientIp)) {
      console.warn("[API/Leads] Rate limit exceeded:", clientIp);
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const webhookUrl = await resolveWebhookUrl();

    if (body.type === "booking_confirmation") {
      return handleBookingConfirmation(body, webhookUrl, clientIp, userAgent);
    }

    return handleLeadIntake(body, webhookUrl, clientIp, userAgent);
  } catch (error) {
    console.error("[API/Leads] Handler crash:", error);
    return NextResponse.json({ error: "Failed to process lead submission" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const leadId = cleanString(body.leadId);
    if (!leadId) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const { adminDb, FieldValue } = await getAdmin();
    const updateData = {
      whatsapp: cleanString(body.whatsapp, "N/A") || "N/A",
      notes: cleanString(body.notes, "No message provided") || "No message provided",
      updatedAt: new Date(),
    };

    // Try admin SDK first
    if (adminDb && FieldValue) {
      try {
        const leadRef = adminDb.collection("leads").doc(leadId);
        await leadRef.update({
          ...updateData,
          updatedAt: FieldValue.serverTimestamp(),
          timeline: FieldValue.arrayUnion({
            text: "Lead updated with Step 2 (Mobile & Notes) details.",
            timestamp: new Date(),
            adminName: "System",
            adminId: "system",
          }),
        });

        // Fetch completed lead details to notify webhook (non-blocking)
        after(() => {
          leadRef.get().then((leadSnap) => {
            if (leadSnap.exists) {
              const fullLeadDoc = leadSnap.data();
              resolveWebhookUrl().then((webhookUrl) => {
                notifyWebhook(
                  webhookUrl,
                  createDiscordLeadPayload(fullLeadDoc),
                  [
                    "*Lead Details Finalized!*",
                    `Name: ${fullLeadDoc.fullName}`,
                    `Email: ${fullLeadDoc.email}`,
                    `WhatsApp: ${fullLeadDoc.whatsapp}`,
                    `Service: ${fullLeadDoc.requestedService}`,
                    `Notes: ${fullLeadDoc.notes}`,
                    `Source: ${fullLeadDoc.source}`,
                  ].join("\n")
                ).catch((webhookError) => {
                  console.error("[API/Leads] Webhook notify failed in PATCH admin:", webhookError);
                });
              });
            }
          }).catch((getSnapError) => {
            console.error("[API/Leads] Fetch lead document failed in PATCH admin:", getSnapError);
          });
        });

        return NextResponse.json({ success: true, id: leadId });
      } catch (adminError) {
        console.warn("[API/Leads] adminDb PATCH update failed, trying clientDb fallback:", adminError.message);
      }
    }

    // Fallback to client SDK
    try {
      await updateDoc(doc(clientDb, "leads", leadId), {
        ...updateData,
        timeline: arrayUnion({
          text: "Lead updated with Step 2 (Mobile & Notes) details.",
          timestamp: new Date(),
          adminName: "System",
          adminId: "system",
        }),
      });

      // Fetch completed lead details to notify webhook (non-blocking)
      after(() => {
        getDoc(doc(clientDb, "leads", leadId)).then((leadSnap) => {
          if (leadSnap.exists()) {
            const fullLeadDoc = leadSnap.data();
            resolveWebhookUrl().then((webhookUrl) => {
              notifyWebhook(
                webhookUrl,
                createDiscordLeadPayload(fullLeadDoc),
                [
                  "*Lead Details Finalized!*",
                  `Name: ${fullLeadDoc.fullName}`,
                  `Email: ${fullLeadDoc.email}`,
                  `WhatsApp: ${fullLeadDoc.whatsapp}`,
                  `Service: ${fullLeadDoc.requestedService}`,
                  `Notes: ${fullLeadDoc.notes}`,
                  `Source: ${fullLeadDoc.source}`,
                ].join("\n")
              ).catch((webhookError) => {
                console.error("[API/Leads] Webhook notify failed in PATCH client:", webhookError);
              });
            });
          }
        }).catch((getSnapError) => {
          console.error("[API/Leads] Fetch lead document failed in PATCH client:", getSnapError);
        });
      });

      return NextResponse.json({ success: true, id: leadId });
    } catch (clientError) {
      console.error("[API/Leads] clientDb PATCH update failed:", clientError.message, clientError.stack);
      return NextResponse.json({ error: `clientDb PATCH update failed: ${clientError.message}` }, { status: 500 });
    }
  } catch (error) {
    console.error("[API/Leads] PATCH handler crash:", error);
    return NextResponse.json({ error: `PATCH handler crash: ${error.message}` }, { status: 500 });
  }
}
