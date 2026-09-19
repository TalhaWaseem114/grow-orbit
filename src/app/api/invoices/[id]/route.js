import { NextResponse } from "next/server";
import { verifyAdmin, getDocData, updateDocData, deleteDocData } from "@/utils/dbHelper";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts Cloudinary public_id from item or URL
 */
function getCloudinaryPublicId(target) {
  if (!target) return null;

  // Direct publicId property
  if (typeof target.imagePublicId === "string" && target.imagePublicId.trim()) {
    return target.imagePublicId.trim();
  }

  // Check URL string
  const url = typeof target === "string" ? target : target.image;
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) {
    return null;
  }

  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;
    let path = url.substring(uploadIndex + "/upload/".length);

    // Strip version prefix if present (e.g. v172345678/ or transformation tags)
    path = path.replace(/^v\d+\//, "");
    if (path.includes("/v")) {
      const vMatch = path.match(/\/v\d+\/(.+)$/);
      if (vMatch) path = vMatch[1];
    }

    // Strip query parameters
    path = path.split("?")[0];

    // Strip file extension
    const lastDot = path.lastIndexOf(".");
    if (lastDot !== -1) {
      path = path.substring(0, lastDot);
    }
    return path;
  } catch (err) {
    console.error("Error extracting Cloudinary public ID:", err);
    return null;
  }
}

export async function GET(request, context) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error("GET single invoice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    // If items are being updated, clean up old Cloudinary images that were removed or replaced
    if (Array.isArray(body.items)) {
      const newPids = new Set();
      body.items.forEach(it => {
        const pid = getCloudinaryPublicId(it);
        if (pid) newPids.add(pid);
      });

      if (Array.isArray(invoice.items)) {
        invoice.items.forEach(oldItem => {
          const oldPid = getCloudinaryPublicId(oldItem);
          if (oldPid && !newPids.has(oldPid)) {
            console.log(`[Cloudinary] Cleaning up removed image ${oldPid} during invoice update`);
            cloudinary.uploader.destroy(oldPid).catch(err => {
              console.warn(`[Cloudinary] Error destroying removed image ${oldPid}:`, err.message);
            });
          }
        });
      }
    }

    const now = new Date();
    const updateData = {
      ...body,
      updatedAt: now.toISOString()
    };

    if (Array.isArray(body.items)) {
      updateData.items = body.items.map(it => ({
        name: it.name || "",
        description: it.description || "",
        quantity: Number(it.quantity) || 1,
        price: Number(it.price) || 0,
        sku: it.sku || "",
        image: it.image || "",
        imagePublicId: it.imagePublicId || "",
        specifications: it.specifications || ""
      }));
    }

    // Clean data (prevent overwriting system generated fields if not needed)
    delete updateData.id;
    delete updateData.createdAt;

    await updateDocData("invoices", id, updateData);

    return NextResponse.json({ success: true, invoice: { ...invoice, ...updateData } });
  } catch (error) {
    console.error("PATCH invoice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    // Collect all Cloudinary public IDs to delete
    const publicIdsToDelete = new Set();

    if (Array.isArray(invoice.items)) {
      invoice.items.forEach(item => {
        const pid = getCloudinaryPublicId(item);
        if (pid) publicIdsToDelete.add(pid);
      });
    }

    // Also check if invoice itself contains top-level image/publicId
    const invoiceTopPid = getCloudinaryPublicId(invoice);
    if (invoiceTopPid) publicIdsToDelete.add(invoiceTopPid);

    // Destroy images from Cloudinary
    if (publicIdsToDelete.size > 0) {
      console.log(`[Cloudinary] Deleting ${publicIdsToDelete.size} image(s) for invoice ${id}:`, Array.from(publicIdsToDelete));
      const destroyPromises = Array.from(publicIdsToDelete).map(pid =>
        cloudinary.uploader.destroy(pid).catch(cloudErr => {
          console.error(`[Cloudinary] Failed to delete image ${pid}:`, cloudErr);
        })
      );
      await Promise.all(destroyPromises);
    }

    await deleteDocData("invoices", id);

    return NextResponse.json({
      success: true,
      message: `Invoice deleted and ${publicIdsToDelete.size} Cloudinary image(s) removed successfully.`
    });
  } catch (error) {
    console.error("DELETE invoice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
