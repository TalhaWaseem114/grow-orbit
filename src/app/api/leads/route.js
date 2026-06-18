import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const body = await request.json();

    // Fetch Global Webhook Setting from Firestore (shared by both paths)
    let webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK || "";
    if (!webhookUrl) {
      try {
        const settingsRef = doc(db, "settings", "global");
        const settingsSnap = await getDoc(settingsRef);
        if (settingsSnap.exists()) {
          webhookUrl = settingsSnap.data().leadNotificationWebhook || "";
        }
      } catch (dbErr) {
        console.warn("[API/Leads] Failed to fetch settings webhook:", dbErr.message);
      }
    }

    // Handle Calendly Booking Confirmations
    if (body.type === "booking_confirmation") {
      const confirmationDoc = {
        type: "booking_confirmation",
        leadId: body.leadId,
        email: body.email,
        meetingBooked: true,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "leads"), confirmationDoc);

      if (webhookUrl && webhookUrl.trim()) {
        try {
          const cleanWebhookUrl = webhookUrl.trim();
          if (cleanWebhookUrl.includes("discord.com/api/webhooks/")) {
            const payload = {
              embeds: [
                {
                  title: "📅 Strategy Session Scheduled!",
                  description: `A strategy call was successfully booked via Calendly.`,
                  color: 3066993, // Green color `#2ecc71` in decimal
                  fields: [
                    { name: "Email", value: body.email || "N/A", inline: true },
                    { name: "Lead ID", value: body.leadId || "N/A", inline: true }
                  ],
                  footer: {
                    text: `Grow Orbit Calendar Alert • ${new Date().toLocaleString()}`
                  }
                }
              ]
            };
            
            await fetch(cleanWebhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
          } else if (cleanWebhookUrl.includes("hooks.slack.com/services/")) {
            const payload = {
              text: `📅 *Strategy Call Scheduled!*\n*Email:* ${body.email || "N/A"}\n*Lead ID:* ${body.leadId || "N/A"}`
            };
            
            await fetch(cleanWebhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
          }
        } catch (webhookErr) {
          console.error("[API/Leads] Webhook notification dispatch failed for booking:", webhookErr);
        }
      }

      return NextResponse.json({ success: true, id: docRef.id });
    }

    const {
      fullName,
      email,
      whatsapp,
      requestedService,
      notes,
      source,
      asinOrUrl,
      monthlyRevenue,
      brandName,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      landingUrl
    } = body;

    const serviceLower = (requestedService || "").toLowerCase();
    const initialPriority = (
      serviceLower.includes("full account management") ||
      serviceLower.includes("ppc management") ||
      serviceLower.includes("full/amazon-management") ||
      serviceLower.includes("ppc-efficiency")
    ) ? "high" : "low";

    // 1. Save Lead to Firestore
    const leadDoc = {
      fullName: fullName || "N/A",
      email: email || "",
      whatsapp: whatsapp || "N/A",
      requestedService: requestedService || "Not specified",
      notes: notes || "No message provided",
      source: source || "API Request",
      status: "new",
      priority: initialPriority,
      createdAt: serverTimestamp(),
      asinOrUrl: asinOrUrl || null,
      monthlyRevenue: monthlyRevenue || null,
      brandName: brandName || null,
      utm_source: utm_source || "",
      utm_medium: utm_medium || "",
      utm_campaign: utm_campaign || "",
      utm_content: utm_content || "",
      utm_term: utm_term || "",
      landingUrl: landingUrl || ""
    };

    const docRef = await addDoc(collection(db, "leads"), leadDoc);

    // 3. Trigger Webhook securely on the server side
    if (webhookUrl && webhookUrl.trim()) {
      try {
        const cleanWebhookUrl = webhookUrl.trim();
        
        if (cleanWebhookUrl.includes("discord.com/api/webhooks/")) {
          // Discord Embed Payload formatting
          const payload = {
            embeds: [
              {
                title: `🚀 New Lead: ${requestedService || "General Inquiry"}`,
                description: `A new inquiry was submitted via **${source || "Website Form"}**.`,
                color: 16350229, // Brand orange #f97316 in decimal
                fields: [
                  { name: "Name", value: fullName || "N/A", inline: true },
                  { name: "Email", value: email || "N/A", inline: true },
                  { name: "WhatsApp", value: whatsapp || "N/A", inline: true }
                ]
              }
            ]
          };

          if (asinOrUrl) {
            payload.embeds[0].fields.push({ name: "ASIN / Product URL", value: asinOrUrl, inline: false });
          }

          if (monthlyRevenue) {
            payload.embeds[0].fields.push({ name: "Est. Monthly Revenue", value: monthlyRevenue, inline: true });
          }

          if (brandName) {
            payload.embeds[0].fields.push({ name: "Brand Name", value: brandName, inline: true });
          }

          payload.embeds[0].fields.push({ name: "Notes / Message", value: notes || "No message provided.", inline: false });

          if (utm_source || utm_medium || utm_campaign) {
            const utmString = `**Source:** ${utm_source || "—"} | **Medium:** ${utm_medium || "—"} | **Campaign:** ${utm_campaign || "—"}`;
            payload.embeds[0].fields.push({ name: "Attribution (UTM)", value: utmString, inline: false });
          }

          payload.embeds[0].footer = {
            text: `Grow Orbit Lead Alert System • ${new Date().toLocaleString()}`
          };

          await fetch(cleanWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        } else if (cleanWebhookUrl.includes("hooks.slack.com/services/")) {
          // Slack Blocks/Text formatting
          const payload = {
            text: `🚀 *New Lead Received!*\n*Name:* ${fullName || "N/A"}\n*Email:* ${email || "N/A"}\n*WhatsApp:* ${whatsapp || "N/A"}\n*Service:* ${requestedService || "Not specified"}\n*ASIN/URL:* ${asinOrUrl || "N/A"}\n*Revenue:* ${monthlyRevenue || "N/A"}\n*Notes:* ${notes || "No message provided."}\n*Source:* ${source || "API"}`
          };

          await fetch(cleanWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        }
      } catch (webhookErr) {
        console.error("[API/Leads] Webhook notification dispatch failed:", webhookErr);
      }
    }

    return NextResponse.json({ success: true, id: docRef.id });

  } catch (error) {
    console.error("[API/Leads] Handler crash:", error);
    return NextResponse.json({ error: "Failed to process lead submission" }, { status: 500 });
  }
}
