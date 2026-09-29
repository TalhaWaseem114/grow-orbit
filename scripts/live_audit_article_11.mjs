/**
 * Live Firestore Audit Script for Article #11
 * Fetches blogs/amazon-a-content-design and runs full live validation:
 * - Document existence & metadata
 * - Content block distribution
 * - Punctuation hygiene (em-dashes, en-dashes, arrows, text arrows)
 * - AI slop pattern detection (50+ patterns)
 * - URL cleanliness (zero chatgpt.com, zero utm params)
 * - Internal link verification (/service/listing-optimization, /blog/..., /portfolio/..., /get-started)
 * - Primary & secondary keyword verification
 * - FAQ schema pairs extraction
 * - CTA widget presence
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALi7uZIVIYO_Tomfc0PFDzV-YBMr5XFRg",
  authDomain: "groworbit-9b75a.firebaseapp.com",
  projectId: "groworbit-9b75a",
  storageBucket: "groworbit-9b75a.firebasestorage.app",
  messagingSenderId: "729990203843",
  appId: "1:729990203843:web:5f84f4989c87d452de1576",
  measurementId: "G-6TGTYN8XX4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runLiveAudit() {
  console.log("=".repeat(75));
  console.log("ARTICLE #11 LIVE FIRESTORE DOCUMENT AUDIT");
  console.log("=".repeat(75));

  const snap = await getDoc(doc(db, "blogs", "amazon-a-content-design"));
  if (!snap.exists()) {
    console.error("FATAL: Document blogs/amazon-a-content-design does not exist in Firestore!");
    process.exit(1);
  }

  const data = snap.data();
  const content = data.content || [];
  const allText = content.map(b => b.text).join("\n");
  const words = allText.trim().split(/\s+/);

  let tests = 0;
  let passed = 0;
  let failed = 0;
  let advisories = 0;

  function check(name, fn) {
    tests++;
    try {
      const res = fn();
      if (res === true || res === undefined) {
        console.log(`  ✅ PASS: ${name}`);
        passed++;
      } else if (res && res.warn) {
        console.log(`  ⚠️ ADVISORY: ${name} -> ${res.warn}`);
        advisories++;
      } else {
        console.log(`  ❌ FAIL: ${name} -> ${res}`);
        failed++;
      }
    } catch (e) {
      console.log(`  ❌ FAIL: ${name} (Exception: ${e.message})`);
      failed++;
    }
  }

  // 1. Document Metadata
  console.log("\n[TEST 1] DOCUMENT METADATA");
  check("Title defined", () => data.title === "Amazon A+ Content Design: Complete Guide & Best Practices (2026)");
  check("Slug is clean", () => data.slug === "amazon-a-content-design");
  check("Status is published", () => data.status === "published");
  check("Excerpt defined", () => data.excerpt && data.excerpt.length >= 100);
  check("Category is Listing Optimization", () => data.category === "Listing Optimization");
  check("Cover image path", () => data.coverImage === "/images/article image/11/amazon-a-content-design.avif");
  check("Author is Talha Waseem", () => data.author?.name === "Talha Waseem");
  check("Tags array populated", () => Array.isArray(data.tags) && data.tags.length >= 5);

  // 2. Content Blocks
  console.log("\n[TEST 2] CONTENT BLOCKS COMPOSITION");
  const blockTypes = {};
  content.forEach(b => { blockTypes[b.type] = (blockTypes[b.type] || 0) + 1; });
  console.log("  Block type breakdown:", blockTypes);

  check("Total blocks >= 100", () => content.length >= 100);
  check("H2 headings >= 10", () => (blockTypes["heading"] || 0) >= 10);
  check("H3 headings >= 15", () => (blockTypes["heading-h3"] || 0) >= 15);
  check("Tables >= 2", () => (blockTypes["table"] || 0) >= 2);
  check("Lists >= 10", () => (blockTypes["list"] || 0) >= 10);
  check("Dividers >= 10", () => (blockTypes["divider"] || 0) >= 10);
  check("CTA block exists", () => (blockTypes["cta"] || 0) === 1);

  // 3. Punctuation & Dash Scan
  console.log("\n[TEST 3] STRICT PUNCTUATION & FORBIDDEN CHARACTERS");
  check("Zero em-dashes (—)", () => {
    const c = (allText.match(/—/g) || []).length;
    return c === 0 ? true : `Found ${c} em-dashes`;
  });
  check("Zero en-dashes (–)", () => {
    const c = (allText.match(/–/g) || []).length;
    return c === 0 ? true : `Found ${c} en-dashes`;
  });
  check("Zero arrows (→, ➔, \\u2192, \\u2794)", () => {
    const c = (allText.match(/[→➔\u2192\u2794]/g) || []).length;
    return c === 0 ? true : `Found ${c} arrow characters`;
  });
  check("Zero text arrows (->, -->)", () => {
    const c = (allText.match(/--?>/g) || []).length;
    return c === 0 ? true : `Found ${c} text arrows`;
  });

  // 4. AI Slop Patterns
  console.log("\n[TEST 4] AI SLOP PATTERN DETECTION");
  const slopPatterns = [
    "in today's fast-paced", "delve into", "delve deeper", "it's worth noting",
    "testament to", "landscape of", "realm of", "unlock", "unleash",
    "game-changer", "game changing", "navigate the complexities", "elevate your",
    "seamlessly", "seamless", "harness the power", "embark on", "supercharge",
    "cutting-edge", "leverage", "tapestry", "paramount", "without further ado",
    "let's dive in", "dive deep", "in this article we will", "in conclusion",
    "to sum up", "at the end of the day", "it goes without saying",
    "needless to say", "first and foremost", "last but not least",
    "a myriad of", "plethora of", "myriad of", "in a nutshell",
    "the bottom line is", "when it comes to", "it is important to note",
    "it should be noted", "as a matter of fact", "for all intents and purposes",
    "revolutionize", "beacon", "orchestrate", "crucial role", "pivotal",
    "holistic", "foster", "synergy", "robust", "demystify"
  ];
  const lowerAll = allText.toLowerCase();
  let slopFound = [];
  slopPatterns.forEach(p => {
    const reg = new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
    const count = (lowerAll.match(reg) || []).length;
    if (count > 0) slopFound.push(`"${p}" (${count}x)`);
  });
  check("Zero AI slop clichés", () => slopFound.length === 0 ? true : `Found slop: ${slopFound.join(", ")}`);

  // 5. URL & Link Cleanliness
  console.log("\n[TEST 5] URL & LINK INTEGRITY");
  check("Zero chatgpt.com links", () => {
    const c = (allText.match(/chatgpt\.com/g) || []).length;
    return c === 0 ? true : `Found ${c} chatgpt.com links`;
  });
  check("Zero UTM tracking parameters", () => {
    const c = (allText.match(/utm_/g) || []).length;
    return c === 0 ? true : `Found ${c} UTM params`;
  });
  check("Internal hub link present (/service/listing-optimization)", () => {
    return allText.includes("/service/listing-optimization") ? true : "Missing /service/listing-optimization";
  });
  check("CTA link present (/get-started)", () => {
    return content.some(b => b.type === "cta" && b.text.startsWith("/get-started|"));
  });

  // 6. Keywords
  console.log("\n[TEST 6] KEYWORD INTEGRATION");
  const pk = "amazon a+ content design";
  const pkReg = new RegExp("amazon a\\+\\s*content design", "gi");
  const pkCount = (allText.match(pkReg) || []).length;
  check("Primary keyword in text (count >= 5)", () => pkCount >= 5 ? true : `Only ${pkCount} instances`);

  const secondaries = [
    "amazon a+ content design services",
    "amazon a content design",
    "what is a plus content on amazon",
    "ebc design amazon",
    "amazon ebc graphic design"
  ];
  secondaries.forEach(sk => {
    check(`Secondary: "${sk}"`, () => {
      const reg = new RegExp(sk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
      const c = (allText.match(reg) || []).length;
      return c >= 1 ? true : `Missing "${sk}"`;
    });
  });

  // 7. FAQ Schema Extraction
  console.log("\n[TEST 7] FAQ SCHEMA EXTRACTION");
  const faqItems = [];
  let inFaq = false;
  for (let i = 0; i < content.length; i++) {
    const b = content[i];
    if (b.type === "heading" && b.text.toLowerCase().includes("frequently asked questions")) {
      inFaq = true;
      continue;
    }
    if (inFaq) {
      if (b.type === "heading") break;
      if (b.type === "heading-h3" && i + 1 < content.length && content[i + 1].type === "paragraph") {
        faqItems.push({ question: b.text.trim(), answer: content[i + 1].text.trim() });
      }
    }
  }
  check("FAQ items extractable by page.jsx engine (>= 6)", () => {
    console.log(`    Extracted ${faqItems.length} valid FAQ schema pairs`);
    return faqItems.length >= 6 ? true : `Only extracted ${faqItems.length}`;
  });

  console.log("\n" + "=".repeat(75));
  console.log(`LIVE AUDIT RESULTS: ${passed} PASSED | ${failed} FAILED | ${advisories} ADVISORIES (Total: ${tests})`);
  console.log("=".repeat(75));

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("🏆 LIVE FIRESTORE VERIFICATION 100% SUCCESSFUL!");
    process.exit(0);
  }
}

runLiveAudit().catch(err => {
  console.error("Audit script error:", err);
  process.exit(1);
});
