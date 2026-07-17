import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path } from "@react-pdf/renderer";
import path from "path";

// Professional invoice styles matching the HTML template
const styles = StyleSheet.create({
  page: {
    padding: 45,
    fontSize: 8.5,
    fontFamily: "Helvetica",
    lineHeight: 1.35,
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  header: {
    height: 110,
    marginTop: -45,
    marginLeft: -45,
    marginRight: -45,
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ea580c",
    position: "relative",
    overflow: "hidden",
  },
  logoContainer: {
    position: "absolute",
    left: 45,
    top: 32,
    display: "flex",
    flexDirection: "column",
  },
  logoTextRow: {
    display: "flex",
    flexDirection: "row",
  },
  logoTextPrimary: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 1.5,
  },
  logoTextSecondary: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#ea580c",
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 8.5,
    color: "#475569",
    marginTop: 5,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  bannerContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 420,
    height: 110,
  },
  bannerTextContainer: {
    position: "absolute",
    right: 45,
    top: 26,
  },
  invoiceMetaTitle: {
    fontSize: 26,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "right",
    letterSpacing: 2,
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#ea580c",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  metaGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    gap: 15,
  },
  metaCol1: {
    width: "32%",
  },
  metaCol2: {
    width: "36%",
  },
  metaCol3: {
    width: "28%",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(234, 88, 12, 0.15)",
    paddingLeft: 12,
  },
  metaLabelRed: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#ef4444",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  metaLabelOrange: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#ea580c",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  metaLabelDark: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  metaCompany: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 5,
  },
  metaText: {
    fontSize: 8.5,
    color: "#475569",
    marginBottom: 2,
  },
  metaRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 7.5,
    marginBottom: 3,
  },
  metaRowLabel: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  metaRowValue: {
    color: "#475569",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderRadius: 4,
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 7.5,
    alignItems: "center",
    height: 24,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingVertical: 10,
    alignItems: "center",
  },
  colIndex: {
    width: "6%",
    paddingLeft: 6,
  },
  colDesc: {
    width: "34%",
    paddingHorizontal: 6,
  },
  colDeliv: {
    width: "35%",
    paddingHorizontal: 6,
  },
  colQty: {
    width: "7%",
    textAlign: "center",
  },
  colRate: {
    width: "13%",
    textAlign: "right",
    paddingRight: 6,
  },
  colAmountHeader: {
    width: "15%",
    textAlign: "right",
    backgroundColor: "#ea580c",
    color: "#ffffff",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    paddingRight: 8,
  },
  colAmountRow: {
    width: "15%",
    textAlign: "right",
    fontWeight: "bold",
    color: "#ea580c",
    paddingRight: 8,
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#0f172a",
    fontSize: 9,
  },
  itemDesc: {
    color: "#64748b",
    fontSize: 7.5,
    marginTop: 2,
  },
  delivItem: {
    fontSize: 7.5,
    color: "#475569",
    marginBottom: 2,
  },
  bottomGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 15,
  },
  notesBox: {
    width: "56%",
    backgroundColor: "rgba(234, 88, 12, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(234, 88, 12, 0.08)",
    borderRadius: 6,
    padding: 10,
  },
  notesTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#ea580c",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 7.5,
    color: "#64748b",
    lineHeight: 1.35,
  },
  totalsBox: {
    width: "38%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  calcRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8.5,
    fontWeight: "bold",
  },
  totalDueContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffedd5",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(234, 88, 12, 0.15)",
    marginTop: 4,
    height: 28,
  },
  totalDueLabel: {
    color: "#ea580c",
    fontSize: 8,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  totalDueValue: {
    backgroundColor: "#ea580c",
    color: "#ffffff",
    paddingHorizontal: 12,
    fontWeight: "bold",
    fontSize: 10,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
    textAlign: "right",
  },
  paymentMethodsCard: {
    borderWidth: 1,
    borderColor: "#ffedd5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  pmTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#ea580c",
    marginBottom: 8,
  },
  pmGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pmCol1: {
    width: "42%",
  },
  pmCol2: {
    width: "30%",
  },
  pmCol3: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  pmSubTitle: {
    fontWeight: "bold",
    color: "#0f172a",
    fontSize: 8,
    marginBottom: 3,
  },
  pmText: {
    fontSize: 7.5,
    color: "#64748b",
    marginBottom: 1.5,
  },
  infoCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 4,
    paddingHorizontal: 8,
  },
  infoCardOrange: {
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#ffedd5",
    borderRadius: 6,
    padding: 4,
    paddingHorizontal: 8,
  },
  infoCardLabel: {
    fontSize: 6.5,
    fontWeight: "bold",
    color: "#64748b",
  },
  infoCardValue: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0f172a",
  },
  infoCardLabelOrange: {
    fontSize: 6.5,
    fontWeight: "bold",
    color: "#ea580c",
  },
  infoCardValueOrange: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#ea580c",
  },
  footerSection: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerContacts: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    fontSize: 7.5,
    color: "#64748b",
  },
  signatureContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signatureText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0f172a",
  },
  signatureSub: {
    fontSize: 6,
    color: "#64748b",
    textTransform: "uppercase",
    marginTop: 1,
  },
});

const fmtCurrency = (amount, currency = "USD") => {
  const symbols = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getDeliverables = (item) => {
  const nameLower = (item.name || "").toLowerCase();
  if (nameLower.includes("account") || nameLower.includes("management")) {
    return ["Account Health Monitoring", "Performance Optimization", "Policy & Compliance Management"];
  }
  if (nameLower.includes("research") || nameLower.includes("product")) {
    return ["Market & Competitor Research", "High-Converting Product Ideas", "Keyword Opportunity Report"];
  }
  if (nameLower.includes("ppc") || nameLower.includes("ad") || nameLower.includes("campaign")) {
    return ["Campaign Setup & Optimization", "Bid Management", "ACOS & TACOS Optimization"];
  }
  if (nameLower.includes("optim") || nameLower.includes("listing") || nameLower.includes("seo")) {
    return ["Title, Bullets & Description", "Backend Keywords", "SEO Optimization"];
  }
  if (nameLower.includes("creative") || nameLower.includes("content") || nameLower.includes("design") || nameLower.includes("store")) {
    return ["A+ Content Design", "Brand Store (Basic)", "Infographic Images"];
  }
  if (nameLower.includes("report") || nameLower.includes("strategy") || nameLower.includes("consult")) {
    return ["Monthly Performance Report", "Competitor Analysis", "Strategy Call (Monthly)"];
  }
  
  if (item.description) {
    const lines = item.description.split(/[\n;]/).map(l => l.trim().replace(/^[-*✓✓✓\s]+/, "")).filter(Boolean);
    if (lines.length > 1) {
      return lines.slice(0, 3);
    }
  }
  return ["Premium Agency Service Delivery", "Direct Strategy & Consultations", "Account Performance Audits"];
};

export const InvoicePdfDocument = ({ invoice }) => {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const items = invoice.items || [];
  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
  const discountAmount = Number(invoice.discount) || 0;
  const taxAmount = (subtotal - discountAmount) * ((Number(invoice.taxRate) || 0) / 100);
  const total = subtotal - discountAmount + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Refined Invoice Header Section */}
        <View style={styles.header}>
          {/* Wave Banner SVG Graphic */}
          <View style={styles.bannerContainer}>
            <Svg width="420" height="110" viewBox="0 0 420 110">
              {/* Layer 1: Beige background curve */}
              <Path d="M 80 0 C 130 35, 110 75, 160 110 L 420 110 L 420 0 Z" fill="#fff7ed" />
              
              {/* Layer 2: Orange curve */}
              <Path d="M 120 0 C 145 28, 175 35, 195 0 Z" fill="#ea580c" />
              
              {/* Layer 3: Dark overlay curve */}
              <Path d="M 155 0 C 185 28, 150 82, 205 110 L 420 110 L 420 0 Z" fill="#0f172a" />
            </Svg>
            
            {/* Invoice Text Overlay */}
            <View style={styles.bannerTextContainer}>
              <Text style={styles.invoiceMetaTitle}>INVOICE</Text>
              <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
            </View>
          </View>

          {/* Logo & Tagline */}
          <View style={styles.logoContainer}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Image src={logoPath} style={{ width: 30, height: 30, marginRight: 8 }} />
              <View style={styles.logoTextRow}>
                <Text style={styles.logoTextPrimary}>GROW</Text>
                <Text style={styles.logoTextSecondary}> ORBIT</Text>
              </View>
            </View>
            <Text style={styles.tagline}>Amazon Growth. Your Orbit.</Text>
          </View>
        </View>

        {/* Meta Grid */}
        <View style={styles.metaGrid}>
          {/* 1. Billed To */}
          <View style={styles.metaCol1}>
            <Text style={styles.metaLabelRed}>BILLED TO</Text>
            <Text style={styles.metaCompany}>{invoice.companyName || invoice.clientName || "Valued Client"}</Text>
            <Text style={styles.metaText}>{invoice.clientLabel1 || "Valued Partner"}</Text>
            <Text style={styles.metaText}>{invoice.clientLabel2 || "Business Client"}</Text>
            <Text style={styles.metaText}>{invoice.clientEmail || "support@groworbitofficial.com"}</Text>
          </View>

          {/* 2. Service */}
          <View style={styles.metaCol2}>
            <Text style={styles.metaLabelOrange}>SERVICE</Text>
            <Text style={styles.metaCompany}>Amazon Growth Partnership</Text>
            <Text style={[styles.metaText, { color: "#64748b", lineHeight: 1.3 }]}>
              Comprehensive Amazon account management & growth services as per agreement.
            </Text>
          </View>

          {/* 3. Dates & ID */}
          <View style={styles.metaCol3}>
            {[
              { label: "INVOICE DATE", val: formatDate(invoice.issueDate) },
              { label: "DUE DATE", val: formatDate(invoice.dueDate) },
              { label: "PAYMENT TERMS", val: invoice.paymentTerms || "Net 14 Days" },
              { label: "AGREEMENT ID", val: invoice.agreementId || "GO-2026-XXXX" },
              { label: "START DATE", val: formatDate(invoice.startDate || invoice.issueDate) }
            ].map((row, i) => (
              <View key={i} style={styles.metaRow}>
                <Text style={styles.metaRowLabel}>{row.label}</Text>
                <Text style={styles.metaRowValue}>{row.val}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colIndex, { color: "#ffffff" }]}>#</Text>
            <Text style={[styles.colDesc, { color: "#ffffff" }]}>DESCRIPTION</Text>
            <Text style={[styles.colDeliv, { color: "#ffffff" }]}>DELIVERABLES</Text>
            <Text style={[styles.colQty, { color: "#ffffff", textAlign: "center" }]}>QTY</Text>
            <Text style={[styles.colRate, { color: "#ffffff", textAlign: "right" }]}>RATE</Text>
            <Text style={[styles.colAmountHeader]}>AMOUNT</Text>
          </View>

          {/* Table Rows */}
          {items.map((item, idx) => {
            const qty = Number(item.quantity) || 1;
            const rate = Number(item.price) || 0;
            const amount = qty * rate;
            const deliverables = getDeliverables(item);

            return (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.colIndex}>{String(idx + 1).padStart(2, "0")}</Text>
                <View style={styles.colDesc}>
                  <Text style={styles.itemTitle}>{item.name || "Custom Service"}</Text>
                  {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
                </View>
                <View style={styles.colDeliv}>
                  {deliverables.map((del, i) => (
                    <Text key={i} style={styles.delivItem}>✓ {del}</Text>
                  ))}
                </View>
                <Text style={styles.colQty}>{qty}</Text>
                <Text style={styles.colRate}>{fmtCurrency(rate, invoice.currency)}</Text>
                <Text style={styles.colAmountRow}>{fmtCurrency(amount, invoice.currency)}</Text>
              </View>
            );
          })}
        </View>

        {/* Notes & Totals Grid */}
        <View style={styles.bottomGrid}>
          {/* Notes */}
          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>NOTES</Text>
            <Text style={styles.notesText}>
              {invoice.notes || "Thank you for choosing Grow Orbit. We appreciate your trust and look forward to helping you achieve exceptional growth on Amazon."}
            </Text>
          </View>

          {/* Totals */}
          <View style={styles.totalsBox}>
            <View style={styles.calcRow}>
              <Text style={{ color: "#64748b" }}>SUBTOTAL</Text>
              <Text style={{ color: "#0f172a" }}>{fmtCurrency(subtotal, invoice.currency)}</Text>
            </View>
            <View style={styles.calcRow}>
              <Text style={{ color: "#64748b" }}>DISCOUNT</Text>
              <Text style={{ color: discountAmount > 0 ? "#ef4444" : "#0f172a" }}>
                {discountAmount > 0 ? `-${fmtCurrency(discountAmount, invoice.currency)}` : fmtCurrency(0, invoice.currency)}
              </Text>
            </View>
            <View style={styles.calcRow}>
              <Text style={{ color: "#64748b" }}>TAX ({invoice.taxRate}%)</Text>
              <Text style={{ color: "#0f172a" }}>{fmtCurrency(taxAmount, invoice.currency)}</Text>
            </View>

            {/* Total Due with Highlight */}
            <View style={styles.totalDueContainer}>
              <Text style={styles.totalDueLabel}>TOTAL DUE ({invoice.currency})</Text>
              <Text style={styles.totalDueValue}>{fmtCurrency(total, invoice.currency)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods Card */}
        <View style={styles.paymentMethodsCard}>
          <Text style={styles.pmTitle}>PAYMENT METHODS</Text>
          <View style={styles.pmGrid}>
            {/* Left: Bank Transfer */}
            <View style={styles.pmCol1}>
              <Text style={styles.pmSubTitle}>BANK TRANSFER</Text>
              <Text style={styles.pmText}>Bank Name: {invoice.bankName || "Wise (TransferWise)"}</Text>
              <Text style={styles.pmText}>Account Name: {invoice.bankAccountName || "Grow Orbit LLC"}</Text>
              <Text style={styles.pmText}>Account Number: {invoice.bankAccountNumber || "831245678"}</Text>
              <Text style={styles.pmText}>Routing Number: {invoice.bankRoutingNumber || "026073150"}</Text>
              <Text style={styles.pmText}>SWIFT / BIC: {invoice.bankSwiftBic || "TRWIBEB1XXX"}</Text>
            </View>

            {/* Center: PayPal */}
            <View style={styles.pmCol2}>
              <Text style={styles.pmSubTitle}>PAYPAL</Text>
              <Text style={styles.pmText}>Recipient:</Text>
              <Text style={[styles.pmText, { color: "#1d4ed8", fontWeight: "bold" }]}>{invoice.paypalEmail || "support@groworbitofficial.com"}</Text>
            </View>

            {/* Right: Info cards */}
            <View style={styles.pmCol3}>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardLabel}>DUE DATE</Text>
                <Text style={styles.infoCardValue}>{formatDate(invoice.dueDate)}</Text>
              </View>
              <View style={styles.infoCardOrange}>
                <Text style={styles.infoCardLabelOrange}>AMOUNT DUE</Text>
                <Text style={styles.infoCardValueOrange}>{fmtCurrency(total, invoice.currency)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer section */}
        <View style={styles.footerSection}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Image src={logoPath} style={{ width: 16, height: 16, marginRight: 5 }} />
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0f172a" }}>GROW ORBIT</Text>
          </View>
          <View style={styles.footerContacts}>
            <View>
              <Text>🌐 www.groworbitofficial.com</Text>
              <Text>✉ support@groworbitofficial.com</Text>
            </View>
            <View>
              <Text>📞 +1 (912) 820-5916</Text>
              <Text>📍 2583 Lundigan Dr, Mississauga, ON, Canada</Text>
            </View>
          </View>
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureText}>Ali</Text>
            <Text style={styles.signatureSub}>Founder & CEO, Grow Orbit LLC</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
