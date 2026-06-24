import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { adminAuth, adminDb } from "@/firebase/firebaseAdmin";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }
    const token = authHeader.substring(7);
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      const userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
      if (!userSnap.exists || userSnap.data()?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
      }
    } catch (authErr) {
      console.error("Auth verification failed in upload-image:", authErr.message);
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "grow_orbit_newsletter",
      resource_type: "auto"
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
