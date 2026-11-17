"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Home, ArrowRight, Calendar, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("invitee_email") || searchParams.get("email") || "";
  const nameParam = searchParams.get("invitee_full_name") || searchParams.get("name") || "";
  const eventName = searchParams.get("event_type_name") || searchParams.get("event_name") || "";
  const startTime = searchParams.get("event_start_time") || "";
  const eventUri = searchParams.get("event_type_uuid") || searchParams.get("event_uri") || "";
  const inviteeUri = searchParams.get("invitee_uuid") || "";

  const isBooking = Boolean(eventName || startTime || emailParam);
  const syncAttemptedRef = useRef(false);
  const [crmSynced, setCrmSynced] = useState(false);

  useEffect(() => {
    if (!emailParam || syncAttemptedRef.current) return;
    syncAttemptedRef.current = true;

    const bookingEventId = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    // Fire Meta Pixel Schedule event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Schedule", {
        content_name: eventName || "Strategy Session",
        status: "confirmed"
      }, {
        eventID: bookingEventId
      });
    }

    // Fire TikTok Pixel Subscribe event
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track("Subscribe", {
        contents: [{ content_id: "strategy_call", content_name: eventName || "Strategy Session" }]
      }, {
        event_id: bookingEventId
      });
    }

    // Update CRM Firestore lead status to Hot (Booked)
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "booking_confirmation",
        email: emailParam,
        meetingBooked: true,
        calendlyEventUri: eventUri,
        calendlyInviteeUri: inviteeUri,
        eventId: bookingEventId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("CRM booking confirmation response:", data);
        setCrmSynced(true);
      })
      .catch((err) => {
        console.error("CRM booking confirmation error:", err);
      });
  }, [emailParam, eventName, eventUri, inviteeUri]);

  return (
    <main
      className="min-h-screen bg-[#0A0A0B] flex items-start md:items-center justify-center relative text-center pt-24 pb-16 md:py-16 px-4"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background Ambient Orbits */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40 overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full border border-orange-500/10 absolute animate-[spin_40s_linear_infinite]" />
        <div className="w-[600px] h-[600px] rounded-full border border-orange-500/20 absolute animate-[spin_25s_linear_infinite_reverse]" />
        <div className="w-[400px] h-[400px] rounded-full border border-orange-500/30 absolute animate-[spin_15s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="thank-you-content animate-fade-up relative z-10 max-w-2xl px-4 sm:px-6 flex flex-col items-center w-full">
        {/* Success Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-[0_0_50px_rgba(16,185,129,0.25)]">
          <CheckCircle2 className="text-emerald-500 w-8 h-8 md:w-10 md:h-10 stroke-[2.5]" />
        </div>

        {/* Headlines */}
        {isBooking ? (
          <>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Calendar size={12} className="text-orange-500" />
              <span>Strategy Call Confirmed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-3 leading-tight">
              You&apos;re On The <span className="text-[#FF7A00]">Calendar</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal max-w-md mx-auto mb-6 leading-relaxed">
              {nameParam ? `Hi ${nameParam}, your` : "Your"} 1-on-1 Amazon growth strategy session with Ali Haider has been locked in.
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Inquiry Received</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-3 leading-tight">
              Application <span className="text-[#FF7A00]">Received</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal max-w-md mx-auto mb-6 leading-relaxed">
              We&apos;ve received your brand details and our directors are reviewing your request.
            </p>
          </>
        )}

        {/* What Happens Next Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md mb-6 max-w-lg text-left w-full shadow-2xl">
          <h2 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-2.5 flex items-center gap-2">
            <Clock size={13} className="text-orange-500" />
            <span>What Happens Next?</span>
          </h2>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-5 h-5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                1
              </div>
              <p className="text-zinc-300 text-xs sm:text-[13px] font-normal leading-relaxed">
                {isBooking && emailParam ? (
                  <>
                    A calendar invitation with Google Meet / Zoom access has been sent to{" "}
                    <strong className="text-white font-semibold">{emailParam}</strong>.
                  </>
                ) : (
                  "A calendar invite with video room link has been dispatched to your email."
                )}
              </p>
            </li>
            <li className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-5 h-5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                2
              </div>
              <p className="text-zinc-300 text-xs sm:text-[13px] font-normal leading-relaxed">
                Our team will pre-analyze your market niche, competitors, and ASIN levers prior to the call so we dive directly into high-ROI profit opportunities.
              </p>
            </li>
            <li className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-5 h-5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                3
              </div>
              <p className="text-zinc-300 text-xs sm:text-[13px] font-normal leading-relaxed">
                Need to reschedule or share account metrics early? You can message Ali Haider directly on WhatsApp below.
              </p>
            </li>
          </ul>
        </div>

        {/* Action Buttons: WhatsApp Fast-Track + Return Home (NO AUTO TIMER) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
          <a
            href={`https://wa.me/19128205916?text=${encodeURIComponent(
              `Hi Ali! I just scheduled my strategy session${nameParam ? ` (${nameParam})` : ""}. Looking forward to speaking!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 no-underline"
          >
            <MessageCircle size={15} />
            <span>Message Ali on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 no-underline"
          >
            <Home size={15} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
