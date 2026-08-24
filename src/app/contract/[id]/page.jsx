"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Copy, Check, Download, AlertTriangle, 
  Eye, ShieldCheck, Clock, User, Globe, Building, 
  Activity, FileText, Loader, CheckCircle, FileX,
  PenTool, Type, Upload, RefreshCw
} from "lucide-react";

export default function ContractDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [voiding, setVoiding] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [showVoidModal, setShowVoidModal] = useState(false);
  const [zoom, setZoom] = useState(0.65);

  // Signing states
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [signatureType, setSignatureType] = useState("type"); // "type" | "draw"
  const [typedSignature, setTypedSignature] = useState("");
  const [uploadedSignature, setUploadedSignature] = useState(null); // base64
  const [isSigning, setIsSigning] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  
  const fileInputRef = useRef(null);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [drawnSignatureData, setDrawnSignatureData] = useState(null); // base64 representation of drawing
  const modalCanvasRef = useRef(null);
  const [isModalDrawing, setIsModalDrawing] = useState(false);

  useEffect(() => {
    if (id) {
      loadContract();
    }
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setZoom(0.25);
      } else if (window.innerWidth < 1024) {
        setZoom(0.45);
      } else {
        setZoom(0.65);
      }
    }
  }, []);

  useEffect(() => {
    if (contract) {
      document.title = "Grow Orbit Contract for Amazon Growth Partnership";
    }
  }, [contract]);


  const loadContract = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contracts/${id}`);
      const data = await res.json();
      if (data.success) {
        setContract(data.contract);
        setSignerName(data.contract.clientName || "");
        setSignerEmail(data.contract.clientEmail || "");
        setCompanyName(data.contract.companyName || "");
      } else {
        setError(data.error || "Failed to load contract");
      }
    } catch (err) {
      setError("Connection error: Unable to load agreement.");
    } finally {
      setLoading(false);
    }
  };

  const pointsRef = useRef([]);
  const lastPointRef = useRef({ x: 0, y: 0 });

  // Canvas drawing handlers (Modal-based)
  const startModalDrawing = (e) => {
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    pointsRef.current = [{ x, y }];
    lastPointRef.current = { x, y };

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsModalDrawing(true);
  };

  const drawModal = (e) => {
    if (!isModalDrawing) return;
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const rawX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const rawY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    // Apply exponential moving average to filter out micro-shakes
    const lastPoint = pointsRef.current[pointsRef.current.length - 1];
    const x = lastPoint ? lastPoint.x + (rawX - lastPoint.x) * 0.45 : rawX;
    const y = lastPoint ? lastPoint.y + (rawY - lastPoint.y) * 0.45 : rawY;

    pointsRef.current.push({ x, y });

    const points = pointsRef.current;
    if (points.length >= 3) {
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      const xc = (p1.x + p2.x) / 2;
      const yc = (p1.y + p2.y) / 2;

      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
      ctx.stroke();

      lastPointRef.current = { x: xc, y: yc };
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopModalDrawing = () => {
    if (!isModalDrawing) return;
    const canvas = modalCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const points = pointsRef.current;
      if (ctx && points.length >= 2) {
        const lastPoint = points[points.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.stroke();
      }
    }
    setIsModalDrawing(false);
  };

  const clearModalCanvas = () => {
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveModalSignature = () => {
    const canvas = modalCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const buffer = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    const isBlank = !buffer.some(color => color !== 0);
    if (isBlank) {
      alert("Please draw your signature before saving.");
      return;
    }

    setDrawnSignatureData(canvas.toDataURL());
    setIsDrawModalOpen(false);
  };

  const handleUploadFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedSignature(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSignContract = async () => {
    if (!signerName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!signerEmail.trim() || !signerEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!consentChecked) {
      alert("Please accept the electronic signature consent.");
      return;
    }

    let signatureValue = "";
    if (signatureType === "type") {
      if (!typedSignature.trim()) {
        alert("Please type your signature.");
        return;
      }
      signatureValue = typedSignature;
    } else if (signatureType === "draw") {
      if (!drawnSignatureData) {
        alert("Please draw your signature.");
        return;
      }
      signatureValue = drawnSignatureData;
    }

    setIsSigning(true);
    try {
      const res = await fetch(`/api/public/contracts/${contract.shareToken}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signerName,
          signerEmail,
          method: signatureType,
          signatureValue
        })
      });

      const data = await res.json();
      if (data.success) {
        alert("Contract signed and completed successfully!");
        loadContract();
      } else {
        alert(data.error || "Failed to sign contract.");
      }
    } catch (err) {
      console.error("Sign error:", err);
      alert("An error occurred while signing the agreement.");
    } finally {
      setIsSigning(false);
    }
  };

  const handleDownloadPDF = () => {
    document.title = "Grow Orbit Contract for Amazon Growth Partnership";
    window.print();
  };

  const copyLink = () => {
    if (!contract?.shareToken) return;
    const link = `${window.location.origin}/sign/${contract.shareToken}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parseSafeDate = (val) => {
    if (!val) return null;
    let d = null;
    if (val instanceof Date) {
      d = val;
    } else if (typeof val === "object") {
      const seconds = val.seconds !== undefined ? val.seconds : val._seconds;
      if (seconds !== undefined) {
        d = new Date(seconds * 1000);
      }
    } else {
      d = new Date(val);
    }
    return d && !isNaN(d.getTime()) ? d : null;
  };

  const formatDateDisplay = (val) => {
    if (!val) return "—";
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val.trim())) {
      const [y, m, d] = val.trim().split("-");
      const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
      return dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }
    const d = parseSafeDate(val);
    if (!d) return "—";
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const handleVoidContract = async () => {
    if (!voidReason.trim()) {
      alert("Please provide a reason for voiding this contract.");
      return;
    }
    setVoiding(true);
    try {
      const res = await fetch(`/api/contracts/${id}/void`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: voidReason })
      });
      const data = await res.json();
      if (data.success) {
        setContract(prev => ({
          ...prev,
          status: "void",
          voidReason: voidReason
        }));
        setShowVoidModal(false);
        setVoidReason("");
        loadContract(); // Refresh audit trail and details
      } else {
        alert(data.error || "Failed to void contract");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setVoiding(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#fff" }}>
        <Loader className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#fff", gap: 16 }}>
        <AlertTriangle size={48} style={{ color: "#ef4444" }} />
        <p>{error || "No contract found."}</p>
        <button onClick={() => router.push("/admin-dashboard")} style={{ background: "#f97316", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const statusCfg = {
    draft: { label: "Draft", color: "#71717a", bg: "rgba(113, 113, 122, 0.15)" },
    awaiting_review: { label: "In Review", color: "#f97316", bg: "rgba(249, 115, 22, 0.15)" },
    awaiting_signature: { label: "Awaiting Signature", color: "#eab308", bg: "rgba(234, 179, 8, 0.15)" },
    viewed: { label: "Viewed", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
    signed: { label: "Signed ✍️", color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
    void: { label: "Voided", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
  }[contract.status] || { label: contract.status, color: "#71717a", bg: "rgba(113, 113, 122, 0.15)" };

  const isExecuted = contract.status === "signed";
  const canVoid = !["signed", "completed", "void", "expired"].includes(contract.status);

  // Check if all input fields are filled
  const areDetailsFilled = signerName.trim() !== "" && signerEmail.trim() !== "" && companyName.trim() !== "";
  const isDetailsActive = contract.status === "viewed" || isExecuted || areDetailsFilled;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      
      <div className="no-print contract-header-bar" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, background: "#121212" }}>
        <FileText size={18} color="#f97316" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="contract-id-text" style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "14px", whiteSpace: "nowrap" }}>{contract.contractNumber}</span>
            <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px", background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}35`, whiteSpace: "nowrap" }}>
              {statusCfg.label}
            </span>
          </div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {contract.clientName || "—"} · {contract.companyName || "—"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="contract-header-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Zoom Controls */}
          <div className="zoom-controls-wrapper" style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "3px 8px", background: "rgba(255,255,255,0.02)", marginRight: "12px" }}>
            <button 
              onClick={() => setZoom(z => Math.max(0.2, z - 0.05))} 
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px", fontWeight: "bold", padding: "0 4px" }}
            >
              -
            </button>
            <span style={{ fontSize: "11px", color: "#f1f5f9", minWidth: "36px", textAlign: "center", fontWeight: 700 }}>
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(z => Math.min(1.2, z + 0.05))} 
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px", fontWeight: "bold", padding: "0 4px" }}
            >
              +
            </button>
          </div>

          <button 
            className="download-pdf-btn"
            disabled={!isExecuted}
            onClick={isExecuted ? handleDownloadPDF : undefined}
            style={{ 
              border: "1px solid rgba(255,255,255,0.08)", 
              background: "rgba(255,255,255,0.03)", 
              color: isExecuted ? "#fff" : "#64748b", 
              cursor: isExecuted ? "pointer" : "not-allowed", 
              fontSize: "11px", 
              fontWeight: 700, 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              padding: "7px 14px", 
              borderRadius: "8px",
              opacity: isExecuted ? 1 : 0.5
            }}
            title={!isExecuted ? "Please sign the contract to download a copy" : "Download signed agreement PDF"}
          >
            <Download size={13}/>
            <span className="download-pdf-text-desktop">Download PDF</span>
            <span className="download-pdf-text-mobile" style={{ display: "none" }}>Download</span>
          </button>

          <a 
            className="contact-support-btn"
            href="https://wa.me/19128205916"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              padding: "7px 14px", 
              borderRadius: "8px", 
              border: "1px solid rgba(34, 197, 94, 0.3)", 
              background: "rgba(34, 197, 94, 0.1)", 
              color: "#22c55e", 
              cursor: "pointer", 
              fontSize: "11px", 
              fontWeight: 700,
              textDecoration: "none"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "2px" }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span className="contact-support-text-desktop">Contact Support: +1 (912) 820-5916</span>
            <span className="contact-support-text-mobile" style={{ display: "none" }}>Contact Support</span>
          </a>
        </div>
      </div>

      {/* ── Workspace body ── */}
      <div className="contract-workspace-body" style={{ flex: 1, display: "flex", overflow: "hidden", height: "calc(100vh - 69px)" }}>
        
        <div className="contract-workspace-scroll" style={{ flex: 1, overflow: "auto", padding: "40px", background: "#090d16", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          
          {/* Scaled Container Wrapper */}
          <div className="contract-scaled-wrapper" style={{ width: 1440 * zoom, height: 2300 * zoom, position: "relative", flexShrink: 0, transition: "all 0.2s" }}>
            
            <div className="contract-paper-sheet" style={{ 
              position: "absolute",
              top: 0,
              left: 0,
              width: "1440px", 
              height: "2300px", 
              background: "#fff", 
              borderRadius: "24px", 
              overflow: "hidden",
              padding: "80px 80px", 
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)", 
              fontFamily: "'Inter', sans-serif",
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              transition: "transform 0.2s"
            }}>
            
            {/* Watermark */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none", opacity: 0.02, zIndex: 0 }}>
              <span style={{ fontSize: "72px", fontWeight: 900, letterSpacing: "8px", transform: "rotate(-45deg)", whiteSpace: "nowrap", color: "#000" }}>
                {isExecuted ? "SIGNED & EXECUTED" : contract.status === "void" ? "VOIDED" : "AWAITING SIGNATURE"}
              </span>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Brand Banner */}
              <div className="contract-brand-banner" style={{ 
                display: "flex", 
                alignItems: "stretch", 
                justifyContent: "space-between",
                margin: "-80px -80px 48px -80px", 
                height: "160px",
                position: "relative",
                background: "#fff",
                borderBottom: "1px solid #e2e8f0"
              }}>
                {/* Left Content */}
                <div className="brand-banner-left" style={{ display: "flex", alignItems: "center", padding: "0 80px", zIndex: 2 }}>
                  {/* Logo */}
                  <div className="brand-logo-container" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/logo.png" alt="Grow Orbit Logo" style={{ height: "48px", objectFit: "contain" }} />
                    <span style={{ fontSize: "22px", fontWeight: 900, fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.5px" }}><span style={{ color: "#1e293b" }}>GROW</span> <span style={{ color: "#ea580c" }}>ORBIT</span></span>
                  </div>
                  
                  {/* Divider */}
                  <div className="brand-divider" style={{ width: "2px", height: "56px", background: "#e2e8f0", margin: "0 32px" }}></div>
                  
                  {/* Title & ID */}
                  <div className="brand-title-container">
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "4px", fontFamily: "'Montserrat', sans-serif" }}>Contract for Amazon Growth Partnership</div>
                    <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Contract ID: <span style={{ color: "#f97316" }}>{contract.contractNumber || "—"}</span></div>
                  </div>
                </div>

                {/* Right Dark Section */}
                <div className="brand-banner-right-dark" style={{ 
                  position: "absolute", 
                  top: 0, 
                  right: 0, 
                  bottom: 0, 
                  width: "calc(40% - 30px)", 
                  background: "#0f172a", 
                  clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "80px",
                  zIndex: 1
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: "18px", color: "#fff", fontWeight: 700, lineHeight: 1.4 }}>
                      Secure & Legally<br/>Binding Agreement
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stepper */}
              <div className="no-print contract-stepper-wrapper" style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
                <div className="contract-stepper-container" style={{ display: "flex", alignItems: "flex-start", width: "100%", maxWidth: "800px", justifyContent: "space-between", position: "relative" }}>
                  
                  {/* Connecting Lines */}
                  <div className="stepper-connecting-line" style={{ position: "absolute", top: "24px", left: "12%", right: "12%", height: "2px", background: "#f1f5f9", zIndex: 0 }}></div>

                  {/* Step 1 */}
                  <div className="stepper-step-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                    <div className="stepper-step-circle" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f97316", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, boxShadow: "0 0 0 4px #fff" }}>1</div>
                    <div className="stepper-step-label" style={{ color: "#f97316", fontSize: "15px", fontWeight: 600, textAlign: "center" }}>Review Contract</div>
                  </div>

                   {/* Step 2 */}
                  <div className="stepper-step-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                    <div className="stepper-step-circle" style={{ width: "48px", height: "48px", borderRadius: "50%", background: isDetailsActive ? "#f97316" : "#f8fafc", color: isDetailsActive ? "#fff" : "#475569", border: isDetailsActive ? "none" : "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, boxShadow: "0 0 0 4px #fff" }}>2</div>
                    <div className="stepper-step-label" style={{ color: isDetailsActive ? "#f97316" : "#64748b", fontSize: "15px", fontWeight: isDetailsActive ? 600 : 500, textAlign: "center" }}>Your Details</div>
                  </div>

                  {/* Step 3 */}
                  <div className="stepper-step-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                    <div className="stepper-step-circle" style={{ width: "48px", height: "48px", borderRadius: "50%", background: isExecuted ? "#f97316" : "#f8fafc", color: isExecuted ? "#fff" : "#475569", border: isExecuted ? "none" : "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, boxShadow: "0 0 0 4px #fff" }}>3</div>
                    <div className="stepper-step-label" style={{ color: isExecuted ? "#f97316" : "#64748b", fontSize: "15px", fontWeight: isExecuted ? 600 : 500, textAlign: "center" }}>Sign Contract</div>
                  </div>

                  {/* Step 4 */}
                  <div className="stepper-step-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                    <div className="stepper-step-circle" style={{ width: "48px", height: "48px", borderRadius: "50%", background: isExecuted ? "#22c55e" : "#f8fafc", color: isExecuted ? "#fff" : "#475569", border: isExecuted ? "none" : "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, boxShadow: "0 0 0 4px #fff" }}>4</div>
                    <div className="stepper-step-label" style={{ color: isExecuted ? "#22c55e" : "#64748b", fontSize: "15px", fontWeight: isExecuted ? 600 : 500, textAlign: "center" }}>Completed</div>
                  </div>

                </div>
              </div>

              {/* 2-Column Document Layout */}
              <div className="contract-flex-row" style={{ display: "grid", gridTemplateColumns: "820px 420px", gap: "40px" }}>
                
                {/* Left Column (Contract Details) */}
                <div className="contract-left-col" style={{ border: "1.5px solid #e2e8f0", borderRadius: "16px", padding: "40px", minHeight: "1000px", background: "#fff", color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                  <div className="contract-preview-container">
                    <style>{`
                      .contract-preview-container h2 { text-align: left; font-size: 20px; font-weight: 800; letter-spacing: 0.02em; margin-bottom: 24px; color: #0f172a; text-transform: uppercase; position: relative; padding-bottom: 16px; }
                      .contract-preview-container h2::after { content: ''; position: absolute; left: 0; bottom: 0; width: 40px; height: 3px; background: #ea580c; }
                      .contract-preview-container h3 { font-size: 14px; font-weight: 700; margin-bottom: 6px; margin-top: 24px; color: #1e293b; text-transform: uppercase; }
                      .contract-preview-container p { font-size: 13px; line-height: 1.6; margin-bottom: 24px; color: #334155; }
                      .contract-preview-container strong { font-weight: 700; color: #f97316; }
                      .contract-preview-container em { font-style: italic; color: #64748b; }
                    `}</style>
                    <div dangerouslySetInnerHTML={{ __html: contract.renderedHtml }} />
                  </div>
 
                  {/* Disclaimer Box */}
                  <div style={{ marginTop: "32px", padding: "20px 24px", background: "#fff7ed", borderRadius: "12px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ color: "#ea580c", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>By signing below</div>
                      <div style={{ fontSize: "12px", color: "#334155", lineHeight: "1.6" }}>
                        You acknowledge that you have read, understood and agree to be bound by this Agreement. Your electronic signature has the same legal effect as your handwritten signature.
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Right Column (Client Information & Signatures) */}
                <div className="contract-right-col" style={{ border: "1px solid #e2e8f0", borderRadius: "16px", minHeight: "1000px", background: "#fff", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
                  
                  {/* Header */}
                  <div style={{ background: "#0f172a", padding: "36px 24px", display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        <text x="12" y="15" fill="#ea580c" stroke="none" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Client Information</h3>
                      <p style={{ color: "#e2e8f0", fontSize: "12px", lineHeight: "1.4", margin: 0 }}>Please read the information carefully<br/>and confirm your details below to sign.</p>
                    </div>
                  </div>

                  <div style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                    {/* Edits Notification Banner */}
                    {!isExecuted && (
                      <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        <span style={{ fontSize: "11px", color: "#475569", lineHeight: "1.4", fontWeight: 500 }}>
                          Need to request edits or adjust details? Click the **Contact Support** button in the header or message us at **+1 (912) 820-5916** to update this agreement.
                        </span>
                      </div>
                    )}
                    
                    {/* Client Details Section */}
                    <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                      
                      {/* Full Name */}
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Full Name</label>
                        {isExecuted ? (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{contract.clientName || "—"}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter full name"
                            value={signerName}
                            onChange={(e) => setSignerName(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                          />
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Email Address</label>
                        {isExecuted ? (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{contract.clientEmail || "—"}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        ) : (
                          <input
                            type="email"
                            placeholder="Enter email address"
                            value={signerEmail}
                            onChange={(e) => setSignerEmail(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                          />
                        )}
                      </div>

                      {/* Company / Brand Name */}
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Company / Brand Name</label>
                        {isExecuted ? (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{contract.companyName || "—"}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter company/brand name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                          />
                        )}
                      </div>

                      {/* Location */}
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Location</label>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <img src="https://flagcdn.com/w20/us.png" alt="USA" style={{ width: "16px", height: "12px", objectFit: "cover", borderRadius: "2px" }} />
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{contract.location || "USA"}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr style={{ borderTop: "1px solid #f1f5f9", borderBottom: "none", margin: "0 0 24px 0" }} />

                    {/* Electronic Signature Section */}
                    <div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ position: "relative" }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                          <div style={{ position: "absolute", bottom: "-3px", left: "2px", right: "2px", height: "2px", background: "#ea580c" }}></div>
                        </div>
                        <h4 style={{ color: "#0f172a", fontSize: "14px", fontWeight: 800, margin: 0 }}>Electronic Signature</h4>
                      </div>

                       {isExecuted ? (
                        /* Read-only Signed Stamp */
                        <div style={{ marginBottom: "16px" }}>
                          <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", padding: "24px", position: "relative", overflow: "hidden", marginBottom: "8px" }}>
                            {/* Subtle corner accent */}
                            <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(135deg, transparent 50%, rgba(234,88,12,0.06) 50%)", borderRadius: "0 12px 0 0" }}></div>
                            
                            {contract.signature?.method === "type" ? (
                              <>
                                {/* Digital signature name */}
                                <div style={{ textAlign: "center", padding: "16px 0" }}>
                                  <div style={{ fontSize: "32px", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, color: "#0f172a", letterSpacing: "1px" }}>{contract.signature.signatureValue}</div>
                                  <div style={{ width: "180px", height: "3px", background: "linear-gradient(90deg, transparent, #ea580c, transparent)", margin: "10px auto 0", borderRadius: "2px" }}></div>
                                </div>
                                {/* Digital verification badge */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "1.5px" }}>Digitally Signed</span>
                                </div>
                              </>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
                                <img src={contract.signature?.signatureValue} alt="Client Signature" style={{ maxHeight: "110px", maxWidth: "90%", objectFit: "contain" }} />
                              </div>
                            )}
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f0fdf4", padding: "12px", borderRadius: "8px", color: "#16a34a", marginBottom: "12px" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                            <span style={{ fontSize: "11px", fontWeight: 500, lineHeight: "1.4" }}>Your signature is secure and<br/>legally binding.</span>
                          </div>

                          <button 
                            type="button"
                            onClick={handleDownloadPDF}
                            style={{ 
                              width: "100%", 
                              background: "linear-gradient(135deg, #10b981, #059669)", 
                              color: "#fff", 
                              border: "none", 
                              borderRadius: "8px", 
                              padding: "12px", 
                              fontSize: "14px", 
                              fontWeight: 800, 
                              cursor: "pointer", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center", 
                              gap: "8px",
                              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                              transition: "all 0.2s"
                            }}
                          >
                            <Download size={16}/>
                            Download Signed Copy (PDF)
                          </button>
                        </div>
                      ) : (
                        /* Interactive Signing Block */
                        <div style={{ marginBottom: "16px" }}>
                          {/* Tabs */}
                          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                            {[
                              { id: "type", label: "Type", icon: Type },
                              { id: "draw", label: "Draw", icon: PenTool }
                            ].map(tab => {
                              const Icon = tab.icon;
                              const active = signatureType === tab.id;
                              return (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setSignatureType(tab.id)}
                                  style={{
                                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                                    padding: "8px 0", border: active ? "none" : "1px solid #e2e8f0", borderRadius: "8px",
                                    fontSize: "12px", fontWeight: 700, cursor: "pointer", outline: "none", transition: "all 0.15s",
                                    background: active ? "#f97316" : "#fff",
                                    color: active ? "#fff" : "#64748b"
                                  }}
                                >
                                  <Icon size={12} /> {tab.label}
                                </button>
                              );
                            })}
                          </div>

                          {/* Workspace */}
                          <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", background: "#f8fafc", minHeight: "140px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                            {signatureType === "draw" && (
                              <div style={{ width: "100%" }}>
                                {!drawnSignatureData ? (
                                  <div 
                                    onClick={() => setIsDrawModalOpen(true)} 
                                    style={{ 
                                      width: "100%", 
                                      border: "2px dashed #cbd5e1", 
                                      borderRadius: "8px", 
                                      height: "100px", 
                                      display: "flex", 
                                      flexDirection: "column", 
                                      alignItems: "center", 
                                      justifyContent: "center", 
                                      cursor: "pointer", 
                                      background: "#fff",
                                      transition: "all 0.2s"
                                    }}
                                  >
                                    <PenTool size={20} style={{ color: "#64748b", marginBottom: "4px" }} />
                                    <div style={{ fontSize: "11px", color: "#475569", fontWeight: 600 }}>Click to Draw Signature</div>
                                  </div>
                                ) : (
                                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                    <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", height: "100px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "100%" }}>
                                      <img src={drawnSignatureData} alt="Drawn Signature" style={{ maxHeight: "80px", maxWidth: "90%", objectFit: "contain" }} />
                                      <button 
                                        onClick={() => setDrawnSignatureData(null)} 
                                        style={{ position: "absolute", top: "4px", right: "4px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "10px" }}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setIsDrawModalOpen(true)}
                                      style={{ marginTop: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, color: "#f97316", display: "flex", alignItems: "center", gap: "4px" }}
                                    >
                                      <PenTool size={11} /> Redraw Signature
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {signatureType === "type" && (
                              <div style={{ width: "100%" }}>
                                <input
                                  type="text"
                                  placeholder="Type your name here..."
                                  value={typedSignature}
                                  onChange={(e) => setTypedSignature(e.target.value)}
                                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", outline: "none", color: "#1e293b", boxSizing: "border-box", background: "#fff" }}
                                />
                                {typedSignature && (
                                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", padding: "16px", position: "relative", overflow: "hidden", marginTop: "10px" }}>
                                    <div style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", background: "linear-gradient(135deg, transparent 50%, rgba(234,88,12,0.06) 50%)", borderRadius: "0 12px 0 0" }}></div>
                                    <div style={{ textAlign: "center", padding: "8px 0" }}>
                                      <div style={{ fontSize: "28px", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, color: "#0f172a", letterSpacing: "1px" }}>{typedSignature}</div>
                                      <div style={{ width: "140px", height: "3px", background: "linear-gradient(90deg, transparent, #ea580c, transparent)", margin: "8px auto 0", borderRadius: "2px" }}></div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginTop: "8px" }}>
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "1.5px" }}>Preview</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Consent checkbox */}
                          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "20px" }}>
                            <input
                              type="checkbox"
                              id="consent-check"
                              checked={consentChecked}
                              onChange={(e) => setConsentChecked(e.target.checked)}
                              style={{ marginTop: "3px", cursor: "pointer" }}
                            />
                            <label htmlFor="consent-check" style={{ fontSize: "11px", color: "#475569", lineHeight: "1.5", cursor: "pointer", userSelect: "none" }}>
                              I consent to sign this agreement electronically and agree to be bound by its terms.
                            </label>
                          </div>

                          {/* Sign Button */}
                          <button
                            onClick={handleSignContract}
                            disabled={isSigning || !consentChecked}
                            style={{
                              width: "100%", 
                              padding: "12px 0", 
                              background: (isSigning || !consentChecked) ? "#e2e8f0" : "#f97316", 
                              border: "none", 
                              color: (isSigning || !consentChecked) ? "#94a3b8" : "#fff",
                              borderRadius: "8px", 
                              cursor: (isSigning || !consentChecked) ? "not-allowed" : "pointer", 
                              fontSize: "13px", 
                              fontWeight: 700,
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center", 
                              gap: "8px", 
                              transition: "all 0.2s"
                            }}
                          >
                            {isSigning ? (
                              <>
                                <Loader className="animate-spin" size={16} /> Saving Signature...
                              </>
                            ) : (
                              <>
                                <PenTool size={16} /> Sign & Complete Contract
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Agency Signature */}
                      <div style={{ marginTop: "32px" }}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                          <div style={{ position: "relative" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                            <div style={{ position: "absolute", bottom: "-3px", left: "2px", right: "2px", height: "2px", background: "#ea580c" }}></div>
                          </div>
                          <h4 style={{ color: "#0f172a", fontSize: "14px", fontWeight: 800, margin: 0 }}>Agency Digital Signature</h4>
                        </div>

                        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", padding: "24px", position: "relative", overflow: "hidden" }}>
                          {/* Subtle corner accent */}
                          <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(135deg, transparent 50%, rgba(234,88,12,0.06) 50%)", borderRadius: "0 12px 0 0" }}></div>
                          
                          {/* Digital signature name */}
                          <div style={{ textAlign: "center", padding: "16px 0" }}>
                            <div style={{ fontSize: "32px", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, color: "#0f172a", letterSpacing: "1px" }}>Ali Haider</div>
                            <div style={{ width: "180px", height: "3px", background: "linear-gradient(90deg, transparent, #ea580c, transparent)", margin: "10px auto 0", borderRadius: "2px" }}></div>
                          </div>

                          {/* Digital verification badge */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "1.5px" }}>Digitally Signed</span>
                          </div>
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Ali Haider</div>
                            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Chief Executive Officer, Grow Orbit</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#16a34a" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span style={{ fontSize: "11px", fontWeight: 600 }}>Pre-signed</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Horizontal Summary Bar */}
              <div style={{ marginTop: "48px", background: "#0f172a", borderRadius: "16px", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Inter', sans-serif" }}>
                
                {/* Item 1: Agreement Date */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <div>
                    <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Agreement Date</div>
                    <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{formatDateDisplay(contract.contractDate)}</div>
                  </div>
                </div>

                <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}></div>

                {/* Item 2: Initial Term */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <div>
                    <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Initial Term</div>
                    <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{contract.termLength || "—"}</div>
                  </div>
                </div>

                <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}></div>

                {/* Item 3: Monthly Investment */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  <div>
                    <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Monthly Management Fee</div>
                    <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>
                      {contract.monthlyRetainer ? (() => {
                        const clean = String(contract.monthlyRetainer).trim().replace(/[\$,]/g, "");
                        const num = Number(clean);
                        return (!isNaN(num) && clean !== "") ? `$${num.toLocaleString()} USD` : contract.monthlyRetainer;
                      })() : "—"}
                    </div>
                  </div>
                </div>

                <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}></div>

                {/* Item 4: Auto Renewal */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  <div>
                    <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Auto Renewal</div>
                    <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{contract.autoRenewal || "—"}</div>
                  </div>
                </div>

              </div>

              {/* Footer Disclaimer */}
              <div style={{ marginTop: "32px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#64748b", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                  This is a legally binding agreement. All signatures are secure and verifiable.
                </div>
                <div style={{ color: "#64748b", fontSize: "13px" }}>
                  Powered by <span style={{ color: "#f97316", fontWeight: 600 }}>Grow Orbit</span> Secure Contracts
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      </div>

      {/* ── Void Reason Modal ── */}
      {showVoidModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99 }}>
          <div style={{ background: "#121212", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", width: "420px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#f1f5f9" }}>Void Contract</h3>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
              Voiding a contract is a permanent, non-reversible action. This will cancel all digital signature workflows and void the agreement.
            </p>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "6px", textTransform: "uppercase" }}>Reason for Voiding</label>
              <textarea 
                value={voidReason} 
                onChange={(e) => setVoidReason(e.target.value)} 
                placeholder="e.g. Terms need renegotiation, client requested changes" 
                style={{ width: "100%", height: "80px", padding: "10px", borderRadius: "8px", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", outline: "none", resize: "none", fontSize: "12px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => { setShowVoidModal(false); setVoidReason(""); }} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>
                Cancel
              </button>
              <button onClick={handleVoidContract} disabled={voiding} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#ef4444", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>
                {voiding ? "Voiding..." : "Void Agreement"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DRAWING CANVAS MODAL ── */}
      {isDrawModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(9, 13, 22, 0.8)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "32px",
            width: "640px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            fontFamily: "'Inter', sans-serif"
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>Draw Your Signature</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Use your mouse, trackpad, or touch screen to draw inside the box below.</p>
              </div>
              <button 
                onClick={() => setIsDrawModalOpen(false)} 
                style={{ background: "#f1f5f9", border: "none", color: "#64748b", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
              >
                ✕
              </button>
            </div>

            {/* Canvas Container */}
            <div style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc", overflow: "hidden", cursor: "crosshair" }}>
              <canvas
                ref={modalCanvasRef}
                width={576}
                height={220}
                onMouseDown={startModalDrawing}
                onMouseMove={drawModal}
                onMouseUp={stopModalDrawing}
                onMouseLeave={stopModalDrawing}
                onTouchStart={startModalDrawing}
                onTouchMove={drawModal}
                onTouchEnd={stopModalDrawing}
                style={{ display: "block", background: "#fff", width: "100%", height: "220px" }}
              />
            </div>

            {/* Footer Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
              <button
                type="button"
                onClick={clearModalCanvas}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, color: "#ef4444", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <RefreshCw size={14} /> Clear Drawing
              </button>
              
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsDrawModalOpen(false)}
                  style={{ padding: "10px 20px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#fff", color: "#475569", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveModalSignature}
                  style={{ padding: "10px 24px", border: "none", borderRadius: "8px", background: "#f97316", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                >
                  Save Signature
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        /* Responsive Header Bar Styles */
        @media (max-width: 768px) {
          .contract-header-bar {
            flex-wrap: wrap !important;
            gap: 12px !important;
            padding: 10px 14px !important;
          }
          .contract-header-actions {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 8px !important;
          }
          .zoom-controls-wrapper {
            margin-right: 0 !important;
            flex-shrink: 0 !important;
          }
          .download-pdf-btn, .contact-support-btn {
            flex: 1 !important;
            justify-content: center !important;
            font-size: 10px !important;
            padding: 6px 10px !important;
            white-space: nowrap !important;
          }
          .download-pdf-text-desktop {
            display: none !important;
          }
          .download-pdf-text-mobile {
            display: inline !important;
          }
          .contact-support-text-desktop {
            display: none !important;
          }
          .contact-support-text-mobile {
            display: inline !important;
          }
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0 !important;
          }
          
          body, html {
            background: #090d16 !important;
            color: #000000 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            position: relative !important;
          }
          
          header, nav, aside, button, .no-print,
          div[style*="height: 69px"], 
          div[style*="width: 380px"] {
            display: none !important;
          }

          div[style*="calc(100vh - 69px)"] {
            display: block !important;
            height: auto !important;
            overflow: visible !important;
          }

          div[style*="flex: 1"][style*="overflow: auto"] {
            padding: 0 !important;
            background: #090d16 !important;
            display: block !important;
            overflow: visible !important;
          }

          .contract-scaled-wrapper {
            width: 1440px !important;
            height: 2100px !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            transform: scale(0.55) !important;
            transform-origin: top left !important;
            display: block !important;
          }

          .contract-paper-sheet {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 1440px !important;
            height: 2100px !important;
            padding: 80px !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
            display: block !important;
            transform: none !important;
          }

          /* Ensure all grid columns render in their exact desktop positions */
          .contract-flex-row {
            display: grid !important;
            grid-template-columns: 820px 420px !important;
            gap: 40px !important;
            width: 100% !important;
          }

          .contract-left-col {
            border: 1.5px solid #e2e8f0 !important;
            border-radius: 16px !important;
            padding: 40px !important;
            min-height: 1000px !important;
            background: #fff !important;
          }

          .contract-right-col {
            border: 1px solid #e2e8f0 !important;
            border-radius: 16px !important;
            min-height: 1000px !important;
            background: #fff !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      ` }} />

    </div>
  );
}
