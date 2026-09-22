/**
 * Add CTA book widget to Article #9 in Firebase Firestore
 * Run: node scripts/add_cta_article_9.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALi7uZIVIYO_Tomfc0PFDzV-YBMr5XFRg",
  authDomain: "groworbit-9b75a.firebaseapp.com",
  projectId: "groworbit-9b75a",
  storageBucket: "groworbit-9b75a.firebasestorage.app",
  messagingSenderId: "729990203843",
  appId: "1:729990203843:web:5f84f4989c87d452de1576",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CTA_BLOCK = {
  type: "cta",
  text: "/get-started|📅 BOOK A FREE 1-ON-1 STRATEGY MEETING|Want to audit your Amazon infographic design, reduce feature clutter, and build a cleaner image gallery? Book a free 30-minute creative growth session with our Amazon listing team.",
};

async function addCta() {
  try {
    const postId = "amazon-product-infographic-design";
    const postRef = doc(db, "blogs", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      console.error("Article not found!");
      process.exit(1);
    }

    const data = postSnap.data();
    const content = data.content || [];

    // Check if CTA already exists
    const hasCta = content.some((b) => b.type === "cta");
    if (hasCta) {
      console.log("CTA block already exists. Skipping.");
      process.exit(0);
    }

    // Insert CTA before the "Final Takeaway" section (near the end, before the last few blocks)
    // Find the "Final Takeaway" heading
    let insertIndex = -1;
    for (let i = 0; i < content.length; i++) {
      if (content[i].type === "heading" && content[i].text === "Final Takeaway") {
        insertIndex = i;
        break;
      }
    }

    if (insertIndex === -1) {
      // Fallback: insert before the last divider
      insertIndex = content.length - 5;
    }

    // Insert CTA block
    content.splice(insertIndex, 0, CTA_BLOCK);

    await updateDoc(postRef, { content });

    console.log(`CTA book widget added to Article #9 at position ${insertIndex}`);
    console.log("Live URL: https://www.groworbitofficial.com/blog/amazon-product-infographic-design");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
}

addCta();
