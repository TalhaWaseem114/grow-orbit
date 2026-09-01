"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Save, Download, Loader, ArrowLeft, Plus, Trash2, ChevronDown, ChevronRight, Mail, Copy, Check } from "lucide-react";
import { db, auth } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";

const CURRENCY_OPTIONS = ["USD", "GBP", "EUR", "PKR", "AED", "CAD", "AUD"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" }
];

const DEFAULT_NOTES = `Thank you for choosing Grow Orbit.
We appreciate your trust and look forward to
helping you achieve exceptional growth on Amazon.`;

const fmtCurrency = (amount, currency = "USD") => {
  const symbols = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDateStr = (dateStr, longFormat = false) => {
  if (!dateStr) return "—";
  try {
    const parts = String(dateStr).split("-");
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (y && m && d) {
        const dt = new Date(y, m - 1, d);
        return dt.toLocaleDateString("en-US", {
          month: longFormat ? "long" : "short",
          day: "numeric",
          year: "numeric"
        });
      }
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};

const getServiceIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("account") || n.includes("management")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    );
  }
  if (n.includes("research") || n.includes("product")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    );
  }
  if (n.includes("ppc") || n.includes("ad") || n.includes("marketing") || n.includes("campaign")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    );
  }
  if (n.includes("optim") || n.includes("listing") || n.includes("seo")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    );
  }
  if (n.includes("creative") || n.includes("content") || n.includes("design") || n.includes("store")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    );
  }
  if (n.includes("report") || n.includes("strategy") || n.includes("consult")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
};

const getDeliverables = (item) => {
  if (Array.isArray(item.deliverables) && item.deliverables.length > 0) {
    return item.deliverables;
  }
  const nameLower = (item.name || "").toLowerCase();
  const descLower = (item.description || "").toLowerCase();

  // 1. Full Brand Launch / End-to-End Sell-Through Package
  if (
    nameLower.includes("launch") ||
    nameLower.includes("brand launch") ||
    descLower.includes("hunting") ||
    descLower.includes("sourcing") ||
    descLower.includes("sell-through") ||
    (nameLower.includes("management") && (nameLower.includes("launch") || descLower.includes("launch")))
  ) {
    return [
      "Product Hunting & Opportunity Analysis",
      "Supplier Sourcing & Manufacturing Coordination",
      "High-Converting 3D Renders & Graphic Infographics",
      "Brand Storefront & Premium A+ Content Design",
      "Full SEO Copywriting & Backend Keyword Indexing",
      "Launch PPC Strategy & 1st Batch Sell-Through"
    ];
  }

  // 2. Product Hunting & Sourcing standalone
  if (nameLower.includes("hunt") || nameLower.includes("sourc") || (nameLower.includes("research") && nameLower.includes("product"))) {
    return [
      "In-Depth Niche & Competitor Research",
      "High-Margin Product Opportunity Analysis",
      "Supplier Verification & Price Negotiation",
      "Landed Cost & Profit Margin Analysis"
    ];
  }

  // 3. Creative / Graphics / 3D Renders / Store / A+
  if (nameLower.includes("creative") || nameLower.includes("graphic") || nameLower.includes("render") || nameLower.includes("image") || nameLower.includes("a+") || nameLower.includes("ebc") || nameLower.includes("store")) {
    return [
      "Custom 3D Product Modeling & Hero Renders",
      "High-Converting Lifestyle & Feature Infographics",
      "Premium A+ Content (EBC) Layouts",
      "Brand Storefront Design & Custom Widgets"
    ];
  }

  // 4. PPC & Advertising
  if (nameLower.includes("ppc") || nameLower.includes("ad") || nameLower.includes("campaign") || nameLower.includes("marketing")) {
    return [
      "Sponsored Products, Brands & Display Setup",
      "Negative Keyword & Bid Optimization",
      "ACOS / TACOS Target Management",
      "Weekly Keyword Harvesting & Search Term Audits"
    ];
  }

  // 5. SEO & Listing Optimization
  if (nameLower.includes("optim") || nameLower.includes("listing") || nameLower.includes("seo") || nameLower.includes("copy")) {
    return [
      "High-Volume Keyword Architecture",
      "Persuasive Title, 5 Bullets & Description",
      "Backend Search Terms & Indexing Audits",
      "Conversion Rate Optimization (CRO)"
    ];
  }

  // 6. Full Monthly Retainer / Account Management
  if (nameLower.includes("account") || nameLower.includes("management")) {
    return [
      "24/7 Account Health & Case Management",
      "Inventory Reorder Threshold Monitoring",
      "Continuous Listing & PPC Optimization",
      "Competitor Tracking & Monthly Performance Audits"
    ];
  }

  // 7. Consultation / Audit / Strategy
  if (nameLower.includes("report") || nameLower.includes("strategy") || nameLower.includes("consult") || nameLower.includes("audit")) {
    return [
      "Deep-Dive Account & Competitor Audit",
      "Tailored Growth Roadmap & Action Plan",
      "Live 1-on-1 Strategy Video Consultation"
    ];
  }

  if (item.description) {
    const lines = item.description.split(/[\n;]/).map(l => l.trim().replace(/^[-*✓✓✓\s]+/, "")).filter(Boolean);
    if (lines.length > 1) {
      return lines;
    }
  }
  return [
    "Premium Agency Service Delivery",
    "Direct Strategic Consultation",
    "Account Performance & Oversight"
  ];
};

const PREDEFINED_SERVICES = [
  {
    shortName: "Brand Launch 360",
    name: "Full Amazon Account Management & Brand Launch",
    description: "End-to-end launch: Product hunting, supplier sourcing, 3D renders, listing graphics, A+ content, SEO copy, and launch PPC to sell out the inaugural inventory.",
    price: 8500,
    quantity: 1
  },
  {
    shortName: "Account Mgmt",
    name: "Full Account Management",
    description: "Monthly retainer for store operations, catalog management, and organic optimizations.",
    price: 1500,
    quantity: 1
  },
  {
    shortName: "PPC Management",
    name: "Amazon PPC Optimization",
    description: "Full setup, scaling, and weekly optimization of Amazon Advertising campaigns.",
    price: 800,
    quantity: 1
  },
  {
    shortName: "SEO & Copy",
    name: "Full Listing Optimization & SEO",
    description: "Title, bullet points, backend search terms, and full SEO copy implementation.",
    price: 350,
    quantity: 1
  },
  {
    shortName: "Brand Store",
    name: "Brand Store Design",
    description: "Premium design of multi-page Amazon Brand Store with customized widgets.",
    price: 1200,
    quantity: 1
  },
  {
    shortName: "A+ Content",
    name: "A+ Page / EBC Design",
    description: "Full graphic design, copywriting, and layout setup for Amazon EBC description.",
    price: 600,
    quantity: 1
  },
  {
    shortName: "Sourcing & Hunting",
    name: "Product Hunting & Sourcing",
    description: "Deep research, profit analysis, supplier verification, and sample evaluation report.",
    price: 500,
    quantity: 1
  },
  {
    shortName: "Consultation Call",
    name: "Strategy Consultation",
    description: "1-hour deep dive screen-share session with growth roadmap formulation.",
    price: 150,
    quantity: 1
  }
];

function InvoiceBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");
  const leadId = searchParams.get("leadId");
  const justSavedRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [zoom, setZoom] = useState(0.9);

  // Email Flow States
  const [hasSaved, setHasSaved] = useState(false);
  const [hasExported, setHasExported] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [gDriveLink, setGDriveLink] = useState("");
  const [emailCustomMessage, setEmailCustomMessage] = useState("");
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const isSaved = !!invoiceId || hasSaved;
  const isEmailActive = isSaved && hasExported;

  const [invoice, setInvoice] = useState(null);

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("draft");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [agreementId, setAgreementId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 14 Days");
  const [clientLabel1, setClientLabel1] = useState("Valued Partner");
  const [clientLabel2, setClientLabel2] = useState("Business Client");

  // Payment Details states
  const [bankName, setBankName] = useState("Wise (TransferWise)");
  const [bankAccountName, setBankAccountName] = useState("Grow Orbit LLC");
  const [bankAccountNumber, setBankAccountNumber] = useState("831245678");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("026073150");
  const [bankSwiftBic, setBankSwiftBic] = useState("TRWIBEB1XXX");
  const [paypalEmail, setPaypalEmail] = useState("");

  // Collapsible accordion states for sidebar cards
  const [expandedSections, setExpandedSections] = useState({
    clientInfo: true,
    invoiceParams: true,
    lineItems: true,
    taxesNotes: true,
    paymentDetails: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const [items, setItems] = useState([
    { id: Date.now(), name: "Full Account Management", description: "Monthly retainer for store operations and optimizations.", quantity: 1, price: 1500 }
  ]);

  // Next auto-sequenced number preview
  const [invoiceNumberPreview, setInvoiceNumberPreview] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const dateStr = String(d.getDate()).padStart(2, "0");
    const monthStr = String(d.getMonth() + 1).padStart(2, "0");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `GO-INV-${year}-${dateStr}-${monthStr}-${randomNum}`;
  });

  // Auto-calculate dueDate whenever issueDate or paymentTerms change
  useEffect(() => {
    if (!issueDate || !paymentTerms) return;
    const match = paymentTerms.match(/\d+/);
    if (match) {
      const days = parseInt(match[0], 10);
      const d = new Date(issueDate);
      d.setDate(d.getDate() + days);
      setDueDate(d.toISOString().split("T")[0]);
    }
  }, [issueDate, paymentTerms]);

  useEffect(() => {
    if (justSavedRef.current) {
      justSavedRef.current = false;
      return;
    }
    const initData = async () => {
      setLoading(true);
      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];

      // Default dates
      setIssueDate(todayStr);

      // Load global defaults from settings collection
      let globalDefaults = {
        bankName: "Wise (TransferWise)",
        bankAccountName: "Grow Orbit LLC",
        bankAccountNumber: "831245678",
        bankRoutingNumber: "026073150",
        bankSwiftBic: "TRWIBEB1XXX",
        paypalEmail: ""
      };

      try {
        const defaultsSnap = await getDoc(doc(db, "settings", "invoiceDefaults"));
        if (defaultsSnap.exists()) {
          globalDefaults = { ...globalDefaults, ...defaultsSnap.data() };
        }
      } catch (err) {
        console.warn("Failed to load invoice payment defaults:", err);
      }

      // Pre-fill states with defaults
      setBankName(globalDefaults.bankName);
      setBankAccountName(globalDefaults.bankAccountName);
      setBankAccountNumber(globalDefaults.bankAccountNumber);
      setBankRoutingNumber(globalDefaults.bankRoutingNumber);
      setBankSwiftBic(globalDefaults.bankSwiftBic);
      setPaypalEmail(globalDefaults.paypalEmail || "");

      if (invoiceId) {
        // Fetch existing invoice
        try {
          const docRef = doc(db, "invoices", invoiceId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.id ? { id: snap.id, ...snap.data() } : snap.data();
            setInvoice(data);
            setInvoiceNumberPreview(data.invoiceNumber);
            setClientName(data.clientName || "");
            setClientEmail(data.clientEmail || "");
            setCompanyName(data.companyName || "");
            setClientAddress(data.clientAddress || "");
            setIssueDate(data.issueDate || todayStr);
            setDueDate(data.dueDate || "");
            setCurrency(data.currency || "USD");
            setStatus(data.status || "draft");
            setTaxRate(Number(data.taxRate) || 0);
            setDiscount(Number(data.discount) || 0);
            setNotes(data.notes || "");
            setAgreementId(data.agreementId || "");
            setStartDate(data.startDate || "");
            setPaymentTerms(data.paymentTerms || "Net 14 Days");
            setClientLabel1(data.clientLabel1 || "Valued Partner");
            setClientLabel2(data.clientLabel2 || "Business Client");

            // Override with invoice-specific payment info if stored
            if (data.bankName) setBankName(data.bankName);
            if (data.bankAccountName) setBankAccountName(data.bankAccountName);
            if (data.bankAccountNumber) setBankAccountNumber(data.bankAccountNumber);
            if (data.bankRoutingNumber) setBankRoutingNumber(data.bankRoutingNumber);
            if (data.bankSwiftBic) setBankSwiftBic(data.bankSwiftBic);
            if (data.paypalEmail !== undefined) setPaypalEmail(data.paypalEmail || "");

            if (data.items && data.items.length > 0) {
              setItems(data.items.map((it, idx) => ({ ...it, id: it.id || Date.now() + idx })));
            }
          }
        } catch (e) {
          console.error("Failed to load invoice:", e);
        }
      } else if (leadId) {
        // Pre-populate client info from Lead
        try {
          const docRef = doc(db, "leads", leadId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            setClientName(data.fullName || "");
            setClientEmail(data.email || "");
            setCompanyName(data.companyName || "");
            setClientAddress(data.location || "");
          }
        } catch (e) {
          console.error("Failed to load lead details:", e);
        }
      }

      setLoading(false);
    };

    initData();
  }, [invoiceId, leadId]);

  // Calculation helpers
  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
  const discountAmount = Number(discount) || 0;
  const taxAmount = (subtotal - discountAmount) * ((Number(taxRate) || 0) / 100);
  const total = subtotal - discountAmount + taxAmount;

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "Custom Service", description: "Provide details of the service...", quantity: 1, price: 100 }
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return;
    setItems(items.filter(it => it.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(it => {
      if (it.id === id) {
        return { ...it, [field]: value };
      }
      return it;
    }));
  };

  const validateClientInfo = () => {
    const nameStr = (clientName || companyName || "").trim();
    const emailStr = (clientEmail || "").trim();

    if (!nameStr || !emailStr) {
      setExpandedSections(prev => ({ ...prev, clientInfo: true }));
      alert("Missing Client Information:\n\nPlease enter the Client Full Name (or Company Name) and Client Email Address before exporting or saving the invoice.");
      return false;
    }
    return true;
  };

  const handleExportPDF = async () => {
    if (!validateClientInfo()) return;
    setExporting(true);
    const originalTitle = document.title;
    document.title = `Grow Orbit pdf invoice (${invoiceNumberPreview})`;
    
    // Use the native browser print/PDF engine for pixel-perfect preservation of the HTML preview
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setExporting(false);
      setHasExported(true);
    }, 100);
  };

  const handleSaveInvoice = async () => {
    if (!validateClientInfo()) return;
    setSaving(true);
    try {
      const token = await auth.currentUser?.getIdToken() || "";
      const payload = {
        invoiceNumber: invoiceNumberPreview,
        leadId: leadId || invoice?.leadId || "manual_invoice",
        clientName,
        clientEmail,
        companyName,
        clientAddress,
        issueDate,
        dueDate,
        currency,
        status,
        taxRate,
        discount,
        notes,
        agreementId,
        startDate,
        paymentTerms,
        clientLabel1,
        clientLabel2,
        bankName,
        bankAccountName,
        bankAccountNumber,
        bankRoutingNumber,
        bankSwiftBic,
        paypalEmail,
        items: items.map(({ name, description, quantity, price }) => ({ name, description, quantity: Number(quantity), price: Number(price) }))
      };

      let res;
      if (invoiceId) {
        // Edit Mode
        res = await fetch(`/api/invoices/${invoiceId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // New Mode
        res = await fetch("/api/invoices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        alert(invoiceId ? "Invoice updated successfully!" : "Invoice created successfully!");
        setHasSaved(true);
        if (!invoiceId) {
          justSavedRef.current = true;
          router.replace(`/admin-dashboard/invoice-builder?id=${data.id}`, { scroll: false });
        }
      } else {
        alert("Failed to save invoice: " + data.error);
      }
    } catch (err) {
      alert("Error saving invoice: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Synchronize email details when modal is shown
  useEffect(() => {
    if (showEmailModal) {
      setEmailTo(clientEmail || "");
      setEmailSubject(`Invoice ${invoiceNumberPreview} from Grow Orbit`);
    }
  }, [showEmailModal, clientEmail, invoiceNumberPreview]);

  const handleCopyEmailTemplate = () => {
    if (!gDriveLink) return;
    const bodyText = `Hi ${clientName || "Partner"},\n\nWe have prepared your invoice ${invoiceNumberPreview} for recent services. You can view the document and keep track of payment details by clicking the link below:\n\nView Invoice: ${gDriveLink}\n\nInvoice Details:\n- Invoice Number: ${invoiceNumberPreview}\n- Due Date: ${dueDate}\n- Amount Due: ${fmtCurrency(total, currency)}\n\n${emailCustomMessage || "Please feel free to reply directly to this email if you have any questions."}\n\nBest regards,\nGrow Orbit Team`;
    
    navigator.clipboard.writeText(bodyText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleSendEmailDirectly = async () => {
    setSendingEmail(true);
    try {
      const token = await auth.currentUser?.getIdToken() || "";
      const res = await fetch("/api/invoices/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          to: emailTo,
          subject: emailSubject,
          clientName,
          invoiceNumber: invoiceNumberPreview,
          amount: fmtCurrency(total, currency),
          dueDate,
          gDriveLink,
          customMessage: emailCustomMessage
        })
      });

      const data = await res.json();
      if (data.success) {
        alert("Email sent successfully!");
        setShowEmailModal(false);
      } else {
        alert("Failed to send email: " + data.error);
      }
    } catch (e) {
      alert("Error sending email: " + e.message);
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#090d16", color: "#94a3b8" }}>
        <Loader size={32} className="animate-spin" style={{ marginRight: 8 }} /> Loading invoice builder workspace...
      </div>
    );
  }

  const currencySymbol = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" }[currency] || "$";

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-invoice, #print-invoice * { visibility: visible !important; }
          #print-wrapper { transform: none !important; }
          #print-invoice {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 1055px !important;
            height: 1491px !important;
            margin: 0 !important;
            padding: 60px 55px 45px !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            transform: none !important;
          }
          @page { size: 1055px 1491px; margin: 0; }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#090d16", overflow: "hidden" }}>
      {/* Top Header */}
      <div style={{ height: "69px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0a0e17", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => router.push("/admin-dashboard")}
            style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center" }}
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#ea580c", tracking: "0.2em", textTransform: "uppercase" }}>Visual Invoice Builder</div>
            <h1 style={{ fontSize: 16, fontWeight: 850, color: "#fff", margin: 0 }}>
              {invoiceId ? `Editing Invoice ${invoiceNumberPreview}` : `New Invoice Drafting`}
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Zoom controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "3px 8px", background: "rgba(255,255,255,0.02)" }}>
            <button
              onClick={() => setZoom(z => Math.max(0.35, z - 0.05))}
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

          {/* Download PDF button (always visible now) */}
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#fff", cursor: "pointer", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: "8px" }}
          >
            {exporting ? <Loader size={13} className="animate-spin" /> : <Download size={13} />}
            {exporting ? "Generating..." : "Export PDF"}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveInvoice}
            disabled={saving}
            style={{ border: "none", background: "#ea580c", color: "#fff", cursor: "pointer", fontSize: "11px", fontWeight: 800, display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: "8px" }}
          >
            {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
            {invoiceId || hasSaved ? "Update & Save" : "Save Invoice"}
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left Form Editor Column */}
        <div className="custom-scrollbar" style={{ width: "480px", borderRight: "1px solid rgba(255,255,255,0.06)", background: "#0a0e17", display: "flex", flexDirection: "column", overflowY: "auto", padding: "24px" }}>

          {/* Client Metas Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: expandedSections.clientInfo ? 14 : 0, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div
              onClick={() => toggleSection("clientInfo")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
            >
              <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Client & Billing Info</h2>
              {expandedSections.clientInfo ? <ChevronDown size={14} color="#71717a" /> : <ChevronRight size={14} color="#71717a" />}
            </div>

            {expandedSections.clientInfo && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Client Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Client Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. john@company.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Billing Address</label>
                  <input
                    type="text"
                    placeholder="e.g. London, UK"
                    value={clientAddress}
                    onChange={e => setClientAddress(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

              </>
            )}
          </div>

          {/* Invoice Metas Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: expandedSections.invoiceParams ? 14 : 0, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div
              onClick={() => toggleSection("invoiceParams")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
            >
              <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Invoice Parameters</h2>
              {expandedSections.invoiceParams ? <ChevronDown size={14} color="#71717a" /> : <ChevronRight size={14} color="#71717a" />}
            </div>

            {expandedSections.invoiceParams && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Issue Date</label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={e => setIssueDate(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Currency</label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    >
                      {CURRENCY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Status</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    >
                      {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Invoice ID</label>
                    <input
                      type="text"
                      placeholder="e.g. GO-INV-2026-1234"
                      value={invoiceNumberPreview}
                      onChange={e => setInvoiceNumberPreview(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Contract Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Payment Terms</label>
                  <input
                    type="text"
                    placeholder="e.g. Net 14 Days"
                    value={paymentTerms}
                    onChange={e => setPaymentTerms(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Line Items Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: expandedSections.lineItems ? 14 : 0, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div
              onClick={() => toggleSection("lineItems")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Add Services</h2>
                {expandedSections.lineItems && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddItem();
                    }}
                    style={{ background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.2)", borderRadius: 6, padding: "4px 8px", color: "#ea580c", fontSize: 9, fontWeight: 850, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Plus size={10} /> Add Item
                  </button>
                )}
              </div>
              {expandedSections.lineItems ? <ChevronDown size={14} color="#71717a" /> : <ChevronRight size={14} color="#71717a" />}
            </div>

            {expandedSections.lineItems && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Predefined services quick add */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <label style={{ fontSize: 9, color: "#71717a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Add Services</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingBottom: 4 }}>
                    {PREDEFINED_SERVICES.map(service => (
                      <button
                        key={service.name}
                        type="button"
                        onClick={() => {
                          setItems(prev => {
                            // If the only item is the default empty placeholder item, replace it
                            if (prev.length === 1 && prev[0].name === "Full Account Management" && prev[0].price === 1500 && prev[0].quantity === 1) {
                              return [{
                                id: Date.now(),
                                name: service.name,
                                description: service.description,
                                price: service.price,
                                quantity: service.quantity
                              }];
                            }
                            return [
                              ...prev,
                              {
                                id: Date.now() + Math.random(),
                                name: service.name,
                                description: service.description,
                                price: service.price,
                                quantity: service.quantity
                              }
                            ];
                          });
                        }}
                        title={`${service.description} (Rate: $${service.price})`}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 6,
                          padding: "5px 10px",
                          color: "#fff",
                          fontSize: 10,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = "#ea580c";
                          e.currentTarget.style.background = "rgba(234,88,12,0.08)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                        }}
                      >
                        + {service.shortName}
                      </button>
                    ))}
                  </div>
                </div>

                {items.map((item, idx) => (
                  <div key={item.id} style={{ borderBottom: idx < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", paddingBottom: idx < items.length - 1 ? 12 : 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#71717a", width: 14 }}>{idx + 1}</span>
                      <input
                        type="text"
                        placeholder="Service Name"
                        value={item.name}
                        onChange={e => handleItemChange(item.id, "name", e.target.value)}
                        style={{ flex: 1, background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={items.length === 1}
                        style={{ background: "none", border: "none", color: items.length === 1 ? "#525252" : "#ef4444", cursor: items.length === 1 ? "not-allowed" : "pointer" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Short description (optional)..."
                      value={item.description || ""}
                      onChange={e => handleItemChange(item.id, "description", e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 10, outline: "none", marginLeft: 22 }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginLeft: 22 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <label style={{ fontSize: 9, color: "#525252", fontWeight: 700 }}>Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => handleItemChange(item.id, "quantity", Math.max(1, parseInt(e.target.value, 10) || 1))}
                          style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <label style={{ fontSize: 9, color: "#525252", fontWeight: 700 }}>Rate ({currencySymbol})</label>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={e => handleItemChange(item.id, "price", Math.max(0, parseFloat(e.target.value) || 0))}
                          style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Adjustments & Notes */}
          <div style={{ display: "flex", flexDirection: "column", gap: expandedSections.taxesNotes ? 14 : 0, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 24 }}>
            <div
              onClick={() => toggleSection("taxesNotes")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
            >
              <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Taxes, Discounts & Payment Notes</h2>
              {expandedSections.taxesNotes ? <ChevronDown size={14} color="#71717a" /> : <ChevronRight size={14} color="#71717a" />}
            </div>

            {expandedSections.taxesNotes && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Discount Amount ({currencySymbol})</label>
                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={e => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Tax Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={taxRate}
                      onChange={e => setTaxRate(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Payment Notes & Details</label>
                  <textarea
                    rows="10"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 11, fontFamily: "monospace", outline: "none", resize: "vertical", lineHeight: 1.4 }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Payment Details Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: expandedSections.paymentDetails ? 14 : 0, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 24 }}>
            <div
              onClick={() => toggleSection("paymentDetails")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
            >
              <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Payment Information (Wise & PayPal)</h2>
              {expandedSections.paymentDetails ? <ChevronDown size={14} color="#71717a" /> : <ChevronRight size={14} color="#71717a" />}
            </div>

            {expandedSections.paymentDetails && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Bank Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Wise (TransferWise)"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Account Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Grow Orbit LLC"
                    value={bankAccountName}
                    onChange={e => setBankAccountName(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Account Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 831245678"
                      value={bankAccountNumber}
                      onChange={e => setBankAccountNumber(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Routing Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 026073150"
                      value={bankRoutingNumber}
                      onChange={e => setBankRoutingNumber(e.target.value)}
                      style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>SWIFT / BIC</label>
                  <input
                    type="text"
                    placeholder="e.g. TRWIBEB1XXX"
                    value={bankSwiftBic}
                    onChange={e => setBankSwiftBic(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>PayPal Email Recipient (Optional)</label>
                  <input
                    type="email"
                    placeholder="Leave blank to omit PayPal"
                    value={paypalEmail}
                    onChange={e => setPaypalEmail(e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                  />
                </div>
              </>
            )}
          </div>      </div>

          {/* Right Live Preview Column */}
        <div className="custom-scrollbar" style={{ flex: 1, overflow: "auto", background: "#0b0f19", padding: "40px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{
            width: `${1055 * zoom}px`,
            height: `${1491 * zoom}px`,
            position: "relative",
            transition: "width 0.2s, height 0.2s"
          }}>
            <div id="print-wrapper" style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              width: "1055px",
              minHeight: "1491px",
              transition: "transform 0.2s",
              position: "absolute",
              top: 0,
              left: 0
            }}>

              {/* A4 Sheet Container */}
              <div id="print-invoice" style={{
                width: "1055px",
              minHeight: "1491px",
              background: "#fff",
              padding: "60px 55px 45px",
              boxSizing: "border-box",
              color: "#1e293b",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "11px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden"
            }}>

              {/* Refined Invoice Header Section */}
              <div style={{
                position: "relative",
                height: "175px",
                margin: "-60px -55px 0",
                overflow: "hidden"
              }}>
                {/* Wave Banner SVG Graphic */}
                <div style={{ position: "absolute", top: 0, right: 0, width: "580px", height: "160px", zIndex: 1, pointerEvents: "none" }}>
                  <img src="/header-curve.png" alt="Header Graphic" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right top" }} />
                </div>

                {/* Invoice Text Overlay */}
                <div style={{ position: "absolute", top: 38, right: 55, textAlign: "right", zIndex: 2 }}>
                  <div style={{ fontSize: "36px", fontWeight: "900", color: "#f97316", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "var(--font-montserrat)" }}>INVOICE</div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff", marginTop: 6, letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>#{invoiceNumberPreview}</div>
                </div>

                {/* Logo & Tagline */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "absolute", top: "65px", left: "55px", zIndex: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img
                      src="/logo.png"
                      alt="Grow Orbit Logo"
                      style={{ width: "48px", height: "48px", objectFit: "contain" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>
                        <span style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>GROW&nbsp;</span>
                        <span style={{ fontSize: "26px", fontWeight: "900", color: "#f97316", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>ORBIT</span>
                      </div>
                      <div style={{ fontSize: "8.5px", color: "#64748b", fontWeight: "800", letterSpacing: "1px", marginTop: "6px" }}>
                        WE RANK. YOU SELL. IT'S THAT SIMPLE.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edge-to-Edge Dashed Orange Line with Black End Half-Circle Cutouts */}
              <div style={{ position: "relative", margin: "20px -55px 28px", height: "0px" }}>
                <div style={{
                  position: "absolute",
                  left: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#0b0f19",
                  zIndex: 5
                }} />
                <div style={{ borderTop: "3px dashed #f97316", width: "100%" }} />
                <div style={{
                  position: "absolute",
                  right: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#0b0f19",
                  zIndex: 5
                }} />
              </div>

              {/* Three-Column Metadata Block */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "28px",
                gap: "16px"
              }}>
                {/* 1. Billed To Column */}
                <div style={{ width: "32%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#ef4444", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>BILLED TO</div>
                  <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "8px", fontFamily: "var(--font-montserrat)" }}>{clientName || companyName || "Valued Client"}</div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "11.5px" }}>
                      {companyName ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                          <path d="M9 22v-4h6v4"/>
                          <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                          <path d="M12 10h.01"/><path d="M12 14h.01"/>
                          <path d="M16 10h.01"/><path d="M16 14h.01"/>
                          <path d="M8 10h.01"/><path d="M8 14h.01"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      )}
                      <span style={{ fontWeight: "600" }}>{companyName || clientName || clientLabel1 || "Valued Partner"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "11.5px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span style={{ fontWeight: "600" }}>{clientAddress || clientLabel2 || "Business Client"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "11.5px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <span style={{ fontWeight: "500", textDecoration: "none" }}>{clientEmail || "client@company.com"}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Service Partnership Column */}
                <div style={{ width: "36%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#f97316", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>SERVICE</div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, overflow: "hidden" }}>
                      <img src="/amazon-logo.png" alt="Amazon Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", fontFamily: "var(--font-montserrat)" }}>Amazon Growth Partnership</div>
                      <div style={{ fontSize: "10.5px", color: "#64748b", lineHeight: "1.4", marginTop: "4px", fontWeight: "500" }}>
                        Comprehensive Amazon account management & growth services as per agreement.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Dates & ID Column */}
                <div style={{
                  width: "28%",
                  borderLeft: "1.5px solid rgba(249,115,22,0.5)",
                  paddingLeft: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  {[
                    { label: "INVOICE DATE", val: formatDateStr(issueDate) },
                    { label: "DUE DATE", val: formatDateStr(dueDate) },
                    { label: "PAYMENT TERMS", val: paymentTerms || "Net 14 Days" },
                    { label: "INVOICE ID", val: invoiceNumberPreview },
                    { label: "START DATE", val: formatDateStr(startDate || issueDate) }
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "9.5px" }}>
                      <span style={{ fontWeight: "800", color: "#0f172a", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>{row.label}</span>
                      <span style={{ color: "#475569", fontWeight: "600" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Table */}
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "22px" }}>
                {/* Header row */}
                <div style={{ display: "flex", background: "#0f172a", borderRadius: "6px", overflow: "hidden", alignItems: "center", height: "32px", fontFamily: "var(--font-montserrat)" }}>
                  <div style={{ width: "6%", padding: "0 10px", color: "#fff", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px" }}>#</div>
                  <div style={{ width: "34%", padding: "0 10px", color: "#fff", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px" }}>DESCRIPTION</div>
                  <div style={{ width: "35%", padding: "0 10px", color: "#fff", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px" }}>DELIVERABLES</div>
                  <div style={{ width: "7%", padding: "0 10px", color: "#fff", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px", textAlign: "center" }}>QTY</div>
                  <div style={{ width: "13%", padding: "0 10px", color: "#fff", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px", textAlign: "right" }}>RATE ({currency})</div>
                  <div style={{ width: "15%", padding: "0 14px", color: "#fff", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px", textAlign: "right", background: "#f97316", display: "flex", height: "100%", alignItems: "center", justifyContent: "flex-end" }}>AMOUNT ({currency})</div>
                </div>

                {/* Body Rows */}
                {items.map((item, idx) => {
                  const qty = Number(item.quantity) || 1;
                  const rate = Number(item.price) || 0;
                  const itemTotal = qty * rate;
                  const deliverables = getDeliverables(item);

                  return (
                    <div key={item.id} style={{ display: "flex", borderBottom: "1px solid #f1f5f9", padding: "12px 0", alignItems: "stretch" }}>
                      {/* 1. Index */}
                      <div style={{ width: "6%", padding: "0 10px", fontWeight: "800", color: "#64748b", fontSize: "11px", display: "flex", alignItems: "center" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      {/* 2. Description Card */}
                      <div style={{ width: "34%", padding: "0 10px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#fff7ed", border: "1px solid #ffedd5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {getServiceIcon(item.name)}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "11px" }}>{item.name || "Custom Service"}</div>
                          {item.description && <div style={{ color: "#64748b", fontSize: "9px", marginTop: "2px", lineHeight: "1.3" }}>{item.description}</div>}
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ width: "2px", backgroundColor: "#f1f5f9", margin: "10px 0" }}></div>

                      {/* 3. Deliverables Column */}
                      <div style={{ width: "35%", padding: "0 10px", display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center" }}>
                        {deliverables.map((del, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9px", color: "#475569", fontWeight: "600" }}>
                            <span style={{ color: "#f97316", fontWeight: "800" }}>✓</span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* Divider */}
                      <div style={{ width: "2px", backgroundColor: "#f1f5f9", margin: "10px 0" }}></div>

                      {/* 4. Qty */}
                      <div style={{ width: "7%", padding: "0 10px", textAlign: "center", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {qty}
                      </div>

                      {/* Divider */}
                      <div style={{ width: "2px", backgroundColor: "#f1f5f9", margin: "10px 0" }}></div>

                      {/* 5. Rate */}
                      <div style={{ width: "13%", padding: "0 10px", textAlign: "right", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        {fmtCurrency(rate, currency)}
                      </div>

                      {/* Divider */}
                      <div style={{ width: "2px", backgroundColor: "#e2e8f0", margin: "10px 0" }}></div>

                      {/* 6. Amount */}
                      <div style={{ width: "15%", padding: "0 14px", textAlign: "right", fontWeight: "800", color: "#f97316", display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: "11px" }}>
                        {fmtCurrency(itemTotal, currency)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notes & Totals Layout */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "26px" }}>
                {/* Notes box on the left */}
                <div style={{ width: "56%", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", overflow: "hidden", display: "flex", gap: "12px", background: "#0f172a", borderRadius: "8px", padding: "16px 20px", alignItems: "flex-start" }}>
                    {/* Background Orbit SVG */}
                    <div style={{ position: "absolute", right: "-10px", bottom: "-10px", opacity: 0.5, pointerEvents: "none" }}>
                      <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                        <circle cx="100" cy="100" r="30" stroke="#ea580c" strokeWidth="1" strokeDasharray="1 3" strokeLinecap="round" />
                        <circle cx="100" cy="100" r="45" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="1 4" strokeLinecap="round" />
                        <circle cx="100" cy="100" r="60" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
                        <circle cx="100" cy="100" r="75" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="1 6" strokeLinecap="round" />
                        <circle cx="100" cy="100" r="90" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(234,88,12,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", zIndex: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316" stroke="none">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", zIndex: 1 }}>
                      <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#f97316", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>NOTES</div>
                      <pre style={{ margin: 0, padding: 0, fontSize: "10px", color: "#f8fafc", fontFamily: "var(--font-montserrat)", whiteSpace: "pre-wrap", lineHeight: "1.6", fontWeight: "500" }}>
                        {notes || `Thank you for choosing Grow Orbit.
We appreciate your trust and look forward to
helping you achieve exceptional growth on Amazon.`}
                      </pre>
                      <div style={{ marginTop: "12px", fontSize: "10px", color: "#f8fafc", fontFamily: "var(--font-montserrat)", fontWeight: "500" }}>
                        Payment is due by {dueDate ? formatDateStr(dueDate, true) : "the specified due date"}.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Totals table on the right */}
                <div style={{ width: "38%", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", fontWeight: "800", fontFamily: "var(--font-montserrat)" }}>
                    <span style={{ color: "#64748b" }}>SUBTOTAL</span>
                    <span style={{ color: "#0f172a" }}>{fmtCurrency(subtotal, currency)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", fontWeight: "800", fontFamily: "var(--font-montserrat)" }}>
                    <span style={{ color: "#64748b" }}>DISCOUNT</span>
                    <span style={{ color: discountAmount > 0 ? "#ef4444" : "#0f172a" }}>
                      {discountAmount > 0 ? `-${fmtCurrency(discountAmount, currency)}` : fmtCurrency(0, currency)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", fontWeight: "800", fontFamily: "var(--font-montserrat)" }}>
                    <span style={{ color: "#64748b" }}>TAX ({taxRate}%)</span>
                    <span style={{ color: "#0f172a" }}>{fmtCurrency(taxAmount, currency)}</span>
                  </div>

                  {/* Total Due with Orange blocks */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#ffedd5",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid rgba(249,115,22,0.15)",
                    marginTop: "4px"
                  }}>
                    <span style={{ color: "#f97316", fontSize: "10.5px", fontWeight: "900", paddingLeft: "12px", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>TOTAL DUE ({currency})</span>
                    <span style={{ background: "#f97316", color: "#fff", padding: "8px 14px", fontSize: "13px", fontWeight: "900", minWidth: "90px", textAlign: "right" }}>
                      {fmtCurrency(total, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div style={{
                border: "1px solid #ffedd5",
                background: "#fff",
                borderRadius: "12px",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "24px"
              }}>
                <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#f97316", letterSpacing: "1px", marginBottom: "14px", fontFamily: "var(--font-montserrat)" }}>PAYMENT METHODS</div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  {/* Left: Bank details */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flex: paypalEmail ? "0 0 45%" : "1" }}>
                    <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                      <img src="/bank-logo.png" alt="Bank Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", fontSize: "10px", lineHeight: "1.6", gap: "3px" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "11px", fontFamily: "var(--font-montserrat)" }}>BANK TRANSFER</div>
                      <div style={{ color: "#64748b" }}>Bank Name: <span style={{ fontWeight: "700", color: "#475569" }}>{bankName || "Wise (TransferWise)"}</span></div>
                      <div style={{ color: "#64748b" }}>Account Name: <span style={{ fontWeight: "700", color: "#475569" }}>{bankAccountName || "Grow Orbit LLC"}</span></div>
                      <div style={{ color: "#64748b" }}>Account Number: <span style={{ fontWeight: "700", color: "#475569" }}>{bankAccountNumber || "831245678"}</span></div>
                      <div style={{ color: "#64748b" }}>Routing Number: <span style={{ fontWeight: "700", color: "#475569" }}>{bankRoutingNumber || "026073150"}</span></div>
                      <div style={{ color: "#64748b" }}>SWIFT / BIC: <span style={{ fontWeight: "700", color: "#475569" }}>{bankSwiftBic || "TRWIBEB1XXX"}</span></div>
                    </div>
                  </div>

                  {paypalEmail ? (
                    <>
                      {/* Divider Line */}
                      <div style={{ width: "1px", backgroundColor: "#e2e8f0", margin: "0 10px", alignSelf: "stretch" }}></div>

                      {/* Center: PayPal details */}
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", flex: "0 0 25%" }}>
                        <div style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                          <img src="/paypal-logo.png" alt="PayPal" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", fontSize: "10px", lineHeight: "1.6", gap: "3px" }}>
                          <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "11px", fontFamily: "var(--font-montserrat)" }}>PAYPAL</div>
                          <div style={{ color: "#64748b" }}>Recipient: <span style={{ fontWeight: "750", color: "#1d4ed8" }}>{paypalEmail}</span></div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {/* Right: Small Info Cards */}
                  <div style={{ display: "flex", gap: "14px", paddingLeft: "20px", borderLeft: "2px solid #ffedd5", flexShrink: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px", justifyContent: "center" }}>

                      {/* Due Date */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ fontSize: "10.5px", fontWeight: "900", color: "#ea580c", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>DUE DATE</span>
                          <span style={{ fontSize: "12px", fontWeight: "900", color: "#0f172a" }}>{formatDateStr(dueDate, true)}</span>
                        </div>
                      </div>

                      {/* Amount Due */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#f97316" stroke="none"><circle cx="12" cy="12" r="10"/><text x="12" y="16.5" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="sans-serif">$</text></svg>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ fontSize: "10.5px", fontWeight: "900", color: "#ea580c", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>AMOUNT DUE</span>
                          <span style={{ fontSize: "14px", fontWeight: "900", color: "#0f172a" }}>{fmtCurrency(total, currency)} {currency}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Brand Footer */}
              <div style={{
                marginTop: "auto",
                borderTop: "1.5px solid #f1f5f9",
                paddingTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                {/* Logo left */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src="/logo.png"
                    alt="Grow Orbit Logo"
                    style={{ width: "32px", height: "32px", objectFit: "contain" }}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#0f172a", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>GROW&nbsp;</span>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#f97316", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>ORBIT</span>
                  </div>
                </div>

                {/* Contact Columns center */}
                <div style={{ display: "flex", alignItems: "center", padding: "0 20px", borderLeft: "1px solid #fed7aa", borderRight: "1px solid #fed7aa" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px", fontSize: "10px", color: "#0f172a", fontWeight: "600", paddingRight: "20px", borderRight: "1px solid #fed7aa" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      <span style={{ whiteSpace: "nowrap" }}>www.groworbitofficial.com</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <span style={{ whiteSpace: "nowrap" }}>support@groworbitofficial.com</span>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px", fontSize: "10px", color: "#0f172a", fontWeight: "600", paddingLeft: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span style={{ whiteSpace: "nowrap" }}>+1 (912) 820-5916</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span style={{ whiteSpace: "nowrap" }}>2583 Lundigan Dr, Mississauga, ON L5J 3W2, Canada</span>
                    </div>
                  </div>
                </div>

                {/* Digital signature card right */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "185px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "14px 16px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {/* Top-Right Decorative Corner Shape Accent */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "65px",
                      height: "65px",
                      pointerEvents: "none"
                    }}>
                      <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
                        <path d="M65 0 H20 L65 50 Z" fill="#f6e7e0" />
                      </svg>
                    </div>

                    {/* Signature Text */}
                    <div style={{
                      fontSize: "20px",
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontWeight: 400,
                      color: "#0f172a",
                      letterSpacing: "0.5px",
                      marginBottom: "6px"
                    }}>
                      Ali Haider
                    </div>

                    {/* Orange Horizontal Gradient Line */}
                    <div style={{
                      width: "100px",
                      height: "2px",
                      background: "radial-gradient(ellipse at center, #ea580c 0%, rgba(234,88,12,0) 75%)",
                      marginBottom: "10px"
                    }} />

                    {/* Digitally Signed Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      <span style={{ fontSize: "7.5px", fontWeight: "750", color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: "var(--font-montserrat)" }}>
                        DIGITALLY SIGNED
                      </span>
                    </div>
                  </div>

                  {/* Title Label Below Card */}
                  <span style={{ fontSize: "8px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "6px" }}>
                    Founder & CEO, Grow Orbit LLC
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      </div>
    </div>

    </>
  );
}

export default function InvoiceBuilderPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#090d16", color: "#94a3b8" }}>
        <Loader size={32} className="animate-spin" style={{ marginRight: 8 }} /> Loading workspace...
      </div>
    }>
      <InvoiceBuilderContent />
    </Suspense>
  );
}
