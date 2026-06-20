import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import { 
  collection, addDoc, doc, getDoc, getDocs, 
  query, where, orderBy, updateDoc, arrayUnion, serverTimestamp 
} from "firebase/firestore";

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Spam Protection: Honeypot Validation
    if (body.website_confirm && body.website_confirm.trim() !== "") {
      console.warn("[API/Leads] Spam submission caught via honeypot:", body.email);
      // Return a fake successful response to fool bot scripts
      return NextResponse.json({ success: true, id: "spam_filtered" });
    }

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

    // 2. Handle Calendly Booking Confirmations
    if (body.type === "booking_confirmation") {
      let targetLeadDoc = null;
      let targetLeadId = null;
      let targetCollection = "leads"; // Try lowercase collection first

      // A. Try matching by leadId
      if (body.leadId) {
        try {
          const docRefLow = doc(db, "leads", body.leadId);
          const snapLow = await getDoc(docRefLow);
          if (snapLow.exists()) {
            targetLeadDoc = snapLow;
            targetLeadId = snapLow.id;
            targetCollection = "leads";
          } else {
            const docRefCap = doc(db, "Leads", body.leadId);
            const snapCap = await getDoc(docRefCap);
            if (snapCap.exists()) {
              targetLeadDoc = snapCap;
              targetLeadId = snapCap.id;
              targetCollection = "Leads";
            }
          }
        } catch (e) {
          console.warn("[API/Leads] Direct document lookup by ID failed:", e.message);
        }
      }

      // B. Fallback: match by email (latest matching lead)
      if (!targetLeadDoc && body.email) {
        try {
          const qLow = query(collection(db, "leads"), where("email", "==", body.email), orderBy("createdAt", "desc"));
          const snapLow = await getDocs(qLow);
          if (!snapLow.empty) {
            targetLeadDoc = snapLow.docs[0];
            targetLeadId = snapLow.docs[0].id;
            targetCollection = "leads";
          } else {
            const qCap = query(collection(db, "Leads"), where("email", "==", body.email), orderBy("createdAt", "desc"));
            const snapCap = await getDocs(qCap);
            if (!snapCap.empty) {
              targetLeadDoc = snapCap.docs[0];
              targetLeadId = snapCap.docs[0].id;
              targetCollection = "Leads";
            }
          }
        } catch (e) {
          console.warn("[API/Leads] Email query search failed:", e.message);
        }
      }

      // C. Perform Lead Document Update if found
      if (targetLeadDoc) {
        const leadRef = doc(db, targetCollection, targetLeadId);
        await updateDoc(leadRef, {
          meetingBooked: true,
          status: "hot", // Automatically mark as HOT when a meeting is booked
          priority: "high", // Auto-set priority to HIGH when meeting is booked
          timeline: arrayUnion({
            text: "Meeting successfully scheduled on Calendly.",
            timestamp: new Date(),
            adminName: "System",
            adminId: "system"
          })
        });

        // Trigger detailed webhook notification with lead context
        const leadData = targetLeadDoc.data();
        if (webhookUrl && webhookUrl.trim()) {
          try {
            const cleanWebhookUrl = webhookUrl.trim();
            if (cleanWebhookUrl.includes("discord.com/api/webhooks/")) {
              const payload = {
                embeds: [
                  {
                    title: "📅 Strategy Session Scheduled!",
                    description: `A strategy call was successfully booked via Calendly, and the lead status was updated to **Hot (Booked)**.`,
                    color: 3066993, // Green color `#2ecc71` in decimal
                    fields: [
                      { name: "Name", value: leadData.fullName || "N/A", inline: true },
                      { name: "Email", value: body.email || leadData.email || "N/A", inline: true },
                      { name: "WhatsApp", value: leadData.whatsapp || "N/A", inline: true },
                      { name: "Requested Service", value: leadData.requestedService || "Not specified", inline: false }
                    ]
                  }
                ]
              };

              if (leadData.brandName) {
                payload.embeds[0].fields.push({ name: "Brand Name", value: leadData.brandName, inline: true });
              }
              if (leadData.asinOrUrl) {
                payload.embeds[0].fields.push({ name: "ASIN / URL", value: leadData.asinOrUrl, inline: true });
              }
              if (leadData.utm_source || leadData.utm_medium || leadData.utm_campaign) {
                const utmString = `**Source:** ${leadData.utm_source || "—"} | **Medium:** ${leadData.utm_medium || "—"} | **Campaign:** ${leadData.utm_campaign || "—"}`;
                payload.embeds[0].fields.push({ name: "Attribution (UTM)", value: utmString, inline: false });
              }

              payload.embeds[0].footer = {
                text: `Grow Orbit Calendar Alert • ${new Date().toLocaleString()}`
              };

              await fetch(cleanWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
              });
            } else if (cleanWebhookUrl.includes("hooks.slack.com/services/")) {
              const payload = {
                text: `📅 *Strategy Call Scheduled!*\n*Name:* ${leadData.fullName || "N/A"}\n*Email:* ${body.email || "N/A"}\n*WhatsApp:* ${leadData.whatsapp || "N/A"}\n*Service:* ${leadData.requestedService || "Not specified"}`
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

        return NextResponse.json({ success: true, id: targetLeadId, merged: true });
      }

      // D. Fallback if lead was not found (Orphaned Booking)
      const confirmationDoc = {
        type: "booking_confirmation",
        leadId: body.leadId || null,
        email: body.email || "",
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
                  title: "⚠️ Strategy Session Scheduled (Orphaned Booking)",
                  description: `A strategy call was booked via Calendly, but no matching lead was found in the CRM database.`,
                  color: 16776960, // Yellow color `#f1c40f` in decimal
                  fields: [
                    { name: "Email", value: body.email || "N/A", inline: true },
                    { name: "Provided Lead ID", value: body.leadId || "N/A", inline: true }
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
          }
        } catch (webhookErr) {
          console.error("[API/Leads] Webhook notification dispatch failed for orphaned booking:", webhookErr);
        }
      }

      return NextResponse.json({ success: true, id: docRef.id, merged: false });
    }

    // 3. Save Lead Intake submissions
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

    // Trigger webhook notification for lead submission
    if (webhookUrl && webhookUrl.trim()) {
      try {
        const cleanWebhookUrl = webhookUrl.trim();
        
        if (cleanWebhookUrl.includes("discord.com/api/webhooks/")) {
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
