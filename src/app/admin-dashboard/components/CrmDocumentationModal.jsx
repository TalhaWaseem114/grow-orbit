import React from "react";
import { BookOpen, X, Info, Zap, Layout, Calendar, AlertCircle, TrendingUp, Users } from "lucide-react";

export default function CrmDocumentationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.85)", zIndex: 99999, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(5px)"
    }}>
      <div style={{
        width: "100%", maxWidth: 800, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)", maxHeight: "90vh"
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(0,0,0,0) 100%)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(249,115,22,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f97316" }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "0 0 4px 0", letterSpacing: "0.02em" }}>Grow Orbit CRM Manual</h2>
              <span style={{ fontSize: 12, color: "#a3a3a3", fontWeight: 600 }}>Complete guide on operating the dashboard and managing pipelines.</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "32px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 32 }}>
          
          {/* Section 1 */}
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Zap size={16} /> 1. How Leads are Captured
            </h3>
            <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 12px 0" }}>
              Whenever a visitor submits a contact form or requests a service across the website, their details are instantly added to the CRM database under the <strong>Lead Pipeline</strong>. 
            </p>
            <ul style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
              <li style={{ marginBottom: 6 }}><strong>Instant Alerts:</strong> The system immediately dispatches a Discord/Slack webhook notification to your team.</li>
              <li style={{ marginBottom: 6 }}><strong>Calendly Auto-Sync:</strong> If the visitor books a meeting on Calendly right after submitting the form, the system automatically detects this and updates their lead status to <strong style={{ color: "#ef4444" }}>Hot (Booked)</strong>.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Layout size={16} /> 2. Pipeline View Modes
            </h3>
            <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 12px 0" }}>
              The Lead Pipeline offers four powerful ways to view and manage your leads. You can toggle between them using the icons at the top right of the pipeline:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <strong style={{ color: "#fff", display: "block", marginBottom: 4, fontSize: 13 }}>Kanban Board</strong>
                <span style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 1.5 }}>Drag and drop leads between stages (New, Contacted, Qualified, etc.) to visually track progress.</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <strong style={{ color: "#fff", display: "block", marginBottom: 4, fontSize: 13 }}>Table View</strong>
                <span style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 1.5 }}>A dense, spreadsheet-style layout. Click <strong>VIEW</strong> on any row to expand lead details inline without leaving the table.</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <strong style={{ color: "#fff", display: "block", marginBottom: 4, fontSize: 13 }}>Cards View</strong>
                <span style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 1.5 }}>A mobile-friendly vertical list format focusing on quick contact links.</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <strong style={{ color: "#fff", display: "block", marginBottom: 4, fontSize: 13 }}>Calendar View</strong>
                <span style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 1.5 }}>A month-by-month grid. Click on any day to see exactly who submitted forms or booked meetings on that date.</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Info size={16} /> 3. Managing a Lead
            </h3>
            <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 12px 0" }}>
              Expanding a lead opens the <strong>Lead Detail Panel</strong>, your primary workspace for that account. Here's what you can do:
            </p>
            <ul style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
              <li style={{ marginBottom: 6 }}><strong>Assign Owners:</strong> Delegate the lead to specific team members.</li>
              <li style={{ marginBottom: 6 }}><strong>Quick Outreach:</strong> Click the Email or WhatsApp icons to immediately contact the lead. The WhatsApp button automatically pre-fills a personalized greeting!</li>
              <li style={{ marginBottom: 6 }}><strong>Timeline Activity:</strong> Log notes after calls. The system also automatically logs major changes (like stage moves or meeting bookings) to this timeline.</li>
              <li style={{ marginBottom: 6 }}><strong>Follow-ups:</strong> Set a "Next Follow-Up" date. If the date is missed, the system will flag the lead in Red to alert you.</li>
              <li style={{ marginBottom: 6 }}><strong>Task Checklists:</strong> Add to-do items specific to that lead (e.g., "Send Audit PDF", "Review Amazon listing").</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <AlertCircle size={16} /> 4. Aging Indicators & Automatic Scoring
            </h3>
            <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 12px 0" }}>
              To ensure no leads slip through the cracks, the CRM calculates real-time aging risk flags:
            </p>
            <ul style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
              <li style={{ marginBottom: 6 }}><strong>48-Hour Decay:</strong> If a lead is older than 2 days, its age indicator turns red with a warning icon (⚠️).</li>
              <li style={{ marginBottom: 6 }}><strong>7-Day Ice Risk:</strong> If left untouched for 7 days, the lead receives a prominent cyan "COLD ❄️" flag.</li>
              <li style={{ marginBottom: 6 }}><strong>Automated Priority:</strong> Leads with higher reported revenue, ASINs provided, or meetings booked automatically get a boosted "High" priority.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={16} /> 5. Converting a Lead to a Client
            </h3>
            <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 12px 0" }}>
              Once you close a deal, move the lead to the <strong style={{ color: "#22c55e" }}>Won 🎉</strong> stage. This unlocks the "Convert to Active Client" widget. 
              Clicking this button transfers their data out of the sales pipeline and into your permanent Client Database.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Users size={16} /> 6. Managing Your Team & Content
            </h3>
            <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 12px 0" }}>
              Beyond leads, use the sidebar to access other modules:
            </p>
            <ul style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
              <li style={{ marginBottom: 6 }}><strong>User Directory & Agency Team:</strong> View all registered users and assign Admin privileges securely.</li>
              <li style={{ marginBottom: 6 }}><strong>Blog & Newsletter:</strong> Write SEO-optimized blog posts, publish them instantly, and use the Email Designer to blast campaigns to your newsletter subscribers.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
