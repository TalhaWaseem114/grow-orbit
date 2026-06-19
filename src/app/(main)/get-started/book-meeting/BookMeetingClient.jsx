"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, Calendar, ArrowRight, Zap, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";


const MAX_RETRIES = 3;

function BookMeetingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");
  const initialName = searchParams.get("name") || "";
  const initialEmail = searchParams.get("email") || "";

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [updatingDb, setUpdatingDb] = useState(false);
  const [error, setError] = useState("");

  // Construct prefilled Calendly URL — use env variable or fallback domain, NOT window.location.host on SSR
  const embedDomain = process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') || "grow-orbit.netlify.app";
  const calendlyBaseUrl = "https://calendly.com/talhawaseem512/new-meeting";
  const nameParam = encodeURIComponent(initialName);
  const emailParam = encodeURIComponent(initialEmail);
  const calendlySrc = `${calendlyBaseUrl}?embed_domain=${embedDomain}&embed_type=Inline&name=${nameParam}&email=${emailParam}&hide_gdpr_banner=1&background_color=0d0d0d&text_color=ffffff&primary_color=f97316`;

  useEffect(() => {
    const handleCalendlyMessage = async (e) => {
      // Security check: ensure event is from calendly.com
      if (e.origin !== "https://calendly.com") return;

      if (e.data && e.data.event === "calendly.event_scheduled") {
        console.log("Calendly scheduled event detected:", e.data);
        setUpdatingDb(true);

        // Track Meta Pixel Schedule event
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Schedule", {
            content_name: "Strategy Session Confirmation"
          });
        }

        if (leadId) {
          let success = false;
          for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
              // Write a booking_confirmation document anonymously.
              // Since the guest is unauthenticated, they cannot update the lead document directly.
              // Our Admin Dashboard has a real-time listener that will process this confirmation document,
              // update the parent lead using admin credentials, and delete the confirmation document.
              const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  type: "booking_confirmation",
                  leadId: leadId,
                  email: initialEmail,
                  meetingBooked: true,
                }),
              });
              if (!response.ok) {
                throw new Error("Failed to register booking");
              }
              console.log("Booking confirmation document created successfully!");
              success = true;
              break;
            } catch (err) {
              console.error(`Booking confirmation attempt ${attempt + 1} failed:`, err);
              if (attempt < MAX_RETRIES - 1) {
                // Exponential backoff
                await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
              }
            }
          }

          if (!success) {
            // Store in localStorage as a fallback so it can be retried later
            try {
              localStorage.setItem(`booking_fallback_${leadId}`, JSON.stringify({
                leadId,
                email: initialEmail,
                timestamp: Date.now()
              }));
            } catch (storageErr) {
              // localStorage may be unavailable
            }
            setError("Failed to register booking in CRM, but your meeting slot is saved. Our team will confirm manually.");
          }
        }

        setUpdatingDb(false);
        setBookingConfirmed(true);
      }
    };

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [leadId, initialEmail]);

  return (
    <div className="min-h-screen bg-[#060606] text-white font-sans flex flex-col selection:bg-orange-500/30 overflow-x-hidden relative">
      {/* Background ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Background ambient glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-[15%] left-[-15%] w-[50%] h-[40%] rounded-full bg-orange-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[50%] h-[40%] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      {/* Mini Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-7 flex items-center justify-between border-b border-zinc-900/40 backdrop-blur-[2px]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <div className="text-[14px] font-black tracking-tight text-white transition-colors group-hover:text-orange-400">GROW ORBIT</div>
            <div className="text-[8px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Command Centre</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="px-4 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800 hover:border-zinc-700 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all shadow-md focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-12 flex flex-col items-center">
        
        {/* Step Tracker (Glass Panel) */}
        <div className="w-full max-w-md bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-2xl px-6 py-4.5 mb-8 sm:mb-12 shadow-[0_12px_30px_rgba(0,0,0,0.6)] relative z-20">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <Check size={15} className="stroke-[3]" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-400 font-mono">Enquiry</span>
            </div>

            <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-500/40 to-orange-500/40 mx-2 sm:mx-4 translate-y-[-10px]" />

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative ${
                bookingConfirmed
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "bg-orange-500/15 border-2 border-orange-500/80 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.25)]"
              }`}>
                {bookingConfirmed ? <Check size={15} className="stroke-[3]" /> : <Calendar size={14} />}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] font-mono ${bookingConfirmed ? "text-emerald-400" : "text-orange-500"}`}>
                Schedule
              </span>
            </div>

            <div className={`flex-1 h-[2px] mx-2 sm:mx-4 translate-y-[-10px] transition-all duration-500 ${
              bookingConfirmed 
                ? "bg-gradient-to-r from-orange-500/40 to-violet-500/40" 
                : "bg-zinc-800/60"
            }`} />

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                bookingConfirmed 
                  ? "bg-violet-500/15 border-2 border-violet-500 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-600"
              }`}>
                <Sparkles size={14} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] font-mono ${
                bookingConfirmed ? "text-violet-400" : "text-zinc-600"
              }`}>
                Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        {!bookingConfirmed ? (
          <div className="w-full text-center flex flex-col items-center">
            <div className="max-w-2xl mb-6 sm:mb-8 flex flex-col items-center">
              {/* Secure Session Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                <Sparkles size={11} className="text-orange-400 shrink-0" />
                Secure CRM Session Initialized
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-300 leading-tight">
                Let's Lock In Your Strategy Session
              </h2>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] text-zinc-400 font-light leading-relaxed max-w-xl">
                We've received your details! Select a convenient time on the calendar below to finalize your session. Prefilled details will automatically configure.
              </p>
            </div>

            {/* Calendly Inline Embed Iframe — responsive height inside a clean glass container */}
            <div className="w-full relative min-h-[920px] sm:min-h-[950px] md:min-h-[980px] rounded-3xl border border-white/5 bg-zinc-950/30 backdrop-blur-md shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Subtle top edge border glow line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none z-10" />
              {updatingDb && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 rounded-3xl">
                  <RefreshCw className="text-orange-500 animate-spin" size={28} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Updating Command CRM...</p>
                </div>
              )}
              <iframe
                src={calendlySrc}
                width="100%"
                frameBorder="0"
                className="w-full bg-transparent h-[920px] sm:h-[950px] md:h-[980px]"
                title="Calendly Strategy Scheduler"
              />
            </div>
          </div>
        ) : (
          /* Confirmation Success Page */
          <div className="w-full max-w-lg bg-[#0d0d0d] border border-zinc-900 rounded-3xl p-8 md:p-10 text-center shadow-2xl relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative">
              <Check size={28} className="stroke-[3]" />
              <div className="absolute -inset-1 rounded-full border border-emerald-500/10 animate-ping pointer-events-none" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
              Meeting Confirmed!
            </h2>
            <p className="text-[13px] text-zinc-400 font-light leading-relaxed mb-8">
              Hi {initialName || "there"}, your strategy call slot is reserved. We've sent a calendar invite with Zoom access links straight to <strong className="text-white font-medium">{initialEmail || "your email"}</strong>.
            </p>

            {/* What to expect list */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 mb-8 text-left space-y-4">
              <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Session Roadmap</div>

              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</div>
                <div>
                  <div className="text-[12px] font-bold text-white">Visual Audit Blueprint</div>
                  <div className="text-[11px] text-zinc-500 font-light mt-0.5">Our design directors will inspect your ASIN layout and prep recommendations.</div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</div>
                <div>
                  <div className="text-[12px] font-bold text-white">Live Listing Strategy</div>
                  <div className="text-[11px] text-zinc-500 font-light mt-0.5">We will review your listing live on the call, mapping details to lift conversions.</div>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-400 font-medium mb-4 uppercase tracking-widest">{error}</p>
            )}

            {/* Back Home CTA */}
            <Link
              href="/"
              className="w-full py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.2)] flex items-center justify-center gap-3 group"
            >
              Return to Website
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </main>

      {/* Footer copyright */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-zinc-900/60 text-center text-zinc-650 text-[10px] font-medium tracking-wider uppercase">
        © {new Date().getFullYear()} Grow Orbit. All rights reserved.
      </footer>
    </div>
  );
}

export default function BookMeetingClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060606] text-white flex flex-col items-center justify-center">
        <RefreshCw className="text-orange-500 animate-spin mb-4" size={24} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Loading Strategy Booking...</p>
      </div>
    }>
      <BookMeetingContent />
    </Suspense>
  );
}
