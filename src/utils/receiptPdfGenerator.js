import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Circle } from "@react-pdf/renderer";
import path from "path";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.35,
    color: "#0f172a",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  tagline: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#475569",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  receiptTitleBox: {
    textAlign: "right",
    backgroundColor: "#0f172a",
    padding: "10 16",
    borderRadius: 6,
    color: "#ffffff",
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1,
  },
  receiptNumber: {
    fontSize: 9,
    color: "#ea580c",
    fontWeight: "bold",
    marginTop: 3,
  },
  thankYouRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  thankYouTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0f172a",
  },
  thankYouSub: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 1,
  },
  thankYouText: {
    fontSize: 8.5,
    color: "#64748b",
    marginTop: 1,
  },
  dottedLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#f97316",
    borderBottomStyle: "dotted",
    marginBottom: 20,
  },
  metaGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    gap: 14,
  },
  metaCol1: {
    width: "32%",
  },
  metaCol2: {
    width: "36%",
  },
  metaCol3: {
    width: "32%",
    borderLeftWidth: 1,
    borderLeftColor: "#ffedd5",
    paddingLeft: 12,
  },
  metaHeading: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#ea580c",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  clientName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  metaText: {
    fontSize: 8.5,
    color: "#475569",
    marginBottom: 3,
  },
  serviceTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 3,
  },
  serviceDesc: {
    fontSize: 8,
    color: "#64748b",
    lineHeight: 1.3,
  },
  detailRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 8,
    color: "#475569",
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#ea580c",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 6,
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 12,
    fontSize: 8.5,
  },
  confCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 6,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    marginTop: 6,
  },
  confTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  confText: {
    fontSize: 8,
    color: "#475569",
  },
  confAmount: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#16a34a",
    marginVertical: 2,
  },
  signBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 120,
  },
  signCursive: {
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 2,
  },
  signLine: {
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    marginVertical: 4,
  },
  signName: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#0f172a",
  },
  signTitle: {
    fontSize: 7.5,
    color: "#64748b",
  },
  notesCard: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 14,
    color: "#ffffff",
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ea580c",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 8.5,
    color: "#f1f5f9",
    lineHeight: 1.4,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 7.5,
    color: "#64748b",
  },
});

const formatDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const fmtCurr = (amount, currency = "USD") => {
  const syms = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const s = syms[currency] || "$";
  return `${s}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const ReceiptPdfDocument = ({ receipt }) => {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const currency = receipt.currency || "USD";
  const totalDue = Number(receipt.totalDue || receipt.amountPaid || 3000);
  const paidAmount = Number(receipt.paidAmount || receipt.amountPaid || 3000);
  const balance = Math.max(0, totalDue - paidAmount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.logoContainer}>
            <Image src={logoPath} style={{ width: 140, height: 35, objectFit: "contain" }} />
            <Text style={styles.tagline}>WE RANK, YOU SELL. IT'S THAT SIMPLE.</Text>
          </View>

          <View style={styles.receiptTitleBox}>
            <Text style={styles.receiptTitle}>PAYMENT RECEIPT</Text>
            <Text style={styles.receiptNumber}>{receipt.receiptNumber || "#GO-PR-2026-01-09-3681"}</Text>
          </View>
        </View>

        {/* Thank You Row */}
        <View style={styles.thankYouRow}>
          <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 13, color: "#0f172a", fontWeight: "bold" }}>✓</Text>
          </View>
          <View>
            <Text style={styles.thankYouTitle}>Thank You!</Text>
            <Text style={styles.thankYouSub}>We have received your payment.</Text>
            <Text style={styles.thankYouText}>Here's your payment receipt for your records.</Text>
          </View>
        </View>

        {/* Dotted Line */}
        <View style={styles.dottedLine} />

        {/* 3-Column Metadata */}
        <View style={styles.metaGrid}>
          {/* Col 1 */}
          <View style={styles.metaCol1}>
            <Text style={styles.metaHeading}>RECEIVED FROM</Text>
            <Text style={styles.clientName}>{receipt.clientName || "Amir Baig"}</Text>
            {receipt.companyName ? <Text style={styles.metaText}>{receipt.companyName}</Text> : null}
            {receipt.clientAddress ? <Text style={styles.metaText}>{receipt.clientAddress}</Text> : null}
            {receipt.clientEmail ? <Text style={styles.metaText}>{receipt.clientEmail}</Text> : null}
          </View>

          {/* Col 2 */}
          <View style={styles.metaCol2}>
            <Text style={styles.metaHeading}>SERVICE</Text>
            <Text style={styles.serviceTitle}>{receipt.serviceTitle || "Amazon Growth Partnership"}</Text>
            <Text style={styles.serviceDesc}>{receipt.serviceDescription || "Comprehensive Amazon account management & growth services as per agreement."}</Text>
          </View>

          {/* Col 3 */}
          <View style={styles.metaCol3}>
            <Text style={styles.metaHeading}>PAYMENT DETAILS</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>RECEIPT DATE:</Text>
              <Text style={styles.detailValue}>{formatDate(receipt.receiptDate || receipt.createdAt)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>PAYMENT DATE:</Text>
              <Text style={styles.detailValue}>{formatDate(receipt.paymentDate || receipt.createdAt)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>PAYMENT METHOD:</Text>
              <Text style={styles.detailValue}>{receipt.paymentMethod || "Bank Transfer"}</Text>
            </View>
            {receipt.transactionRef ? (
              <View style={{ marginTop: 2 }}>
                <Text style={styles.detailLabel}>REFERENCE / TX ID:</Text>
                <Text style={[styles.detailValue, { fontWeight: "bold", color: "#0f172a" }]}>{receipt.transactionRef}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Invoice Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>INVOICE SUMMARY</Text>
          
          <View style={styles.tableHeader}>
            <Text style={{ width: "32%" }}>INVOICE #</Text>
            <Text style={{ width: "24%" }}>INVOICE DATE</Text>
            <Text style={{ width: "18%", textAlign: "right" }}>TOTAL DUE</Text>
            <Text style={{ width: "16%", textAlign: "right" }}>PAID AMOUNT</Text>
            <Text style={{ width: "10%", textAlign: "center" }}>STATUS</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ width: "32%", color: "#475569" }}>{receipt.invoiceNumber || "GO-INV-2026-01-09-3681"}</Text>
            <Text style={{ width: "24%", color: "#64748b" }}>{formatDate(receipt.invoiceDate || receipt.paymentDate)}</Text>
            <Text style={{ width: "18%", textAlign: "right", color: "#ea580c", fontWeight: "bold" }}>{fmtCurr(totalDue, currency)}</Text>
            <Text style={{ width: "16%", textAlign: "right", color: "#16a34a", fontWeight: "bold" }}>{fmtCurr(paidAmount, currency)}</Text>
            <Text style={{ width: "10%", textAlign: "center", color: "#16a34a", fontWeight: "bold" }}>PAID</Text>
          </View>

          {/* Payment Received Sub Box */}
          <View style={styles.confCard}>
            <View style={{ width: "100%" }}>
              <Text style={styles.confTitle}>PAYMENT RECEIVED</Text>
              <Text style={styles.confText}>We confirm that we have received the payment of</Text>
              <Text style={styles.confAmount}>{fmtCurr(paidAmount, currency)} {currency}</Text>
              <Text style={styles.confText}>for Invoice #{receipt.invoiceNumber ? receipt.invoiceNumber.replace(/^#/, '') : 'GO-INV-2026-01-09-3681'}.</Text>
              <Text style={[styles.confText, { color: "#64748b", marginTop: 2 }]}>This payment has been successfully processed.</Text>
            </View>
          </View>
        </View>

        {/* Notes Card */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>NOTES</Text>
          <Text style={styles.notesText}>{receipt.notes || "Thank you for partnering with Grow Orbit. We truly appreciate your trust and collaboration. We look forward to achieving greater success together."}</Text>
          <Text style={[styles.notesText, { color: "#94a3b8", marginTop: 4 }]}>Receipt issued on {formatDate(receipt.paymentDate || receipt.createdAt)}.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Image src={logoPath} style={{ width: 20, height: 20, marginRight: 6 }} />
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0f172a" }}>GROW ORBIT</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <View>
              <Text>www.groworbitofficial.com</Text>
              <Text>support@groworbitofficial.com</Text>
            </View>
            <View>
              <Text>+1 (302) 823-6826</Text>
              <Text>Mississauga, ON, Canada</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 6, padding: "6 12", display: "flex", alignItems: "center" }}>
            <Text style={{ fontSize: 11, fontWeight: "bold", color: "#0f172a", marginBottom: 2 }}>{receipt.signatoryName || "Ali Haider"}</Text>
            <Text style={{ fontSize: 6.5, fontWeight: "bold", color: "#ea580c", letterSpacing: 0.8 }}>DIGITALLY SIGNED</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
};
