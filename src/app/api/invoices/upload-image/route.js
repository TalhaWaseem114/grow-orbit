import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdmin } from "@/utils/dbHelper";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (authErr) {
      console.error("Auth verification failed in invoice upload-image:", authErr.message);
      return NextResponse.json({ success: false, error: "Unauthorized: " + authErr.message }, { status: 401 });
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64 buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const base64String = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary under grow_orbit_invoices folder
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "grow_orbit_invoices",
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Error uploading invoice product image to Cloudinary:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}
