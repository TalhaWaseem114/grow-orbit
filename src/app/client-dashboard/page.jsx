"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { 
  TrendingUp, BarChart3, Target, Calendar, User, Mail, Phone, LogOut, CheckCircle2, 
  Circle, Clock, FileText, Settings, HelpCircle, Layout, Sparkles
} from "lucide-react";

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  
  const [clientData, setClientData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsub();
  }, [router]);

  // Load client data & tasks
  useEffect(() => {
    if (authChecking || !user) return;

    const fetchClientInfo = async () => {
      setLoading(true);
      try {
        // Find client record by email address
        const clientsRef = collection(db, "clients");
        const q = query(clientsRef, where("email", "==", user.email));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const clientDoc = { id: snap.docs[0].id, ...snap.docs[0].data() };
          setClientData(clientDoc);

          // Subscribe to tasks belonging to their leadId
          if (clientDoc.leadId) {
            setTasksLoading(true);
            const tasksRef = collection(db, "tasks");
            const tQ = query(tasksRef, where("leadId", "==", clientDoc.leadId), orderBy("createdAt", "asc"));
            
            const unsubTasks = onSnapshot(tQ, (taskSnap) => {
              setTasks(taskSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
              setTasksLoading(false);
            }, (tErr) => {
              console.warn("Tasks subscription failed:", tErr);
              setTasksLoading(false);
            });
            
            return () => unsubTasks();
          }
        }
      } catch (err) {
        console.error("Failed to load client details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, [user, authChecking]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const fmtDate = (d) => {
    if (!d) return "—";
    if (d.toDate) return d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (authChecking) {
    return (
      <div className="h-screen flex flex-col items-center justify-center" style={{ background: "#060606" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: 16, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#525252" }}>Verifying Workspace Access</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060606", color: "#fff", fontFamily: "'Montserrat', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(249,115,22,0.4); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .dashboard-container { animation: fadeUp 0.4s ease; }
      `}</style>

      {/* Header bar */}
      <header style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(6,6,6,0.8)", backdropFilter: "blur(12px)", sticky: "top", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img src="/logo.png" alt="Logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>GROW ORBIT</div>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>Client Workspace</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 9, fontWeight: 900, color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "4px 8px" }}>
            Active Client Account
          </div>
          <button 
            onClick={handleLogout}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#a3a3a3", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(259,115,22,0.15)"; e.currentTarget.style.borderColor = "rgba(259,115,22,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
          >
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </header>

      {/* Loading Overlay */}
      {loading ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite" }} />
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#525252" }}>Loading project data…</p>
        </div>
      ) : !clientData ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(249,115,22,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Sparkles size={28} color="#f97316" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Workspace Pending Setup</h2>
          <p style={{ fontSize: 13, color: "#a3a3a3", maxWidth: 420, lineHeight: 1.6, margin: "0 auto 24px" }}>
            Your account is authenticated, but your customized client dashboard is currently being generated by the operations team. Please contact your Account Manager to activate.
          </p>
          <a href={`mailto:support@groworbit.com?subject=Workspace Setup Request: ${user.email}`} style={{ background: "#f97316", color: "#fff", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>
            ✉️ Contact Support
          </a>
        </div>
      ) : (
        <div className="dashboard-container" style={{ flex: 1, padding: "32px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1400, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          
          {/* Welcome Banner */}
          <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Welcome Back</div>
              <h1 style={{ fontSize: 24, fontWeight: 950, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
                {clientData.name}
              </h1>
              <p style={{ fontSize: 12, color: "#a3a3a3", marginTop: 4, marginBottom: 0 }}>
                Tracking account operations and deliverables for your store.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 16, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <Calendar size={16} color="#f97316" />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: "#525252", textTransform: "uppercase" }}>Agreement Date</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", marginTop: 2 }}>{fmtDate(clientData.startDate)}</div>
              </div>
            </div>
          </div>

          {/* KPI Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.08em" }}>Target ACoS</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                  <Target size={14} />
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>22.8%</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 900, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 6px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 2 }}>
                  <TrendingUp size={8} /> -1.6%
                </span>
                <span style={{ fontSize: 9, color: "#525252" }}>vs last week</span>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ad Attributed Sales</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f97316" }}>
                  <BarChart3 size={14} />
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>$18,450</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 900, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 6px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 2 }}>
                  <TrendingUp size={8} /> +8.4%
                </span>
                <span style={{ fontSize: 9, color: "#525252" }}>vs last week</span>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.08em" }}>PPC Spend Tracker</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a3a3a3" }}>
                  <TrendingUp size={14} />
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>$4,210</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: "#a3a3a3", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4 }}>
                  Spend Cap: $6,000
                </span>
                <span style={{ fontSize: 9, color: "#525252" }}>Monthly limit</span>
              </div>
            </div>

            <div style={{ background: "rgba(16,185,129,0.02)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 20, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em" }}>Monthly Retainer</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                  $
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981" }}>
                ${(clientData.monthlyRetainer || 0).toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 9, color: "#10b981", fontWeight: 700 }}>Active Tier Status</span>
              </div>
            </div>
          </div>

          {/* Grid Area */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            
            {/* Left Panel: Tasks / Deliverables Checklist */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 24, padding: "24px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.01em", color: "#fff", margin: 0 }}>Active Operations Deliverables</h2>
                  <p style={{ fontSize: 11, color: "#a3a3a3", marginTop: 4, marginBottom: 0 }}>Real-time updates on listing updates, PPC integrations, and design tasks.</p>
                </div>
                <div style={{ fontSize: 9, fontWeight: 850, color: "#f97316", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)", borderRadius: 8, padding: "4px 8px", textTransform: "uppercase" }}>
                  {tasks.filter(t => t.status === "completed").length}/{tasks.length} Done
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tasksLoading ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite" }} />
                  </div>
                ) : tasks.length === 0 ? (
                  <div style={{ padding: "40px 20px", textAlign: "center", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 16 }}>
                    <CheckCircle2 size={24} color="#525252" style={{ margin: "0 auto 12px" }} />
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#a3a3a3" }}>No operations tasks assigned</div>
                    <p style={{ fontSize: 10, color: "#525252", margin: "4px 0 0 0" }}>Task setup is currently processing.</p>
                  </div>
                ) : (
                  tasks.map(task => {
                    const isCompleted = task.status === "completed";
                    return (
                      <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 16, background: isCompleted ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 16, padding: "16px 20px", transition: "all 0.2s" }}>
                        <div style={{ flexShrink: 0 }}>
                          {isCompleted ? (
                            <CheckCircle2 size={18} color="#10b981" />
                          ) : (
                            <Clock size={18} color="#f97316" />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: isCompleted ? "#525252" : "#fff", textDecoration: isCompleted ? "line-through" : "none" }}>
                            {task.title}
                          </span>
                          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 4 }}>
                            <span style={{ fontSize: 9, fontWeight: 800, color: isCompleted ? "#10b981" : "#f97316", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              {isCompleted ? "Completed" : "In Progress"}
                            </span>
                            {task.completedAt && (
                              <span style={{ fontSize: 9, color: "#525252" }}>
                                finished {fmtDate(task.completedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Panel: Manager Info & Project Brief */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Account Manager Widget */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 24, padding: "24px 32px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Your Account Manager</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))", border: "1px solid rgba(249,115,22,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 950, color: "#f97316" }}>
                    {clientData.accountManager?.[0] || "M"}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 850, color: "#fff" }}>{clientData.accountManager || "Unassigned"}</div>
                    <div style={{ fontSize: 10, color: "#525252", marginTop: 2 }}>Dedicated Growth Director</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href={`mailto:support@groworbit.com?subject=Growth Account Query: ${clientData.name}`} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "12px 16px", borderRadius: 12, color: "#fff", textDecoration: "none", fontSize: 11, fontWeight: 700, transition: "all 0.15s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.25)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"}>
                    <Mail size={14} color="#f97316" /> Email Growth Team
                  </a>
                  {clientData.phone && clientData.phone !== "N/A" && (
                    <a href={`https://wa.me/${clientData.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.1)", padding: "12px 16px", borderRadius: 12, color: "#4ade80", textDecoration: "none", fontSize: 11, fontWeight: 700, transition: "all 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(74,222,128,0.08)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(74,222,128,0.03)"}>
                      <Phone size={14} color="#4ade80" /> WhatsApp Direct Link
                    </a>
                  )}
                </div>
              </div>

              {/* Service specs & notes */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 24, padding: "24px 32px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Purchased Services</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 14px", display: "inline-block", marginBottom: 20 }}>
                  {clientData.servicesPurchased}
                </div>

                <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Operations Brief</div>
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", padding: 16, borderRadius: 16, fontSize: 11, color: "#a3a3a3", lineHeight: 1.7, fontStyle: "italic" }}>
                  "{clientData.notes || "No onboarding notes provided."}"
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
