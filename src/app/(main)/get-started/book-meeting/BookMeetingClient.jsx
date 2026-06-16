"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, Calendar, ArrowRight, Zap, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore/lite";
import { dbLite as db } from "../../../../firebase/firebaseConfig";

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
  const calendlySrc = `${calendlyBaseUrl}?embed_domain=${embedDomain}&embed_type=Inline&name=${nameParam}&email=${emailParam}&hide_gdpr_banner=1`;

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
              await addDoc(collection(db, "leads"), {
                type: "booking_confirmation",
                leadId: leadId,
                email: initialEmail,
                meetingBooked: true,
                createdAt: serverTimestamp()
              });
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
    <div className="min-h-screen bg-[#060606] text-white font-sans flex flex-col selection:bg-orange-500/30">
      {/* Background ambient glows */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      {/* Mini Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-zinc-900/60">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <div className="text-[14px] font-black tracking-tight text-white">GROW ORBIT</div>
            <div className="text-[8px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Command Centre</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider transition-colors">
            Exit
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* Step Tracker */}
        <div className="w-full max-w-md flex items-center justify-between mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Check size={14} className="stroke-[3]" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Enquiry</span>
          </div>

          <div className="flex-1 h-[1px] bg-emerald-500/30 mx-4" />

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              bookingConfirmed
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : "bg-orange-500/10 border border-orange-500/30 text-orange-500 animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.15)]"
            }`}>
              {bookingConfirmed ? <Check size={14} className="stroke-[3]" /> : <Calendar size={13} />}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${bookingConfirmed ? "text-emerald-400" : "text-orange-500"}`}>
              Schedule
            </span>
          </div>

          <div className={`flex-1 h-[1px] mx-4 transition-colors duration-500 ${bookingConfirmed ? "bg-emerald-500/30" : "bg-zinc-800"}`} />

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              bookingConfirmed 
                ? "bg-violet-500/10 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                : "bg-zinc-900 border-zinc-800 text-zinc-600"
            }`}>
              <Sparkles size={13} />
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${bookingConfirmed ? "text-violet-400" : "text-zinc-600"}`}>
              Confirmed
            </span>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        {!bookingConfirmed ? (
          <div className="w-full text-center flex flex-col items-center">
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
                Let's Lock In Your Strategy Session
              </h2>
              <p className="text-[13px] md:text-[14px] text-zinc-400 font-light leading-relaxed">
                We've received your details! Select a convenient time on the calendar below to finalize your session. Prefilled details will automatically configure.
              </p>
            </div>

            {/* Calendly Inline Embed Iframe — responsive height */}
            <div className="w-full bg-[#0d0d0d] border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative" style={{ minHeight: 'max(500px, 80vh)' }}>
              {updatingDb && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                  <RefreshCw className="text-orange-500 animate-spin" size={28} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Updating Command CRM...</p>
                </div>
              )}
              <iframe
                src={calendlySrc}
                width="100%"
                frameBorder="0"
                className="w-full bg-transparent"
                style={{ height: 'max(500px, 80vh)' }}
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
