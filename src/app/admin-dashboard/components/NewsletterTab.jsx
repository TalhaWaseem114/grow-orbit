"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Mail, Send, CheckSquare, Square, Plus, Image as ImageIcon, LayoutTemplate, UploadCloud } from "lucide-react";

export default function NewsletterTab({ isMobile, leads = [], users = [] }) {
  const [subject, setSubject] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  
  const [manualEmails, setManualEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Combine fetched leads and manual emails
  const allSubscribers = useMemo(() => {
    const list = [];
    const seen = new Set();
    
    // Gather all admin emails to exclude them
    const adminEmails = new Set(
      users.filter(u => u.role === "admin").map(u => u.email?.toLowerCase()).filter(Boolean)
    );

    // Process leads from CRM
    leads.forEach(lead => {
      if (lead.email && !seen.has(lead.email.toLowerCase()) && !adminEmails.has(lead.email.toLowerCase())) {
        list.push({ email: lead.email, source: "LANDING PAGE" });
        seen.add(lead.email.toLowerCase());
      }
    });

    // Add manual emails
    manualEmails.forEach(manual => {
      if (manual.email && !seen.has(manual.email.toLowerCase()) && !adminEmails.has(manual.email.toLowerCase())) {
        list.push({ email: manual.email, source: "MANUAL" });
        seen.add(manual.email.toLowerCase());
      }
    });

    return list;
  }, [leads, manualEmails, users]);

  // Initially select all subscribers
  useEffect(() => {
    const allEmails = new Set(allSubscribers.map(s => s.email));
    setSelectedEmails(allEmails);
  }, [allSubscribers.length]); // Only re-run when length changes so we don't wipe manual selections

  const handleToggleEmail = (email) => {
    const next = new Set(selectedEmails);
    if (next.has(email)) next.delete(email);
    else next.add(email);
    setSelectedEmails(next);
  };

  const handleToggleAll = () => {
    if (selectedEmails.size === allSubscribers.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(allSubscribers.map(s => s.email)));
    }
  };

  const handleAddManualEmail = (e) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes("@")) return;
    
    setManualEmails(prev => [...prev, { email: newEmail.trim().toLowerCase() }]);
    setSelectedEmails(prev => new Set(prev).add(newEmail.trim().toLowerCase()));
    setNewEmail("");
    setShowAddEmail(false);
  };

  const applyTemplate = (type) => {
    if (type === "welcome") {
      setSubject("Welcome to Grow Orbit! 🚀");
      setHeaderImage("/logo.png"); // using local logo as placeholder
      setHeadline("Let's Scale Your Amazon Brand");
      setBody("We received your request for a strategy call. Our team of Amazon experts is currently reviewing your details. \n\nIn the meantime, feel free to reply to this email with any immediate questions.");
    } else if (type === "update") {
      setSubject("Q4 Amazon Strategies are here!");
      setHeaderImage("");
      setHeadline("Prepare for Q4 2026");
      setBody("The holiday season is approaching fast. Check out our latest guide on optimizing your PPC campaigns and A+ content to maximize conversions.");
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (selectedEmails.size === 0 || !subject.trim() || !body.trim()) return;
    setSending(true);
    
    setTimeout(() => {
      alert(`Simulated sending to ${selectedEmails.size} recipients.\nBackend integration (NodeMailer/SendGrid) pending.`);
      setSending(false);
    }, 1500);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setHeaderImage(data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 60 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
          <Mail size={24} color="#f97316" /> Email Marketing
        </h1>
        <p style={{ fontSize: 13, color: "#a3a3a3", marginTop: 8 }}>Design rich HTML emails and send them directly to your CRM leads.</p>
      </div>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, alignItems: "stretch" }}>
        
        {/* LEFT COLUMN: BUILDER */}
        <div style={{ flex: "1 1 60%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? 20 : 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 800, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <LayoutTemplate size={14} /> Builder
          </h2>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#525252", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Quick Start Templates</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => applyTemplate("welcome")} style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#d4d4d4", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.target.style.background="rgba(255,255,255,0.08)"} onMouseLeave={e => e.target.style.background="rgba(255,255,255,0.03)"}>
                👋 Welcome Email
              </button>
              <button onClick={() => applyTemplate("update")} style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#d4d4d4", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.target.style.background="rgba(255,255,255,0.08)"} onMouseLeave={e => e.target.style.background="rgba(255,255,255,0.03)"}>
                📢 General Update
              </button>
            </div>
          </div>

          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Email Subject (Inbox)</label>
              <input 
                type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. You're Invited!" required
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none" }}
              />
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <ImageIcon size={12} /> Header Image URL
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input 
                  type="text" value={headerImage} onChange={e => setHeaderImage(e.target.value)} placeholder="/logo.png or https://..."
                  style={{ flex: 1, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none" }}
                />
                <label style={{ 
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "0 16px", 
                  borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", 
                  color: "#d4d4d4", fontSize: 12, fontWeight: 700, cursor: uploadingImage ? "not-allowed" : "pointer", transition: "all 0.2s" 
                }}>
                  <UploadCloud size={16} />
                  {uploadingImage ? "Uploading..." : "Upload"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={uploadingImage} />
                </label>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Headline</label>
              <input 
                type="text" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Main title inside email"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none" }}
              />
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Body Text</label>
              <textarea 
                value={body} onChange={e => setBody(e.target.value)} placeholder="Write the main content..." required rows={6}
                style={{ width: "100%", padding: "16px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <span style={{ fontSize: 12, color: "#a3a3a3" }}>To: <strong style={{ color: "#fff" }}>{selectedEmails.size}</strong> recipients</span>
              <button
                type="submit"
                disabled={sending || selectedEmails.size === 0 || !subject.trim() || !body.trim()}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, border: "none", 
                  cursor: (sending || selectedEmails.size === 0 || !subject.trim() || !body.trim()) ? "not-allowed" : "pointer",
                  fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.3s",
                  background: (sending || selectedEmails.size === 0 || !subject.trim() || !body.trim()) ? "rgba(255,255,255,0.05)" : "#f97316",
                  color: (sending || selectedEmails.size === 0 || !subject.trim() || !body.trim()) ? "#525252" : "#fff",
                }}
              >
                <Send size={15} /> {sending ? "Sending..." : "Send Email"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: RECIPIENT LIST */}
        <div style={{ flex: "1 1 40%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 11, fontWeight: 800, color: "#4ade80", letterSpacing: "0.2em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                <Mail size={14} /> List
              </h2>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", background: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: 100 }}>{allSubscribers.length} Total</span>
            </div>

            <button onClick={handleToggleAll} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: 0 }}>
              {selectedEmails.size === allSubscribers.length ? <CheckSquare size={14} color="#4ade80" /> : <Square size={14} />}
              {selectedEmails.size === allSubscribers.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 12, maxHeight: "400px" }}>
            {allSubscribers.length === 0 ? (
              <p style={{ fontSize: 12, color: "#525252", textAlign: "center", margin: "auto" }}>No subscribers found. Wait for leads or add manually.</p>
            ) : (
              allSubscribers.map(sub => {
                const isSelected = selectedEmails.has(sub.email);
                return (
                  <div key={sub.email} onClick={() => handleToggleEmail(sub.email)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: `1px solid ${isSelected ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.05)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ marginTop: 2 }}>{isSelected ? <CheckSquare size={16} color="#4ade80" /> : <Square size={16} color="#525252" />}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: isSelected ? "#fff" : "#a3a3a3" }}>{sub.email}</p>
                      <p style={{ fontSize: 9, fontWeight: 800, color: "#737373", letterSpacing: "0.15em", marginTop: 4, textTransform: "uppercase" }}>{sub.source}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ padding: 24, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {showAddEmail ? (
              <form onSubmit={handleAddManualEmail} style={{ display: "flex", gap: 8 }}>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="name@example.com" required autoFocus
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none" }} />
                <button type="submit" style={{ padding: "0 16px", borderRadius: 8, background: "#f97316", color: "#fff", border: "none", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>Add</button>
                <button type="button" onClick={() => setShowAddEmail(false)} style={{ padding: "0 12px", borderRadius: 8, background: "transparent", color: "#a3a3a3", border: "none", fontSize: 11, cursor: "pointer" }}>Cancel</button>
              </form>
            ) : (
              <button onClick={() => setShowAddEmail(true)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)", color: "#d4d4d4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.target.style.background="rgba(255,255,255,0.06)"} onMouseLeave={e => e.target.style.background="rgba(255,255,255,0.03)"}>
                <Plus size={14} /> Add Email
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: LIVE PREVIEW */}
      <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? 20 : 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", padding: "6px 16px", borderRadius: 100, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase" }}>Live Preview</span>
        </div>

        {/* Email Mockup Window */}
        <div style={{ width: "100%", maxWidth: "600px", background: "#ffffff", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
          {/* Email Header */}
          <div style={{ background: "#0f0f0f", padding: "40px 20px", textAlign: "center" }}>
            {headerImage ? (
              <img src={headerImage} alt="Header" style={{ maxHeight: 60, maxWidth: "100%", objectFit: "contain", margin: "0 auto" }} />
            ) : (
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>GROW ORBIT</h2>
            )}
          </div>

          {/* Email Body */}
          <div style={{ padding: "40px 32px" }}>
            {headline ? (
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 20, lineHeight: 1.2 }}>{headline}</h1>
            ) : (
              <div style={{ height: 28, width: "60%", background: "#f4f4f5", borderRadius: 4, marginBottom: 20 }} />
            )}

            {body ? (
              <div style={{ fontSize: 15, color: "#525252", lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 32 }}>{body}</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                <div style={{ height: 16, width: "100%", background: "#f4f4f5", borderRadius: 4 }} />
                <div style={{ height: 16, width: "90%", background: "#f4f4f5", borderRadius: 4 }} />
                <div style={{ height: 16, width: "95%", background: "#f4f4f5", borderRadius: 4 }} />
              </div>
            )}

            <button style={{ background: "#f97316", color: "#fff", padding: "14px 28px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 700, cursor: "default" }}>
              Book a Strategy Call
            </button>

            <hr style={{ borderTop: "1px solid #e5e5e5", borderBottom: "none", borderLeft: "none", borderRight: "none", margin: "40px 0 20px" }} />

            <div style={{ textAlign: "center", color: "#a3a3a3", fontSize: 11, lineHeight: 1.5 }}>
              <p style={{ fontWeight: 700, color: "#737373", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Grow Orbit Agency</p>
              <p>123 Commerce St, Suite 100, New York, NY</p>
              <p style={{ marginTop: 12, textDecoration: "underline" }}>Unsubscribe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
