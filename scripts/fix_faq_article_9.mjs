/**
 * Fix FAQ Schema - Convert bold paragraph FAQ questions to heading-h3 + paragraph pairs
 * so the blog renderer's FAQPage JSON-LD schema parser picks them up.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyALi7uZIVIYO_Tomfc0PFDzV-YBMr5XFRg",
  authDomain: "groworbit-9b75a.firebaseapp.com",
  projectId: "groworbit-9b75a",
});
const db = getFirestore(app);

async function fix() {
  const postRef = doc(db, "blogs", "amazon-product-infographic-design");
  const snap = await getDoc(postRef);
  if (!snap.exists()) { console.error("NOT FOUND"); process.exit(1); }

  const data = snap.data();
  const content = [...data.content];

  // Find the FAQ section
  let inFaq = false;
  let changes = 0;

  for (let i = 0; i < content.length; i++) {
    const b = content[i];

    // Detect start of FAQ section
    if (b.type === "heading" && b.text.toLowerCase().includes("frequently asked questions")) {
      inFaq = true;
      console.log(`Found FAQ section at index ${i}`);
      continue;
    }

    // Stop at next H2
    if (inFaq && b.type === "heading") {
      console.log(`FAQ section ends at index ${i}`);
      break;
    }

    // Convert bold paragraph questions to heading-h3
    if (inFaq && b.type === "paragraph" && b.text.startsWith("**") && b.text.endsWith("**")) {
      const questionText = b.text.replace(/^\*\*/, "").replace(/\*\*$/, "");
      console.log(`  Converting to H3: "${questionText}"`);
      content[i] = { type: "heading-h3", text: questionText };
      changes++;
    }
  }

  if (changes === 0) {
    console.log("No FAQ questions found to convert. Already fixed or different format.");
    process.exit(0);
  }

  await updateDoc(postRef, { content });
  console.log(`\n✅ Fixed ${changes} FAQ questions from bold paragraphs to heading-h3`);
  console.log("Google FAQPage schema will now parse correctly.");
  process.exit(0);
}

fix();
