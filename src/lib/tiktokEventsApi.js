import crypto from "crypto";

const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID || "D9R19QJC77U5M57USF2G";
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN || "b5caf248f0a077f8ec5b680195e639d5d3b8b204";
const TIKTOK_API_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

function hashSha256(val) {
  if (!val || typeof val !== "string") return undefined;
  const cleaned = val.trim().toLowerCase();
  if (!cleaned || cleaned === "n/a") return undefined;
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

function normalizePhone(phone) {
  if (!phone || typeof phone !== "string") return undefined;
  let digits = phone.replace(/[^\d+]/g, "");
  if (!digits || digits === "n/a") return undefined;
  if (!digits.startsWith("+")) {
    digits = "+" + digits;
  }
  return crypto.createHash("sha256").update(digits).digest("hex");
}

export async function sendTikTokServerEvent({
  eventName = "SubmitForm",
  email,
  phone,
  contentName,
  pageUrl,
  clientIp,
  userAgent,
  eventId,
}) {
  try {
    const hashedEmail = hashSha256(email);
    const hashedPhone = normalizePhone(phone);

    const userObj = {};
    if (hashedEmail) userObj.email = hashedEmail;
    if (hashedPhone) userObj.phone_number = hashedPhone;
    if (clientIp && clientIp !== "unknown") userObj.ip = clientIp;
    if (userAgent) userObj.user_agent = userAgent;

    const payload = {
      event_source: "web",
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          user: userObj,
          properties: {
            content_name: contentName || "Grow Orbit Service Inquiry",
            currency: "USD",
            value: 0,
          },
          page: {
            url: pageUrl || "https://www.groworbitofficial.com/get-started",
          },
        },
      ],
    };

    const response = await fetch(TIKTOK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();
    if (resData.code === 0) {
      console.log(`[TikTok Events API] Success (${eventName}):`, resData);
      return { success: true, data: resData };
    } else {
      console.warn(`[TikTok Events API] Response warning (${eventName}):`, resData);
      return { success: false, error: resData };
    }
  } catch (err) {
    console.error(`[TikTok Events API] Exception (${eventName}):`, err.message);
    return { success: false, error: err.message };
  }
}
