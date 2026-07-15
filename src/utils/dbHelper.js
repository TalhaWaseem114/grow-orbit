import { db as clientDb } from "@/firebase/firebaseConfig";
import { 
  doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, getDocs, 
  collection, query, where, runTransaction, orderBy, limit
} from "firebase/firestore";

let isAdminOperational = null;

export async function checkAdminOperational() {

  if (isAdminOperational !== null) return isAdminOperational;

  try {
    // Dynamically import to catch module-level init failures (e.g., ESM/CJS issues on Vercel)
    const { adminDb: db } = await import("@/firebase/firebaseAdmin");
    await db.collection("_ping").limit(1).get();
    isAdminOperational = true;
    console.log("[dbHelper] firebase-admin is operational");
  } catch (err) {
    console.warn("[dbHelper] firebase-admin unavailable, using client SDK fallback:", err.message);
    isAdminOperational = false;
  }
  return isAdminOperational;
}


export async function verifyAdmin(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing token");
  }
  const token = authHeader.substring(7);

  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    try {
      const { adminDb, adminAuth } = await import("@/firebase/firebaseAdmin");
      const decodedToken = await adminAuth.verifyIdToken(token);
      const userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
      if (!userSnap.exists || userSnap.data()?.role !== "admin") {
        throw new Error("Forbidden: Admins only");
      }
      return { uid: decodedToken.uid, email: decodedToken.email, ...userSnap.data() };
    } catch (err) {
      if (err.message.includes("credential") || err.message.includes("key") || err.message.includes("default")) {
        return fallbackJwtVerify(token);
      }
      throw err;
    }
  } else {
    return fallbackJwtVerify(token);
  }
}

async function fallbackJwtVerify(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid token format");

    // Base64url → Base64 → JSON (Firebase JWTs use base64url, add padding)
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
    const payloadJson = Buffer.from(padded, "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    // Firebase ID tokens use `sub` as the UID. Some also include `user_id`.
    const uid = payload.sub || payload.user_id || payload.uid;
    if (!uid) throw new Error("Could not extract UID from token");

    const userDocRef = doc(clientDb, "users", uid);
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists() || userSnap.data()?.role?.trim() !== "admin") {
      throw new Error("Forbidden: Admins only");
    }
    return { uid, email: payload.email, ...userSnap.data() };
  } catch (err) {
    throw new Error("Unauthorized: " + err.message);
  }
}

async function getAdminDb() {
  const { adminDb } = await import("@/firebase/firebaseAdmin");
  return adminDb;
}

export async function getDocData(collectionName, docId) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    const snap = await adminDb.collection(collectionName).doc(docId).get();
    return snap.exists ? { id: snap.id, ...snap.data() } : null;
  } else {
    const docRef = doc(clientDb, collectionName, docId);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
}

export async function setDocData(collectionName, docId, data) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    await adminDb.collection(collectionName).doc(docId).set(data);
  } else {
    const docRef = doc(clientDb, collectionName, docId);
    await setDoc(docRef, data);
  }
}

export async function addDocData(collectionName, data) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    const ref = await adminDb.collection(collectionName).add(data);
    return ref.id;
  } else {
    const ref = await addDoc(collection(clientDb, collectionName), data);
    return ref.id;
  }
}

export async function updateDocData(collectionName, docId, data) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    await adminDb.collection(collectionName).doc(docId).update(data);
  } else {
    const docRef = doc(clientDb, collectionName, docId);
    await updateDoc(docRef, data);
  }
}

export async function deleteDocData(collectionName, docId) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    await adminDb.collection(collectionName).doc(docId).delete();
  } else {
    const docRef = doc(clientDb, collectionName, docId);
    await deleteDoc(docRef);
  }
}

export async function queryDocs(collectionName, field, operator, value) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    const snap = await adminDb.collection(collectionName).where(field, operator, value).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } else {
    const q = query(collection(clientDb, collectionName), where(field, operator, value));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

export async function getAllDocs(collectionName) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    const snap = await adminDb.collection(collectionName).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } else {
    const snap = await getDocs(collection(clientDb, collectionName));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

export async function getSubcollectionDocs(parentCollection, parentId, subcollectionName) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    const snap = await adminDb.collection(parentCollection).doc(parentId).collection(subcollectionName).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } else {
    const q = collection(clientDb, parentCollection, parentId, subcollectionName);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

export async function setSubcollectionDoc(parentCollection, parentId, subcollectionName, subDocId, data) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    await adminDb.collection(parentCollection).doc(parentId).collection(subcollectionName).doc(subDocId).set(data);
  } else {
    const docRef = doc(clientDb, parentCollection, parentId, subcollectionName, subDocId);
    await setDoc(docRef, data);
  }
}

export async function getSubcollectionDocData(parentCollection, parentId, subcollectionName, subDocId) {
  const isAdminOk = await checkAdminOperational();
  if (isAdminOk) {
    const adminDb = await getAdminDb();
    const snap = await adminDb.collection(parentCollection).doc(parentId).collection(subcollectionName).doc(subDocId).get();
    return snap.exists ? { id: snap.id, ...snap.data() } : null;
  } else {
    const docRef = doc(clientDb, parentCollection, parentId, subcollectionName, subDocId);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
}

export async function getNextSequenceNumber() {
  const isAdminOk = await checkAdminOperational();
  let seqNum = 1;
  try {
    if (isAdminOk) {
      const adminDb = await getAdminDb();
      const snap = await adminDb.collection("contracts").orderBy("contractNumber", "desc").limit(1).get();
      if (!snap.empty) {
        const latestContract = snap.docs[0].data();
        const numStr = latestContract.contractNumber?.split("-")?.pop();
        const lastNum = parseInt(numStr, 10);
        if (!isNaN(lastNum)) {
          seqNum = lastNum + 1;
        }
      }
    } else {
      const q = query(collection(clientDb, "contracts"), orderBy("contractNumber", "desc"), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const latestContract = snap.docs[0].data();
        const numStr = latestContract.contractNumber?.split("-")?.pop();
        const lastNum = parseInt(numStr, 10);
        if (!isNaN(lastNum)) {
          seqNum = lastNum + 1;
        }
      }
    }
  } catch (error) {
    console.error("Error generating next sequence number:", error);
    // Fallback based on simple timestamp to ensure uniqueness
    seqNum = Math.floor(Date.now() / 1000) % 10000;
  }
  return seqNum;
}

export async function getNextInvoiceSequenceNumber() {
  const isAdminOk = await checkAdminOperational();
  let seqNum = 1;
  try {
    if (isAdminOk) {
      const adminDb = await getAdminDb();
      const snap = await adminDb.collection("invoices").orderBy("invoiceNumber", "desc").limit(1).get();
      if (!snap.empty) {
        const latestInvoice = snap.docs[0].data();
        const numStr = latestInvoice.invoiceNumber?.split("-")?.pop();
        const lastNum = parseInt(numStr, 10);
        if (!isNaN(lastNum)) {
          seqNum = lastNum + 1;
        }
      }
    } else {
      const q = query(collection(clientDb, "invoices"), orderBy("invoiceNumber", "desc"), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const latestInvoice = snap.docs[0].data();
        const numStr = latestInvoice.invoiceNumber?.split("-")?.pop();
        const lastNum = parseInt(numStr, 10);
        if (!isNaN(lastNum)) {
          seqNum = lastNum + 1;
        }
      }
    }
  } catch (error) {
    console.error("Error generating next invoice sequence number:", error);
    seqNum = Math.floor(Date.now() / 1000) % 10000;
  }
  return seqNum;
}

