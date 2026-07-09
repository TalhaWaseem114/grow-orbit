import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Stylesheet configuration for professional layout
const styles = StyleSheet.create({
  page: {
    padding: 54, // 0.75 in margins
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#334155",
    position: "relative",
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 1,
  },
  contractNumber: {
    fontSize: 9,
    color: "#f97316",
    fontWeight: "bold",
  },
  watermark: {
    position: "absolute",
    top: "35%",
    left: "15%",
    fontSize: 54,
    fontWeight: "bold",
    color: "rgba(226, 232, 240, 0.35)",
    transform: "rotate(-40deg)",
    width: "70%",
    textAlign: "center",
    zIndex: -1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
  },
  bulletItem: {
    marginBottom: 8,
    paddingLeft: 15,
    display: "flex",
    flexDirection: "row",
  },
  bulletPrefix: {
    width: 15,
  },
  bulletText: {
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  underline: {
    textDecoration: "underline",
  },
  signatureContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    keepTogether: true,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#94a3b8",
    marginTop: 8,
    marginBottom: 6,
    height: 40,
    display: "flex",
    justifyContent: "center",
  },
  signatureText: {
    fontSize: 14,
    color: "#0f172a",
    fontFamily: "Times-Italic", // Default cursive fallback
  },
  signatureImage: {
    maxHeight: 38,
    maxWidth: 160,
    objectFit: "contain",
  },
  signerLabel: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 2,
  },
  // Audit certificate styles
  certPage: {
    padding: 54,
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    color: "#334155",
  },
  certTitleHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 2,
    borderBottomColor: "#f97316",
    paddingBottom: 6,
    marginBottom: 16,
  },
  certTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    marginBottom: 20,
    overflow: "hidden",
  },
  certRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    padding: 8,
  },
  certRowLast: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
  },
  certLabel: {
    width: "30%",
    fontWeight: "bold",
    color: "#64748b",
  },
  certValue: {
    width: "70%",
    color: "#0f172a",
  },
  timelineHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
    marginTop: 10,
  },
  timelineTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  timelineRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    padding: 6,
    backgroundColor: "#ffffff",
  },
  timelineRowHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    padding: 6,
    backgroundColor: "#f8fafc",
    fontWeight: "bold",
    color: "#475569",
  },
  timelineColTime: {
    width: "25%",
  },
  timelineColEvent: {
    width: "50%",
  },
  timelineColIp: {
    width: "25%",
    textAlign: "right",
  },
});

// Parsers HTML to structured elements compatible with @react-pdf/renderer
function parseHtmlToPdfElements(html) {
  const elements = [];
  if (!html) return elements;

  const cleaned = html.replace(/<!--[\s\S]*?-->/g, "");
  const parts = cleaned.split(/(<\/?[a-zA-Z0-9]+[^>]*>)/g);

  let currentParagraph = [];
  let isBold = false;
  let isUnderline = false;
  let listIndex = 1;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    if (part.startsWith("<")) {
      const tagName = part.toLowerCase();
      if (tagName.startsWith("<p") || tagName.startsWith("<div") || tagName.startsWith("<h")) {
        if (currentParagraph.length > 0) {
          elements.push({ type: "p", children: [...currentParagraph] });
          currentParagraph = [];
        }
      } else if (tagName.startsWith("</p") || tagName.startsWith("</div>") || tagName.startsWith("</h")) {
        if (currentParagraph.length > 0) {
          const type = tagName.includes("h1") ? "h1" : tagName.includes("h2") ? "h2" : "p";
          elements.push({ type, children: [...currentParagraph] });
          currentParagraph = [];
        }
      } else if (tagName.startsWith("<strong") || tagName.startsWith("<b")) {
        isBold = true;
      } else if (tagName.startsWith("</strong") || tagName.startsWith("</b")) {
        isBold = false;
      } else if (tagName.startsWith("<u")) {
        isUnderline = true;
      } else if (tagName.startsWith("</u")) {
        isUnderline = false;
      } else if (tagName.startsWith("<li")) {
        if (currentParagraph.length > 0) {
          elements.push({ type: "p", children: [...currentParagraph] });
          currentParagraph = [];
        }
      } else if (tagName.startsWith("</li")) {
        elements.push({ type: "li", index: listIndex++, children: [...currentParagraph] });
        currentParagraph = [];
      } else if (tagName.startsWith("<br")) {
        if (currentParagraph.length > 0) {
          elements.push({ type: "p", children: [...currentParagraph] });
          currentParagraph = [];
        }
      }
    } else {
      let text = part
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");

      if (text.trim() || text.includes(" ")) {
        currentParagraph.push({ text, isBold, isUnderline });
      }
    }
  }

  if (currentParagraph.length > 0) {
    elements.push({ type: "p", children: currentParagraph });
  }

  return elements;
}

// React PDF Document component
export const ContractPdfDocument = ({ contract, watermark }) => {
  const elements = parseHtmlToPdfElements(contract.renderedHtml);
  const showSignature = contract.status === "signed" || contract.status === "completed";
  const signatureData = contract.signature;
  const createdDate = contract.createdAt ? (contract.createdAt.toDate ? contract.createdAt.toDate() : new Date(contract.createdAt)) : new Date();

  return (
    <Document>
      {/* 1. Main Contract Pages */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>GROW ORBIT</Text>
          <Text style={styles.contractNumber}>{contract.contractNumber}</Text>
        </View>

        {/* Watermark */}
        {watermark && <Text style={styles.watermark}>{watermark}</Text>}

        {/* Title */}
        <Text style={styles.title}>SERVICE AGREEMENT</Text>

        {/* Body elements */}
        {elements.map((el, index) => {
          if (el.type === "h1") {
            return (
              <Text key={index} style={[styles.bold, { fontSize: 13, marginTop: 15, marginBottom: 8 }]}>
                {el.children.map(c => c.text).join("")}
              </Text>
            );
          }
          if (el.type === "h2") {
            return (
              <Text key={index} style={[styles.bold, { fontSize: 11, marginTop: 12, marginBottom: 6 }]}>
                {el.children.map(c => c.text).join("")}
              </Text>
            );
          }
          if (el.type === "li") {
            return (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPrefix}>{el.index}. </Text>
                <Text style={styles.bulletText}>
                  {el.children.map((c, cIdx) => (
                    <Text key={cIdx} style={[c.isBold && styles.bold, c.isUnderline && styles.underline]}>
                      {c.text}
                    </Text>
                  ))}
                </Text>
              </View>
            );
          }
          return (
            <Text key={index} style={styles.paragraph}>
              {el.children.map((c, cIdx) => (
                <Text key={cIdx} style={[c.isBold && styles.bold, c.isUnderline && styles.underline]}>
                  {c.text}
                </Text>
              ))}
            </Text>
          );
        })}

        {/* Signatures Panel */}
        <View style={styles.signatureContainer}>
          {/* Provider Signature */}
          <View style={styles.signatureBlock}>
            <Text style={styles.signerLabel}>Grow Orbit Representative</Text>
            <View style={styles.signatureLine}>
              <Text style={[styles.signatureText, { fontFamily: "Times-Roman", fontSize: 13 }]}>Grow Orbit Team</Text>
            </View>
            <Text style={styles.signerLabel}>Name: Grow Orbit representative</Text>
            <Text style={styles.signerLabel}>Date: {createdDate.toLocaleDateString()}</Text>
          </View>

          {/* Client Signature */}
          <View style={styles.signatureBlock}>
            <Text style={styles.signerLabel}>Client Signatory</Text>
            <View style={styles.signatureLine}>
              {showSignature && signatureData ? (
                signatureData.method === "typed" ? (
                  <Text style={styles.signatureText}>{signatureData.signatureValue}</Text>
                ) : (
                  <Image style={styles.signatureImage} src={signatureData.signatureValue} />
                )
              ) : null}
            </View>
            <Text style={styles.signerLabel}>Name: {showSignature && signatureData ? signatureData.signerName : "Awaiting signature"}</Text>
            <Text style={styles.signerLabel}>Date: {showSignature && signatureData ? new Date(signatureData.timestamp?.toDate ? signatureData.timestamp.toDate() : signatureData.timestamp).toLocaleDateString() : "Pending"}</Text>
          </View>
        </View>
      </Page>

      {/* 2. Audit Trail Page / Certificate of Completion */}
      <Page size="A4" style={styles.certPage}>
        <Text style={styles.certTitleHeader}>Certificate of Completion</Text>
        
        <View style={styles.certTable}>
          <View style={styles.certRow}>
            <Text style={styles.certLabel}>Contract ID</Text>
            <Text style={styles.certValue}>{contract.contractNumber} (System ID: {contract.id})</Text>
          </View>
          <View style={styles.certRow}>
            <Text style={styles.certLabel}>Client Email</Text>
            <Text style={styles.certValue}>{contract.clientEmail}</Text>
          </View>
          <View style={styles.certRow}>
            <Text style={styles.certLabel}>Company Name</Text>
            <Text style={styles.certValue}>{contract.companyName || "N/A"}</Text>
          </View>
          <View style={styles.certRow}>
            <Text style={styles.certLabel}>Status</Text>
            <Text style={styles.certValue}>{contract.status.toUpperCase()}</Text>
          </View>
          <View style={styles.certRow}>
            <Text style={styles.certLabel}>Created On</Text>
            <Text style={styles.certValue}>{createdDate.toUTCString()}</Text>
          </View>
          <View style={styles.certRow}>
            <Text style={styles.certLabel}>Expires On</Text>
            <Text style={styles.certValue}>{contract.expiresAt ? new Date(contract.expiresAt?.toDate ? contract.expiresAt.toDate() : contract.expiresAt).toUTCString() : "Never"}</Text>
          </View>
          {showSignature && signatureData && (
            <>
              <View style={styles.certRow}>
                <Text style={styles.certLabel}>Signer Identity</Text>
                <Text style={styles.certValue}>{signatureData.signerName} ({signatureData.signerEmail})</Text>
              </View>
              <View style={styles.certRow}>
                <Text style={styles.certLabel}>Sign Date</Text>
                <Text style={styles.certValue}>{new Date(signatureData.timestamp?.toDate ? signatureData.timestamp.toDate() : signatureData.timestamp).toUTCString()}</Text>
              </View>
              <View style={styles.certRow}>
                <Text style={styles.certLabel}>Sign IP</Text>
                <Text style={styles.certValue}>{signatureData.ip || "N/A"}</Text>
              </View>
              <View style={styles.certRowLast}>
                <Text style={styles.certLabel}>Sign Method</Text>
                <Text style={styles.certValue}>Electronic Signature ({signatureData.method})</Text>
              </View>
            </>
          )}
        </View>

        <Text style={styles.timelineHeader}>Append-Only Audit Log</Text>
        <View style={styles.timelineTable}>
          <View style={styles.timelineRowHeader}>
            <Text style={styles.timelineColTime}>Timestamp (UTC)</Text>
            <Text style={styles.timelineColEvent}>Activity Logged</Text>
            <Text style={styles.timelineColIp}>IP Address</Text>
          </View>
          {(contract.auditTrail || []).map((log, idx) => (
            <View key={idx} style={styles.timelineRow}>
              <Text style={styles.timelineColTime}>
                {new Date(log.timestamp?.toDate ? log.timestamp.toDate() : log.timestamp).toISOString().replace("T", " ").substring(0, 19)}
              </Text>
              <Text style={styles.timelineColEvent}>
                {log.event} ({log.userEmail || log.browser || "System"})
              </Text>
              <Text style={styles.timelineColIp}>{log.ip || "—"}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
