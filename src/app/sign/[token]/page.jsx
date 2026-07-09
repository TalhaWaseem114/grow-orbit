"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FileText, CheckCircle, Download, Check, AlertCircle, Clock,
  PenTool, Type, Upload, Loader
} from "lucide-react";

export default function PublicSigningPage() {
  const params = useParams();
  const token = params?.token;
  const router = useRouter();

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);

  // Signing Flow States
  const [consentChecked, setConsentChecked] = useState(false);
  const [signMethod, setSignMethod] = useState("draw"); // "draw" | "type" | "upload"
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [typedName, setTypedName] = useState("");
  const [uploadedBase64, setUploadedBase64] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);
  const [finalPdfUrl, setFinalPdfUrl] = useState("");

  // Drawing Canvas Refs
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Reading Analytics
  const viewStartTimeRef = useRef(Date.now());
  const heartbeatIntervalRef = useRef(null);

  // Load contract details
  useEffect(() => {
    if (!token) return;
    loadContract();

    // Start analytics heartbeat
    heartbeatIntervalRef.current = setInterval(async () => {
      try {
        const now = Date.now();
        const durationMs = now - viewStartTimeRef.current;
        viewStartTimeRef.current = now; // reset interval anchor

        await fetch(`/api/public/contracts/${token}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ durationMs })
        });
      } catch (err) {
        console.warn("Heartbeat failed", err);
      }
    }, 10000); // Send heartbeat every 10 seconds

    return () => {
      if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
    };
  }, [token]);

  const loadContract = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/contracts/${token}`);
      const data = await res.json();
      if (data.success) {
        setContract(data.contract);
        setSignerName(data.contract.clientName || "");
        setSignerEmail(data.contract.clientEmail || "");
      } else {
        setError(data.error || "Failed to load contract");
        if (data.expired) setExpired(true);
      }
    } catch (err) {
      setError("Connection error: Unable to load agreement.");
    } finally {
      setLoading(false);
    }
  };

  // Log e-sign consent
  const handleConsentChange = async (e) => {
    const checked = e.target.checked;
    setConsentChecked(checked);
    if (checked) {
      try {
        await fetch(`/api/public/contracts/${token}/consent`, { method: "POST" });
      } catch (err) {
        console.warn("Failed to log consent tick", err);
      }
    }
  };

  // Canvas drawing handlers
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Support touch events
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;

    const pos = getMousePos(e);
    lastPosRef.current = pos;
    isDrawingRef.current = true;
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getMousePos(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPosRef.current = pos;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Upload handler
  const handleUploadFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Confirm and Sign submission
  const handleSubmitSignature = async () => {
    if (!signerName.trim() || !signerEmail.trim()) {
      alert("Signer name and email are required");
      return;
    }
    if (!consentChecked) {
      alert("You must consent to conduct transaction electronically before signing");
      return;
    }

    let signatureValue = "";
    if (signMethod === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Check if canvas is empty (basic pixels test)
      const blank = document.createElement("canvas");
      blank.width = canvas.width;
      blank.height = canvas.height;
      if (canvas.toDataURL() === blank.toDataURL()) {
        alert("Please draw your signature in the signature area");
        return;
      }
      signatureValue = canvas.toDataURL("image/png");
    } else if (signMethod === "type") {
      if (!typedName.trim()) {
        alert("Please enter your name for the cursive signature");
        return;
      }
      signatureValue = typedName.trim();
    } else if (signMethod === "upload") {
      if (!uploadedBase64) {
        alert("Please select and upload a signature image file");
        return;
      }
      signatureValue = uploadedBase64;
    }

    setIsSigning(true);
    try {
      const res = await fetch(`/api/public/contracts/${token}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signerName,
          signerEmail,
          method: signMethod,
          signatureValue
        })
      });

      const data = await res.json();
      if (data.success) {
        setFinalPdfUrl(data.finalPdfUrl);
        setSignedSuccess(true);
        if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
      } else {
        alert("Failed to submit signature: " + data.error);
      }
    } catch (err) {
      alert("Failed to sign: " + err.message);
    } finally {
      setIsSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans text-zinc-600">
        <Loader size={36} className="animate-spin text-orange-500 mb-4" />
        <span className="text-sm font-bold uppercase tracking-wider">Securing connection...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans p-6 text-zinc-600">
        <div className="bg-white border border-zinc-200 rounded-xl p-8 max-w-[480px] shadow-lg flex flex-col items-center text-center">
          {expired ? (
            <>
              <Clock size={48} className="text-red-500 mb-4" />
              <h2 className="text-lg font-extrabold text-zinc-800 uppercase tracking-wide">Agreement Expired</h2>
              <p className="text-xs text-zinc-500 mt-2 mb-6 leading-relaxed">
                This service agreement has reached its expiration date and is no longer available for signatures. Please contact the administrator at Grow Orbit to receive a revised proposal.
              </p>
            </>
          ) : (
            <>
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <h2 className="text-lg font-extrabold text-zinc-800 uppercase tracking-wide">Document Error</h2>
              <p className="text-xs text-zinc-500 mt-2 mb-6 leading-relaxed">
                {error}
              </p>
            </>
          )}
          <div className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">GROW ORBIT CLM</div>
        </div>
      </div>
    );
  }

  // SIGNING COMPLETED SUCCESS PAGE
  if (signedSuccess) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-6 text-zinc-600">
        {/* Cursive Google Font for Typed Signatures */}
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
        
        <div className="bg-white border border-zinc-200 rounded-2xl p-10 max-w-[560px] w-full shadow-xl flex flex-col items-center text-center">
          <CheckCircle size={56} className="text-green-500 mb-4 animate-bounce" />
          
          <h2 className="text-xl font-black text-zinc-800 tracking-tight">Agreement Successfully Executed</h2>
          <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
            Your e-signature has been securely stamped, and the final document is now legally locked and archived.
          </p>

          {/* Receipt Info Box */}
          <div className="w-full bg-[#f8fafc] border border-zinc-200/50 rounded-xl p-4 my-6 text-left flex flex-col gap-2.5 text-xs text-zinc-700">
            <div className="flex justify-between">
              <span className="text-zinc-400 font-semibold">Contract Number</span>
              <span className="font-extrabold text-zinc-800">{contract.contractNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-semibold">Executed By</span>
              <span className="font-bold text-zinc-800">{signerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-semibold">Date Signed</span>
              <span className="font-bold text-zinc-800">{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200/60 pt-2.5">
              <span className="text-zinc-400 font-semibold">Security Hash</span>
              <span className="font-mono text-[9px] text-zinc-500 truncate max-w-[200px]" title={token}>
                {token}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a 
              href={finalPdfUrl}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md text-decoration-none"
            >
              <Download size={14} /> Download Executed PDF
            </a>
            <button 
              onClick={() => window.close()}
              className="flex-1 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3 rounded-xl text-xs font-bold transition-all"
            >
              Close Window
            </button>
          </div>

          <div className="mt-8 text-[9px] font-black tracking-widest text-zinc-400 uppercase">
            GROW ORBIT E-SIGN SYSTEM
          </div>
        </div>
      </div>
    );
  }

  const isExecuted = contract.status === "signed" || contract.status === "completed";

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center p-6 sm:p-12 font-sans text-zinc-700">
      {/* Google Font for Cursive signature styles */}
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div className="w-full max-w-[850px] flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2">
          <FileText className="text-orange-500" size={20} />
          <span className="font-black text-sm tracking-widest text-zinc-800">GROW ORBIT CLM</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-600 border border-orange-200/50 px-2.5 py-0.5 rounded-full">
          {isExecuted ? "Executed" : "Awaiting Signature"}
        </span>
      </div>

      {/* Document Workspace */}
      <div className="w-full max-w-[850px] bg-white border border-zinc-200 rounded-2xl shadow-xl p-8 sm:p-16 mb-8 relative font-serif" style={{ color: "#334155" }}>
        
        {/* Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.025]">
          <span className="text-8xl sm:text-9xl font-black tracking-widest rotate-[-45deg] uppercase">
            {isExecuted ? "SIGNED" : "AWAITING SIGNATURE"}
          </span>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          
          {/* Top Contract Meta */}
          <div className="flex justify-between items-center border-b border-zinc-200 pb-6 mb-8 font-sans text-[11px] text-zinc-400">
            <span className="font-extrabold tracking-widest text-zinc-800">GROW ORBIT</span>
            <span className="font-mono text-zinc-500">{contract.contractNumber}</span>
          </div>

          {/* Rendered HTML Contract Body */}
          <div className="flex-1 text-[13px] leading-relaxed text-zinc-800">
            <div dangerouslySetInnerHTML={{ __html: contract.renderedHtml }} />
          </div>

          {/* Signatures Panel */}
          <div className="flex justify-between items-center border-t border-zinc-200 pt-8 mt-12 font-sans text-[11px] text-zinc-500">
            <div className="w-[45%]">
              <div className="text-[9px] text-zinc-400 uppercase tracking-widest mb-1">Grow Orbit Representative</div>
              <div className="border-b border-zinc-300 py-3 mb-1 font-serif italic text-lg text-zinc-800">Grow Orbit Team</div>
              <div className="text-[9px] text-zinc-400">Date: {new Date(contract.contractDate).toLocaleDateString()}</div>
            </div>

            <div className="w-[45%]">
              <div className="text-[9px] text-zinc-400 uppercase tracking-widest mb-1">Client Signatory</div>
              <div className="border-b border-zinc-300 py-3 mb-1 min-h-[40px] flex items-center">
                {isExecuted && contract.signature ? (
                  contract.signature.method === "typed" ? (
                    <span className="font-serif italic text-lg text-zinc-800">{contract.signature.signatureValue}</span>
                  ) : (
                    <img src={contract.signature.signatureValue} alt="client signature" className="max-h-[35px] max-w-full object-contain" />
                  )
                ) : (
                  <span className="text-zinc-300 italic text-[10px]">Awaiting signature...</span>
                )}
              </div>
              <div className="text-[9px] text-zinc-400">
                Date: {isExecuted ? new Date(contract.signature.timestamp).toLocaleDateString() : "Pending"}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Signing Actions Control Box (hidden if already signed) */}
      {!isExecuted && (
        <div className="w-full max-w-[850px] bg-white border border-zinc-200 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-6">
          
          <div className="border-b border-zinc-100 pb-4">
            <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">Execute Digital Agreement</h3>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              Verify your information, accept the e-signature terms, and choose your preferred signing method.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Signer Info inputs */}
            <div>
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Your Full Name</label>
              <input 
                type="text"
                placeholder="e.g. John Doe"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-zinc-400 transition-all text-zinc-800"
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Your Email Address</label>
              <input 
                type="email"
                placeholder="e.g. john@company.com"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-zinc-400 transition-all text-zinc-800"
              />
            </div>
          </div>

          {/* Signature Method Selector */}
          <div>
            <div className="flex gap-2 mb-3">
              {[
                { id: "draw", label: "Draw Signature", icon: PenTool },
                { id: "type", label: "Type Name", icon: Type },
                { id: "upload", label: "Upload Image", icon: Upload }
              ].map(method => {
                const Icon = method.icon;
                const active = signMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSignMethod(method.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all outline-none ${active ? "bg-zinc-900 border-zinc-900 text-white" : "bg-transparent border-zinc-200 text-zinc-500 hover:bg-zinc-50"}`}
                  >
                    <Icon size={12} /> {method.label}
                  </button>
                );
              })}
            </div>

            {/* Signature Input Area */}
            <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 min-h-[160px] flex items-center justify-center relative overflow-hidden">
              
              {signMethod === "draw" && (
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="relative border border-zinc-200/80 bg-white rounded-lg shadow-inner overflow-hidden cursor-crosshair">
                    <canvas
                      ref={canvasRef}
                      width={480}
                      height={120}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>
                  <button 
                    onClick={clearCanvas} 
                    className="text-[10px] font-bold text-zinc-400 hover:text-zinc-600 transition-all outline-none"
                  >
                    Clear Drawing
                  </button>
                </div>
              )}

              {signMethod === "type" && (
                <div className="flex flex-col gap-3 w-full max-w-[480px]">
                  <input
                    type="text"
                    placeholder="Type your signature here..."
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-xs outline-none bg-white text-zinc-800"
                  />
                  {typedName && (
                    <div className="h-16 flex items-center justify-center bg-white border border-zinc-200 rounded-lg select-none px-4">
                      <span className="text-3xl text-zinc-800" style={{ fontFamily: "'Caveat', cursive" }}>
                        {typedName}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {signMethod === "upload" && (
                <div className="flex flex-col items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFile}
                    className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 outline-none"
                  />
                  {uploadedBase64 && (
                    <div className="h-20 bg-white border border-zinc-200 rounded-lg p-2 flex items-center justify-center max-w-[200px]">
                      <img src={uploadedBase64} alt="uploaded signature" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Consent E-sign Checkbox */}
          <div className="flex gap-2.5 items-start bg-orange-50 border border-orange-200/50 rounded-xl p-4">
            <input 
              type="checkbox"
              id="consent-check"
              checked={consentChecked}
              onChange={handleConsentChange}
              className="mt-0.5 border-zinc-300 rounded cursor-pointer accent-orange-500 w-4 h-4"
            />
            <label htmlFor="consent-check" className="text-[11px] text-orange-800 leading-relaxed cursor-pointer font-medium select-none">
              By signing below, I agree to the terms of this agreement and consent to conducting this transaction electronically. I understand that my digital signature carries the same legal weight, validity, and enforceability as a handwritten signature, and that I may request a paper copy at any time.
            </label>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end gap-3 border-t border-zinc-100 pt-5 mt-2">
            <button
              onClick={loadContract}
              className="px-5 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all"
            >
              Refresh View
            </button>
            <button
              onClick={handleSubmitSignature}
              disabled={isSigning || !consentChecked || !signerName.trim() || !signerEmail.trim()}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-200 disabled:text-zinc-400 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md outline-none"
            >
              {isSigning ? "Processing..." : "Confirm & Sign"}
            </button>
          </div>

        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
        GROW ORBIT CLM • LEGALLY SECURED
      </div>
    </div>
  );
}
