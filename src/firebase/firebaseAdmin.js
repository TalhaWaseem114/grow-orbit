import admin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

if (!admin.getApps().length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("[FirebaseAdmin] Initialized with Service Account JSON");
    } catch (err) {
      console.error("[FirebaseAdmin] Failed to parse service account JSON, falling back:", err.message);
      admin.initializeApp();
    }
  } else {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
    if (projectId) {
      admin.initializeApp({
        projectId: projectId
      });
      console.log(`[FirebaseAdmin] Initialized with Project ID: ${projectId}`);
    } else {
      admin.initializeApp();
      console.log("[FirebaseAdmin] Initialized with default credentials");
    }
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
export { FieldValue };
export default admin;
