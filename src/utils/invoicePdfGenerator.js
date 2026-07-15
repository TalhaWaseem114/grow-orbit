import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Professional invoice styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
    color: "#334155",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 1.5,
  },
  invoiceMetaTitle: {
    fontSize: 14,
    color: "#ea580c",
    fontWeight: "bold",
  },
  titleBlock: {
    marginBottom: 25,
  },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 11,
    color: "#64748b",
  },
  metaGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 20,
  },
  metaCol: {
    width: "30%",
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  metaText: {
    fontSize: 9,
    color: "#334155",
    marginBottom: 2,
  },
  metaCompany: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 3,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#0f172a",
    padding: "6px 8px",
    borderRadius: 4,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 8,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    padding: "10px 8px",
    alignItems: "center",
  },
  colIndex: {
    width: "8%",
  },
  colDesc: {
    width: "52%",
  },
  colQty: {
    width: "10%",
    textAlign: "center",
  },
  colRate: {
    width: "15%",
    textAlign: "right",
  },
  colAmount: {
    width: "15%",
    textAlign: "right",
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#0f172a",
    fontSize: 9,
  },
  itemDesc: {
    color: "#64748b",
    fontSize: 8,
    marginTop: 2,
  },
  calculationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  calculationBlock: {
    width: "40%",
  },
  calcRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    fontSize: 9,
  },
  calcRowTotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 6,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#ea580c",
  },
  notesContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  notesTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 8,
    color: "#64748b",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 10,
  },
  bold: {
    fontWeight: "bold",
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
  return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export const InvoicePdfDocument = ({ invoice }) => {
  const items = invoice.items || [];
  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
  const discountAmount = Number(invoice.discount) || 0;
  const taxAmount = (subtotal - discountAmount) * ((Number(invoice.taxRate) || 0) / 100);
  const total = subtotal - discountAmount + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>GROW ORBIT</Text>
          <Text style={styles.invoiceMetaTitle}>INVOICE</Text>
        </View>

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.invoiceTitle}>GROW ORBIT LLC</Text>
          <Text style={styles.invoiceNumber}>Invoice #: {invoice.invoiceNumber}</Text>
        </View>

        {/* Meta Grid */}
        <View style={styles.metaGrid}>
          {/* From */}
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>From</Text>
            <Text style={styles.metaCompany}>Grow Orbit LLC</Text>
            <Text style={styles.metaText}>Amazon Growth Agency</Text>
            <Text style={styles.metaText}>hello@groworbit.co</Text>
            <Text style={styles.metaText}>www.groworbit.co</Text>
          </View>

          {/* To */}
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Billing To</Text>
            {invoice.companyName ? <Text style={styles.metaCompany}>{invoice.companyName}</Text> : null}
            <Text style={styles.metaText}>Attn: {invoice.clientName || "—"}</Text>
            <Text style={styles.metaText}>Email: {invoice.clientEmail || "—"}</Text>
            {invoice.clientAddress ? <Text style={styles.metaText}>{invoice.clientAddress}</Text> : null}
          </View>

          {/* Invoice Details */}
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Invoice Details</Text>
            <Text style={styles.metaText}>Date Issued: {formatDate(invoice.issueDate)}</Text>
            <Text style={styles.metaText}>Due Date: {formatDate(invoice.dueDate)}</Text>
            <Text style={styles.metaText}>Status: <Text style={{ color: invoice.status === "paid" ? "#22c55e" : invoice.status === "overdue" ? "#ef4444" : "#ea580c", fontWeight: "bold" }}>{invoice.status?.toUpperCase()}</Text></Text>
            <Text style={styles.metaText}>Currency: {invoice.currency}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.colIndex}>#</Text>
            <Text style={styles.colDesc}>Service / Item Description</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colRate}>Rate</Text>
            <Text style={styles.colAmount}>Amount</Text>
          </View>

          {/* Table Rows */}
          {items.map((item, idx) => {
            const qty = Number(item.quantity) || 1;
            const rate = Number(item.price) || 0;
            const amount = qty * rate;

            return (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.colIndex}>{idx + 1}</Text>
                <View style={styles.colDesc}>
                  <Text style={styles.itemTitle}>{item.name || "Custom Service"}</Text>
                  {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
                </View>
                <Text style={styles.colQty}>{qty}</Text>
                <Text style={styles.colRate}>{fmtCurrency(rate, invoice.currency)}</Text>
                <Text style={styles.colAmount}>{fmtCurrency(amount, invoice.currency)}</Text>
              </View>
            );
          })}
        </View>

        {/* Calculations */}
        <View style={styles.calculationContainer}>
          <View style={styles.calculationBlock}>
            <View style={styles.calcRow}>
              <Text>Subtotal:</Text>
              <Text>{fmtCurrency(subtotal, invoice.currency)}</Text>
            </View>

            {discountAmount > 0 ? (
              <View style={styles.calcRow}>
                <Text>Discount:</Text>
                <Text>-{fmtCurrency(discountAmount, invoice.currency)}</Text>
              </View>
            ) : null}

            {Number(invoice.taxRate) > 0 ? (
              <View style={styles.calcRow}>
                <Text>Tax ({invoice.taxRate}%):</Text>
                <Text>{fmtCurrency(taxAmount, invoice.currency)}</Text>
              </View>
            ) : null}

            <View style={styles.calcRowTotal}>
              <Text>Total Due:</Text>
              <Text>{fmtCurrency(total, invoice.currency)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Notes */}
        {invoice.notes ? (
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Payment Details & Instructions</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your business. Grow Orbit LLC — www.groworbit.co</Text>
      </Page>
    </Document>
  );
};
