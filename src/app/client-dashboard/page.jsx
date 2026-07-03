"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { 
  User, Mail, Phone, LogOut, CheckCircle2, Clock, Settings, HelpCircle, 
  Sparkles, ArrowRight, ShieldAlert, BookOpen, ExternalLink, Globe
} from "lucide-react";

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  // Authentication check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      setAuthChecking(false);
      
      // Check localStorage fallback for scheduled status instantly
      const localBooked = localStorage.getItem("meeting_booked_" + currentUser.uid);
      if (localBooked === "true") {
        setMeetingBooked(true);
      }
    });
    return () => unsub();
  }, [router]);

  // Load user data directly from their user document (bypasses leads/clients permission errors)
  useEffect(() => {
    if (authChecking || !user) return;

    const checkUserBooking = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const docData = userSnap.data();
          if (docData?.meetingBooked === true) {
            setMeetingBooked(true);
            localStorage.setItem("meeting_booked_" + user.uid, "true");
          }
        }
      } catch (err) {
        console.warn("Could not query user document for booking status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUserBooking();
  }, [user, authChecking]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Auth checking loading screen
  if (authChecking) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-zinc-950">
        <div className="w-10 h-10 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">Verifying Workspace Access</p>
      </div>
    );
  }

  // Derive display coordinates
  const displayName = user?.displayName || user?.email?.split("@")[0] || "";
  const displayEmail = user?.email || "";

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col antialiased selection:bg-orange-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(249,115,22,0.4); }
      `}</style>

      {/* ────────────────────────────────────────────────────────
          HEADER
      ──────────────────────────────────────────────────────── */}
      <header className="h-[76px] flex items-center justify-between px-6 md:px-12 border-b border-white/[0.04] bg-zinc-950/85 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <div className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.png" alt="Grow Orbit Logo" width={36} height={36} className="object-contain" />
          </div>
          <div className="text-[22px] font-black tracking-tight uppercase flex gap-1.5 items-center mt-1">
            <span className="text-white">GROW</span>
            <span className="text-[#F97316]">ORBIT</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            href="/get-started"
            className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)] no-underline"
          >
            Get Started
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-white/5 bg-white/[0.02] text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:text-white hover:bg-white/10 cursor-pointer outline-none"
          >
            <LogOut size={12} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
          MAIN INTERFACE
      ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Retrieving Account Files...</p>
        </div>
      ) : (
        <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 md:px-12 py-8 flex flex-col gap-8">
          
          {/* Welcome Dashboard Banner */}
          <div className="relative rounded-[28px] overflow-hidden border border-white/[0.04] p-6 md:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-gradient-to-br from-zinc-900/50 via-zinc-950 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.06),transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={12} className="text-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">Partner Workspace</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                Welcome back, {displayName}
              </h1>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              PORTAL TAB CONTROLS (Exactly 3 Simplified Tabs)
          ──────────────────────────────────────────────────────── */}
          <div className="flex border-b border-white/[0.04] gap-8 md:gap-12 pb-px">
            <button 
              onClick={() => setActiveTab("info")}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none border-b-2 bg-transparent cursor-pointer ${
                activeTab === "info" ? "border-orange-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Info
            </button>
            <button 
              onClick={() => setActiveTab("faq")}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none border-b-2 bg-transparent cursor-pointer ${
                activeTab === "faq" ? "border-orange-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              FAQ
            </button>
            <button 
              onClick={() => setActiveTab("support")}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none border-b-2 bg-transparent cursor-pointer ${
                activeTab === "support" ? "border-orange-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Support
            </button>
          </div>

          {/* ────────────────────────────────────────────────────────
              TAB CONTENT: INFO (Simplified profile + booking strategy)
          ──────────────────────────────────────────────────────── */}
          {activeTab === "info" && (
            <div className="space-y-8 animate-fade-in w-full">
              
              {/* Profile Card (Top Area) */}
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-orange-500" />
                    <h2 className="text-base font-black uppercase tracking-tight text-white">Your Profile Files</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Name</span>
                      <span className="text-sm font-bold text-white block">{displayName}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Email</span>
                      <span className="text-sm font-bold text-white block truncate">{displayEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <Link 
                    href="/" 
                    className="flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-400 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:scale-[1.02] transition-all no-underline w-full"
                  >
                    <Globe size={14} />
                    <span>Return to Main Website</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Strategy Booking Card (Button redirects to get-started page to schedule the strategy call) */}
              <div className="w-full">
                {meetingBooked ? (
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] text-center flex flex-col items-center gap-6 border-emerald-500/20">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 size={28} className="stroke-[2]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-white">Strategy Consultation Scheduled</h3>
                      <p className="text-sm text-zinc-300 font-light max-w-lg mx-auto leading-relaxed">
                        We have verified your strategy session booking details! Ali and the Grow Orbit directors will review your brand details at the scheduled hour.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md w-full bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 text-left text-sm">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Meeting Host</p>
                        <p className="font-bold text-white">Ali & Grow Orbit Directors</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Conference Venue</p>
                        <p className="font-bold text-emerald-400 flex items-center gap-1">
                          <span>Calendly Video Room</span>
                          <ExternalLink size={12} />
                        </p>
                      </div>
                      <div className="sm:col-span-2 border-t border-white/[0.03] pt-4 mt-2">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Consultation Preparation Checklist</p>
                        <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside font-light">
                          <li>Review your Amazon Seller account active metrics</li>
                          <li>Identify your top 3 competitor ASINs</li>
                          <li>Outline your target ACoS guidelines and daily PPC limits</li>
                        </ul>
                      </div>
                    </div>

                    <Link 
                      href="/" 
                      className="flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-orange-500 to-amber-400 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:scale-[1.02] transition-all no-underline mt-4"
                    >
                      <Globe size={14} />
                      <span>Back to Home Screen</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                      <Sparkles size={28} className="animate-pulse" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-white">Schedule Your Free Consultation</h3>
                      <p className="text-sm text-zinc-300 font-light max-w-lg mx-auto leading-relaxed">
                        Ali (Founder & CEO) is waiting to review your brand details. Click below to go to our Get Started page and schedule your strategy consultation.
                      </p>
                    </div>

                    <div className="flex justify-center w-full max-w-md mt-2">
                      <Link 
                        href="/get-started"
                        className="flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-orange-500 to-amber-400 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:scale-[1.02] transition-all no-underline flex-1"
                      >
                        <Phone size={14} />
                        <span>Book Strategy Call</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              TAB CONTENT: FAQ (Simplified accordion)
          ──────────────────────────────────────────────────────── */}
          {activeTab === "faq" && (
            <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] space-y-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-orange-500" />
                <h2 className="text-base font-black uppercase tracking-tight text-white">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-5">
                {[
                  {
                    q: "How do I safely grant Seller Central access to the Grow Orbit team?",
                    a: "Log into Amazon Seller Central, navigate to Settings > User Permissions, and add permissions using our team's designated operations email address. You will always maintain full ownership and can revoke permissions at any point."
                  },
                  {
                    q: "What metrics are tracked inside my client workspace?",
                    a: "Once onboarding is complete and campaigns go live, your dashboard syncs daily with Seller Central to show Advertising Cost of Sales (ACoS), ad-attributed revenue, direct PPC spend limits, and completed operational deliverables."
                  },
                  {
                    q: "What occurs during the initial 15-minute strategy call?",
                    a: "Ali and our directors will review your intake details, perform a basic pre-audit of your competitor ASINs, and structure a custom growth timeline based on your budget and launch metrics."
                  },
                  {
                    q: "How long does visual asset design or listing copywriting take?",
                    a: "Standard creative deliverables (A+ graphic structures, listing copy, and infographics) typically take 5-7 business days once we collect high-resolution photography assets from your brand."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-white/[0.03] pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-bold text-white mb-2 flex gap-2">
                      <span className="text-orange-500 font-mono">Q.</span>
                      <span>{faq.q}</span>
                    </p>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed pl-5">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              TAB CONTENT: SUPPORT (Email & WhatsApp direct details)
          ──────────────────────────────────────────────────────── */}
          {activeTab === "support" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch animate-fade-in">
              
              {/* Emergency SLAs */}
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Settings size={14} className="text-orange-500" />
                    <h2 className="text-base font-black uppercase tracking-tight text-white">Emergency Support SLAs</h2>
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    Our operational desk maintains active watch over ad campaigns and inventory setups. General ticket responses are completed within 4 hours.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                      <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block mb-1">Active Support Windows</span>
                      <span className="text-sm font-bold text-white">Monday – Friday, 9:00 AM – 6:00 PM EST</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">System Operations SLA</span>
                      <span className="text-sm font-bold text-emerald-400">Critical PPC adjustments: &lt; 2 Hours</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.03] pt-6 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>Grow Orbit Helpdesk</span>
                  <span>v2.10.4</span>
                </div>
              </div>

              {/* Support Contact Channels */}
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail size={14} className="text-orange-500" />
                    <h2 className="text-base font-black uppercase tracking-tight text-white">Direct Command Support</h2>
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    Need setup help or have a design request? Connect directly with our core support staff:
                  </p>
                </div>

                <div className="space-y-3">
                  <a 
                    href="mailto:support@groworbit.com?subject=Operations Helpdesk Ticket"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-orange-500/20 hover:bg-orange-500/5 no-underline"
                  >
                    <Mail size={12} className="text-orange-500" />
                    <span>support@groworbit.com</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/19128205916" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs font-bold uppercase tracking-widest text-emerald-400 transition-all duration-300 hover:bg-emerald-500/10 no-underline"
                  >
                    <Phone size={12} className="text-emerald-500" />
                    <span>WhatsApp: +1 (912) 820-5916</span>
                  </a>
                </div>
              </div>

            </div>
          )}

        </main>
      )}

      {/* Footer copyright */}
      <footer className="py-8 border-t border-white/[0.03] text-center text-[11px] text-zinc-500 font-mono mt-auto">
        &copy; {new Date().getFullYear()} GROW ORBIT agency. ALL SYSTEMS OPERATIONAL.
      </footer>
    </div>
  );
}
