"use client";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import gsap from "gsap";
import { ArrowRight, Eye, EyeOff, X, User, Mail, Lock, Shield, BarChart3, Target, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const whitePanelRef = useRef(null);
  const darkPanelRef = useRef(null);
  const contentRef = useRef(null);

  const montserrat = { fontFamily: "'Montserrat', sans-serif" };

  useEffect(() => {
    gsap.fromTo([contentRef.current, darkPanelRef.current],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  const navigateToLogin = () => {
    const isMobile = window.innerWidth < 1024;
    const tl = gsap.timeline({ onComplete: () => router.push("/login/") });
    tl.to([contentRef.current, darkPanelRef.current], { opacity: 0, y: -10, duration: 0.3 });
    tl.to(whitePanelRef.current, { x: "-100%", borderRadius: isMobile ? "0px" : "0px 48px 48px 0px", duration: 0.6, ease: "power2.inOut" });
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const cred = await signInWithPopup(auth, provider);
      // Check if user document already exists, if not, create it
      const userRef = doc(db, "users", cred.user.uid);
      const userSnap = await getDoc(userRef);
      let role = "user";
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: cred.user.email,
          displayName: cred.user.displayName || "Google User",
          role: "user",
          createdAt: serverTimestamp(),
        });
      } else {
        role = userSnap.data()?.role || "user";
      }
      if (role === "admin") {
        router.push("/admin-dashboard");
      } else {
        router.push("/get-started");
      }
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });

      // Store user role in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        displayName: form.name,
        role: "user",
        createdAt: serverTimestamp(),
      });

      router.push("/get-started");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen lg:h-screen overflow-hidden relative" style={{ ...montserrat, background: "#0a0a0a" }}>
      <style>{`
        .auth-input { transition: all 0.2s ease; }
        .auth-input:focus { border-color: #f97316 !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
        .auth-input::placeholder { color: #c0c0c0; }
        .google-btn:hover { background: #fafafa !important; border-color: #e5e5e5 !important; }
        .sign-btn:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 8px 30px rgba(249,115,22,0.4) !important; }
        .sign-btn { transition: all 0.25s ease; }
        .auth-panel-register { border-radius: 0; }
        @media (min-width: 1024px) {
          .auth-panel-register { border-radius: 48px 0 0 48px; }
        }
      `}</style>

      {/* ══════════ LEFT PANEL — Dark / Planet ══════════ */}
      <div
        ref={darkPanelRef}
        className="hidden lg:flex flex-col justify-between"
        style={{ width:"50%", padding:"32px 48px", position:"relative", overflow:"hidden", zIndex:10 }}
      >
        {/* Background Image & Overlays */}
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <Image src="/assets/planet-bg.png" alt="Planet" fill style={{ objectFit:"cover", objectPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 100%)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.95) 100%)" }} />
        </div>

        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", justifyContent:"flex-start", gap:10, color:"#fff", textDecoration:"none", position:"relative", zIndex:2, transition:"opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
          <div style={{ position:"relative", width:36, height:36 }}>
            <Image src="/logo.png" alt="Grow Orbit Logo" fill style={{ objectFit:"contain" }} sizes="36px" />
          </div>
          <span style={{ fontSize:18, fontWeight:900, letterSpacing:"0.02em", textTransform:"uppercase", lineHeight:1 }}>Grow <span style={{ color:"#f97316" }}>Orbit</span></span>
        </Link>

        {/* Centre Content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", position:"relative", zIndex:2, marginTop: 40 }}>
          <div style={{ maxWidth:500, position:"relative", zIndex:10 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20, background:"rgba(249,115,22,0.1)", border:"1px solid rgba(249,115,22,0.2)", borderRadius:100, padding:"6px 14px", backdropFilter:"blur(10px)" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 8px rgba(74,222,128,0.8)" }} />
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"#f97316" }}>Ready to launch · 24/7</span>
            </div>

            <h1 style={{ fontSize:64, fontWeight:900, color:"#fff", letterSpacing:"-0.03em", lineHeight:0.9, textTransform:"uppercase", marginBottom:20 }}>
              Join the<br />
              <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:300, fontStyle:"italic", color:"#f97316", textTransform:"none", letterSpacing:0, fontSize:64 }}>orbit.</span>
            </h1>
            <p style={{ fontSize:16, fontWeight:400, color:"rgba(255,255,255,0.6)", lineHeight:1.7, maxWidth: 380 }}>
              Create an account to manage your Amazon growth — listings, PPC, operations, all in one place.
            </p>

            {/* Features */}
            <div style={{ display:"flex", gap:24, marginTop:40 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", border:"1px solid rgba(249,115,22,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f97316" }}>
                  <BarChart3 size={16} />
                </div>
                <div style={{ fontSize:11, fontWeight:600, color:"#fff", lineHeight:1.2, letterSpacing:"0.02em" }}>Data-Driven<br/><span style={{ color:"rgba(255,255,255,0.4)", fontWeight:400 }}>Decisions</span></div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", border:"1px solid rgba(249,115,22,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f97316" }}>
                  <Target size={16} />
                </div>
                <div style={{ fontSize:11, fontWeight:600, color:"#fff", lineHeight:1.2, letterSpacing:"0.02em" }}>Full-Funnel<br/><span style={{ color:"rgba(255,255,255,0.4)", fontWeight:400 }}>Control</span></div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", border:"1px solid rgba(249,115,22,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f97316" }}>
                  <Rocket size={16} />
                </div>
                <div style={{ fontSize:11, fontWeight:600, color:"#fff", lineHeight:1.2, letterSpacing:"0.02em" }}>Predictable<br/><span style={{ color:"rgba(255,255,255,0.4)", fontWeight:400 }}>Growth</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.2)", fontWeight:600, position:"relative", zIndex:2 }}>
          © 2026 GROW ORBIT INC.
        </div>
      </div>

      {/* ══════════ RIGHT PANEL — Dark Form ══════════ */}
      <div
        ref={whitePanelRef}
        className="flex-1 flex flex-col relative z-20 auth-panel-register p-8 lg:p-12"
        style={{
          background: "#fff",
          boxShadow: "-24px 0 80px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close button inside right panel (top right) */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 right-8 z-50 p-2 transition-colors"
          style={{ color: "#a3a3a3", display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36 }}
          onMouseEnter={e => {e.currentTarget.style.color = "#0e0e0e";}}
          onMouseLeave={e => {e.currentTarget.style.color = "#a3a3a3";}}
        >
          <X size={20} />
        </button>

        <div ref={contentRef} className="flex-1 flex flex-col justify-center items-center h-full">
          <div style={{ width: "100%", maxWidth: 400 }}>

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#f97316" }} />
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", color:"#a3a3a3" }}>Grow Orbit · Onboarding</span>
              </div>
              <h2 style={{ fontSize:32, fontWeight:900, color:"#0e0e0e", letterSpacing:"-0.03em", lineHeight:1, marginBottom:8 }}>
                Create <span style={{ color: "#f97316" }}>account.</span>
              </h2>
              <p style={{ fontSize:14, fontWeight:400, color:"#a3a3a3" }}>Sign up to get started.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div>
                <label htmlFor="register-name" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#737373", display:"block", marginBottom:6 }}>Full Name</label>
                <div style={{ position:"relative" }}>
                  <User size={16} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#f97316" }} />
                  <input
                    id="register-name"
                    name="name" type="text" placeholder="John Doe"
                    className="auth-input"
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                    style={{ width:"100%", padding:"12px 14px 12px 40px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:14, fontWeight:500, color:"#0e0e0e", background:"#fafafa", boxSizing:"border-box" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-email" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#737373", display:"block", marginBottom:6 }}>Email Address</label>
                <div style={{ position:"relative" }}>
                  <Mail size={16} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#f97316" }} />
                  <input
                    id="register-email"
                    name="email" type="email" placeholder="you@brand.com"
                    className="auth-input"
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                    style={{ width:"100%", padding:"12px 14px 12px 40px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:14, fontWeight:500, color:"#0e0e0e", background:"#fafafa", boxSizing:"border-box" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-password" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#737373", display:"block", marginBottom:6 }}>Password</label>
                <div style={{ position:"relative" }}>
                  <Lock size={16} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#f97316" }} />
                  <input
                    id="register-password"
                    name="password" type={showPassword ? "text" : "password"} placeholder="••••••••••"
                    className="auth-input"
                    onChange={e => setForm({...form, password: e.target.value})}
                    required
                    style={{ width:"100%", padding:"12px 36px 12px 40px", borderRadius:10, border:"1.5px solid #e5e5e5", fontSize:14, fontWeight:500, color:"#0e0e0e", background:"#fafafa", boxSizing:"border-box" }}
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#a3a3a3", display:"flex" }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:-4 }}>
                <span style={{ fontSize:12, color:"#a3a3a3" }}>Already have an account? </span>
                <button
                  type="button" onClick={navigateToLogin}
                  style={{ fontSize:12, fontWeight:600, color:"#f97316", background:"none", border:"none", cursor:"pointer", marginLeft:4 }}
                >Sign In →</button>
              </div>

              {error && (
                <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:10, padding:"10px 16px", fontSize:12, fontWeight:600, color:"#ef4444", marginTop: 4 }}>
                  {error}
                </div>
              )}

              <button
                disabled={loading} type="submit"
                className="sign-btn"
                style={{ width:"100%", padding:"14px", marginTop:8, borderRadius:10, background:"linear-gradient(135deg, #f97316, #ea580c)", color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 8px 28px rgba(249,115,22,0.3)", fontFamily:"'Montserrat', sans-serif" }}
              >
                {loading ? "Creating..." : "Sign Up"} {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Divider */}
            <div style={{ position:"relative", margin:"24px 0", textAlign:"center" }}>
              <div style={{ position:"absolute", inset:"50% 0 auto", height:1, background:"#f0f0f0" }} />
              <span style={{ position:"relative", background:"#fff", padding:"0 16px", fontSize:10, fontWeight:700, color:"#c0c0c0", letterSpacing:"0.1em", textTransform:"uppercase" }}>or continue with</span>
            </div>

            {/* Google */}
            <button
               onClick={handleGoogleSignUp} type="button"
              className="google-btn"
              style={{ width:"100%", padding:"12px", borderRadius:10, border:"1.5px solid #e5e5e5", background:"#fff", color:"#374151", fontWeight:600, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", gap:12, cursor:"pointer", fontFamily:"'Montserrat', sans-serif", transition:"all 0.2s" }}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width:18, height:18 }} />
              Sign up with Google
            </button>
          </div>
        </div>

        {/* Footer of the right panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 pt-10 sm:pt-4" style={{ fontSize:11, color:"#a3a3a3", fontWeight:500 }}>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <Shield size={16} style={{ color:"#f97316" }} />
            <span style={{ maxWidth: 280, lineHeight: 1.4 }}>Your data is secure with enterprise-grade encryption.</span>
          </div>
          <Link href="/contact" style={{ color:"#a3a3a3", textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}
            onMouseEnter={e => e.currentTarget.style.color="#0e0e0e"}
            onMouseLeave={e => e.currentTarget.style.color="#a3a3a3"}
          >
            Contact Us <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
