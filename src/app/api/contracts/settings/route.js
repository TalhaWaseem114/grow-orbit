import { NextResponse } from "next/server";
import { getDocData, setDocData } from "@/utils/dbHelper";
import { DEFAULT_CLAUSES } from "@/utils/contractHelper";

export async function GET() {
  try {
    const settingsDoc = await getDocData("settings", "contractDefaults");
    
    if (settingsDoc && Array.isArray(settingsDoc.clauses) && settingsDoc.clauses.length > 0) {
      return NextResponse.json({
        success: true,
        clauses: settingsDoc.clauses,
        updatedAt: settingsDoc.updatedAt || null,
        updatedBy: settingsDoc.updatedBy || null,
        isCustomDefault: true
      });
    }

    // If not in Firebase yet, return the default fallback clauses
    return NextResponse.json({
      success: true,
      clauses: DEFAULT_CLAUSES,
      isCustomDefault: false
    });
  } catch (error) {
    console.error("GET contract defaults settings error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      clauses: DEFAULT_CLAUSES
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { clauses } = body;

    if (!Array.isArray(clauses) || clauses.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Clauses must be a non-empty array"
      }, { status: 400 });
    }

    const cleanClauses = clauses.map((c, i) => ({
      id: c.id || `clause-${i + 1}-${Date.now()}`,
      title: (c.title || `Clause ${i + 1}`).trim(),
      text: (c.text || "").trim()
    }));

    const settingsData = {
      clauses: cleanClauses,
      updatedAt: new Date(),
      updatedBy: "Admin"
    };

    await setDocData("settings", "contractDefaults", settingsData);

    return NextResponse.json({
      success: true,
      message: "Default terms & conditions saved successfully to Firebase.",
      clauses: cleanClauses
    });
  } catch (error) {
    console.error("PUT contract defaults settings error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
