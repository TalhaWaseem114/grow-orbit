import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = __filename;
    // We also want to delete the directory if it's empty, but let's just delete the file first
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
