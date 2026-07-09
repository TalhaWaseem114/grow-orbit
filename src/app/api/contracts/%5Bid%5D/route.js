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

export async function PATCH(request, context) {
  try {
    const adminUser = await verifyAdmin(request);
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const contractRef = adminDb.collection("contracts").doc(id);
    const contractSnap = await contractRef.get();

    if (!contractSnap.exists) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const contractData = contractSnap.data();

    // STRICT IMMUTABILITY check
    if (contractData.status === "signed" || contractData.status === "void" || contractData.status === "completed") {
      return NextResponse.json({ success: false, error: "Locked: Cannot modify signed or voided contracts" }, { status: 400 });
    }

    const {
      clientName,
      companyName,
      clientEmail,
      clientPhone,
      requestedService,
      monthlyRetainer,
      termLength,
      paymentTerms,
      contractDate,
      startDate,
      endDate,
      notes,
      templateBody,
      expirationDays,
      customExpirationDate,
      status // Staff might move to "awaiting_review"
    } = body;

    // Calculate expiration date
    let expiresAt = contractData.expiresAt || null;
    if (expirationDays) {
      if (expirationDays === "none") {
        expiresAt = null;
      } else if (expirationDays !== "custom") {
        const days = parseInt(expirationDays, 10);
        const date = new Date();
        date.setDate(date.getDate() + days);
        expiresAt = date;
      } else if (expirationDays === "custom" && customExpirationDate) {
        expiresAt = new Date(customExpirationDate);
      }
    }

    const contentFields = {
      clientName: clientName !== undefined ? clientName : (contractData.clientName || ""),
      companyName: companyName !== undefined ? companyName : (contractData.companyName || ""),
      clientEmail: clientEmail !== undefined ? clientEmail : (contractData.clientEmail || ""),
      clientPhone: clientPhone !== undefined ? clientPhone : (contractData.clientPhone || ""),
      requestedService: requestedService !== undefined ? requestedService : (contractData.requestedService || ""),
      monthlyRetainer: monthlyRetainer !== undefined ? Number(monthlyRetainer) : (contractData.monthlyRetainer || 0),
      termLength: termLength !== undefined ? termLength : (contractData.termLength || "Month-to-month"),
      paymentTerms: paymentTerms !== undefined ? paymentTerms : (contractData.paymentTerms || "Net 15"),
      contractDate: contractDate ? new Date(contractDate) : (contractData.contractDate ? contractData.contractDate.toDate() : new Date()),
      startDate: startDate ? new Date(startDate) : (contractData.startDate ? contractData.startDate.toDate() : new Date()),
      endDate: endDate ? new Date(endDate) : (contractData.endDate ? contractData.endDate.toDate() : null),
      notes: notes !== undefined ? notes : (contractData.notes || ""),
      templateBody: templateBody !== undefined ? templateBody : (contractData.templateBody || "")
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    // Update main contract
    const updateData = {
      ...contentFields,
      expiresAt,
      updatedAt: new Date()
    };

    if (status && ["draft", "awaiting_review"].includes(status)) {
      updateData.status = status;
    }

    // Append auto-save or edited event to timeline
    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const editLog = {
      event: body.isAutoSave ? "Auto Saved" : "Edited",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: adminUser.email || "System",
      os: "",
      browser: "",
      meta: { version: contractData.currentVersion }
    };

    // Update main contract with edit log
    await contractRef.update({
      ...updateData,
      auditTrail: [...(contractData.auditTrail || []), editLog]
    });

    // Overwrite the current active version document
    const currentVersionStr = String(contractData.currentVersion);
    const versionData = {
      versionNumber: contractData.currentVersion,
      content: contentFields,
      renderedHtml,
      updatedAt: new Date(),
      createdBy: adminUser.uid || adminUser.id || "system",
      createdByName: adminUser.fullName || adminUser.displayName || "Admin"
    };

    await contractRef.collection("versions").doc(currentVersionStr).set(versionData);

    return NextResponse.json({
      success: true,
      contract: { id, ...contractData, ...updateData }
    });
  } catch (error) {
    console.error("PATCH contract error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}

export async function DELETE(request, context) {
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

    // Verify draft status before deleting
    if (contractData.status !== "draft") {
      return NextResponse.json({ success: false, error: "Cannot delete non-draft contracts" }, { status: 400 });
    }

    // Delete version subcollection first
    const versionsSnapshot = await contractRef.collection("versions").get();
    const batch = adminDb.batch();
    versionsSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Delete main document
    await contractRef.delete();

    return NextResponse.json({ success: true, message: "Contract deleted successfully" });
  } catch (error) {
    console.error("DELETE contract error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}
