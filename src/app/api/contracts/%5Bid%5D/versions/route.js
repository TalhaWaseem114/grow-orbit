import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/firebase/firebaseAdmin";

async function verifyAdmin(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing token");
  }
  const token = authHeader.substring(7);
  const decodedToken = await adminAuth.verifyIdToken(token);
  const userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
  
  if (!userSnap.exists || userSnap.data()?.role !== "admin") {
    throw new Error("Forbidden: Admins only");
  }
  return userSnap.data();
}

function compileContractBody(body, content) {
  let text = body || "";
  
  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const replacements = {
    "{{client_name}}": content.clientName || "—",
    "{{company_name}}": content.companyName || "—",
    "{{client_email}}": content.clientEmail || "—",
    "{{client_phone}}": content.clientPhone || "—",
    "{{requested_service}}": content.requestedService || "—",
    "{{monthly_retainer}}": content.monthlyRetainer ? `$${content.monthlyRetainer}` : "—",
    "{{term_length}}": content.termLength || "—",
    "{{payment_terms}}": content.paymentTerms || "—",
    "{{contract_date}}": formatDate(content.contractDate),
    "{{start_date}}": formatDate(content.startDate),
    "{{end_date}}": formatDate(content.endDate),
  };

  Object.entries(replacements).forEach(([placeholder, value]) => {
    text = text.split(placeholder).join(value);
  });

  return text;
}

export async function GET(request, context) {
  try {
    const adminUser = await verifyAdmin(request);
    const params = await context.params;
    const { id } = params;

    const contractRef = adminDb.collection("contracts").doc(id);
    const snapshot = await contractRef.collection("versions").orderBy("versionNumber", "asc").get();
    
    const versions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate() || doc.data().updatedAt,
    }));

    return NextResponse.json({ success: true, versions });
  } catch (error) {
    console.error("GET versions error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}

// POST creates a new immutable version
export async function POST(request, context) {
  try {
    const adminUser = await verifyAdmin(request);
    const params = await context.params;
    const { id } = params;

    const contractRef = adminDb.collection("contracts").doc(id);
    const contractSnap = await contractRef.get();

    if (!contractSnap.exists) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const contractData = contractSnap.data();

    // Block changes on signed/voided
    if (contractData.status === "signed" || contractData.status === "void" || contractData.status === "completed") {
      return NextResponse.json({ success: false, error: "Locked: Cannot create version on finalized contract" }, { status: 400 });
    }

    const nextVersion = (contractData.currentVersion || 1) + 1;

    const contentFields = {
      clientName: contractData.clientName || "",
      companyName: contractData.companyName || "",
      clientEmail: contractData.clientEmail || "",
      clientPhone: contractData.clientPhone || "",
      requestedService: contractData.requestedService || "",
      monthlyRetainer: Number(contractData.monthlyRetainer) || 0,
      termLength: contractData.termLength || "Month-to-month",
      paymentTerms: contractData.paymentTerms || "Net 15",
      contractDate: contractData.contractDate ? contractData.contractDate.toDate() : new Date(),
      startDate: contractData.startDate ? contractData.startDate.toDate() : new Date(),
      endDate: contractData.endDate ? contractData.endDate.toDate() : null,
      notes: contractData.notes || "",
      templateBody: contractData.templateBody || ""
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const versionData = {
      versionNumber: nextVersion,
      content: contentFields,
      renderedHtml,
      createdAt: new Date(),
      createdBy: adminUser.uid || adminUser.id || "system",
      createdByName: adminUser.fullName || adminUser.displayName || "Admin"
    };

    // Save version sub-document (will be immutable under rules)
    await contractRef.collection("versions").doc(String(nextVersion)).set(versionData);

    // Update main contract version counter
    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const versionLog = {
      event: `Created Version ${nextVersion}`,
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: adminUser.email || "System",
      os: "",
      browser: "",
      meta: { version: nextVersion }
    };

    await contractRef.update({
      currentVersion: nextVersion,
      updatedAt: new Date(),
      auditTrail: [...(contractData.auditTrail || []), versionLog]
    });

    return NextResponse.json({
      success: true,
      currentVersion: nextVersion,
      version: versionData
    });
  } catch (error) {
    console.error("POST version error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}
