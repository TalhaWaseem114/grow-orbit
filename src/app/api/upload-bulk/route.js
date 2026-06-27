import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "public", "newUpload");
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ error: `Directory ${dirPath} does not exist.` });
    }

    const files = fs.readdirSync(dirPath);
    const results = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "grow_orbit_portfolio/assets/portfolio/graffixx",
          use_filename: true,
          unique_filename: false,
          resource_type: "image"
        });
        results.push({
          file: file,
          cloudinaryUrl: result.secure_url
        });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
