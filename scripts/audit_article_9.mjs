/**
 * Deep Audit Script for Article #9
 * Pulls the live Firestore document and runs every test.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyALi7uZIVIYO_Tomfc0PFDzV-YBMr5XFRg",
  authDomain: "groworbit-9b75a.firebaseapp.com",
  projectId: "groworbit-9b75a",
});
const db = getFirestore(app);

async function audit() {
  const snap = await getDoc(doc(db, "blogs", "amazon-product-infographic-design"));
  if (!snap.exists()) { console.error("NOT FOUND"); process.exit(1); }
  const data = snap.data();
  const content = data.content || [];
  const allText = content.map(b => b.text).join("\n");
  const issues = [];
  let fixesNeeded = [];

  console.log("=".repeat(70));
  console.log("ARTICLE #9 DEEP AUDIT - LIVE FIRESTORE DOCUMENT");
  console.log("=".repeat(70));

  // ── TEST 1: Document Structure ──
  console.log("\n[TEST 1] DOCUMENT STRUCTURE");
  console.log("  Title:", data.title);
  console.log("  Slug:", data.slug);
  console.log("  Status:", data.status);
  console.log("  Category:", data.category);
  console.log("  Date:", data.date);
  console.log("  ReadTime:", data.readTime);
  console.log("  Author:", JSON.stringify(data.author));
  console.log("  Tags:", JSON.stringify(data.tags));
  console.log("  CoverImage:", data.coverImage);
  console.log("  Excerpt:", data.excerpt);
  console.log("  Content blocks:", content.length);

  if (!data.title) issues.push("CRITICAL: Missing title");
  if (!data.slug) issues.push("CRITICAL: Missing slug");
  if (!data.excerpt) issues.push("CRITICAL: Missing excerpt/meta description");
  if (data.status !== "published") issues.push("CRITICAL: Status is not 'published'");
  if (!data.coverImage) issues.push("WARNING: Missing cover image");
  if (!data.author?.name) issues.push("WARNING: Missing author name");
  if (!data.tags || data.tags.length === 0) issues.push("WARNING: No tags");
  if (!data.date) issues.push("WARNING: Missing date");
  console.log("  ✅ Structure check complete");

  // ── TEST 2: Content Block Types Distribution ──
  console.log("\n[TEST 2] CONTENT BLOCK DISTRIBUTION");
  const typeCounts = {};
  content.forEach(b => { typeCounts[b.type] = (typeCounts[b.type] || 0) + 1; });
  Object.entries(typeCounts).sort((a,b) => b[1]-a[1]).forEach(([t,c]) => {
    console.log(`  ${t}: ${c}`);
  });

  if (!typeCounts["heading"]) issues.push("WARNING: No H2 headings found");
  if (!typeCounts["cta"]) issues.push("CRITICAL: No CTA book widget found");
  if (!typeCounts["list"]) issues.push("WARNING: No list blocks found");
  if (!typeCounts["table"]) issues.push("WARNING: No table blocks found");
  if (!typeCounts["divider"]) issues.push("WARNING: No dividers found");
  console.log("  ✅ Distribution check complete");

  // ── TEST 3: Long Dashes / Em-dashes / En-dashes / Arrows ──
  console.log("\n[TEST 3] LONG DASH / ARROW SCAN");
  const emDashes = (allText.match(/—/g) || []).length;
  const enDashes = (allText.match(/–/g) || []).length;
  const arrows = (allText.match(/→/g) || []).length;
  console.log(`  Em-dashes (—): ${emDashes}`);
  console.log(`  En-dashes (–): ${enDashes}`);
  console.log(`  Arrows (→): ${arrows}`);
  if (emDashes > 0) { issues.push(`CRITICAL: ${emDashes} em-dashes found`); fixesNeeded.push("em-dashes"); }
  if (enDashes > 0) { issues.push(`CRITICAL: ${enDashes} en-dashes found`); fixesNeeded.push("en-dashes"); }
  if (arrows > 0) { issues.push(`CRITICAL: ${arrows} arrow chars found`); fixesNeeded.push("arrows"); }
  if (emDashes === 0 && enDashes === 0 && arrows === 0) console.log("  ✅ PASS - Zero forbidden characters");

  // ── TEST 4: AI Slop Patterns ──
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
    "it should be noted", "as a matter of fact", "for all intents and purposes"
  ];
  const lowerText = allText.toLowerCase();
  let slopFound = 0;
  slopPatterns.forEach(p => {
    const count = (lowerText.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi")) || []).length;
    if (count > 0) {
      console.log(`  🔴 "${p}" found ${count}x`);
      issues.push(`AI SLOP: "${p}" found ${count}x`);
      slopFound += count;
    }
  });
  if (slopFound === 0) console.log("  ✅ PASS - Zero AI slop patterns detected");

  // ── TEST 5: Bad URL Scan ──
  console.log("\n[TEST 5] BAD URL SCAN");
  const chatgptUrls = (allText.match(/chatgpt\.com/g) || []).length;
  const utmSource = (allText.match(/utm_source/g) || []).length;
  const brokenHttp = (allText.match(/http:\/\//g) || []).length;
  console.log(`  chatgpt.com references: ${chatgptUrls}`);
  console.log(`  utm_source parameters: ${utmSource}`);
  console.log(`  Insecure http:// links: ${brokenHttp}`);
  if (chatgptUrls > 0) { issues.push(`CRITICAL: ${chatgptUrls} chatgpt.com URLs`); fixesNeeded.push("chatgpt-urls"); }
  if (utmSource > 0) { issues.push(`CRITICAL: ${utmSource} utm_source params`); fixesNeeded.push("utm-params"); }
  if (chatgptUrls === 0 && utmSource === 0) console.log("  ✅ PASS - All URLs clean");

  // ── TEST 6: Internal Links ──
  console.log("\n[TEST 6] INTERNAL LINK CHECK");
  const internalLinkMatches = allText.match(/\[.*?\]\(\/[^)]+\)/g) || [];
  console.log(`  Internal links found: ${internalLinkMatches.length}`);
  internalLinkMatches.forEach(l => console.log(`    ${l}`));
  const hasServiceLink = allText.includes("/service/listing-optimization");
  const hasGetStartedLink = content.some(b => b.type === "cta" && b.text.includes("/get-started"));
  console.log(`  Hub link (/service/listing-optimization): ${hasServiceLink ? "✅" : "🔴 MISSING"}`);
  console.log(`  CTA link (/get-started): ${hasGetStartedLink ? "✅" : "🔴 MISSING"}`);
  if (!hasServiceLink) issues.push("CRITICAL: Missing internal link to /service/listing-optimization");
  if (!hasGetStartedLink) issues.push("CRITICAL: Missing CTA link to /get-started");

  // ── TEST 7: Primary Keyword Placement ──
  console.log("\n[TEST 7] PRIMARY KEYWORD PLACEMENT");
  const pk = "amazon product infographic design";
  const pkVariations = ["amazon product infographic", "infographic design", "amazon infographics", "product infographic"];
  const titleHasPK = data.title.toLowerCase().includes("infographic");
  const excerptHasPK = (data.excerpt || "").toLowerCase().includes("infographic");
  const first200Words = allText.split(/\s+/).slice(0, 200).join(" ").toLowerCase();
  const first200HasPK = first200Words.includes("infographic design") || first200Words.includes("amazon product infographic");
  console.log(`  In title: ${titleHasPK ? "✅" : "🔴"}`);
  console.log(`  In excerpt/meta desc: ${excerptHasPK ? "✅" : "🔴"}`);
  console.log(`  In first 200 words: ${first200HasPK ? "✅" : "🔴"}`);

  // Check secondary keywords
  const secondaryKWs = [
    "clean Amazon product infographic",
    "Amazon product feature infographic mistakes",
    "Amazon infographics",
    "3D rendering infographic callouts"
  ];
  console.log("\n  Secondary keyword check:");
  secondaryKWs.forEach(kw => {
    const found = lowerText.includes(kw.toLowerCase());
    console.log(`    "${kw}": ${found ? "✅" : "🔴 MISSING"}`);
    if (!found) issues.push(`SEO: Secondary keyword "${kw}" not found in body`);
  });

  // ── TEST 8: Heading Hierarchy ──
  console.log("\n[TEST 8] HEADING HIERARCHY");
  const headings = content.filter(b => b.type === "heading" || b.type === "heading-h3" || b.type === "heading-h4");
  console.log(`  Total headings: ${headings.length}`);
  headings.forEach(h => {
    const level = h.type === "heading" ? "H2" : h.type === "heading-h3" ? "H3" : "H4";
    console.log(`    [${level}] ${h.text}`);
  });
  const h2Count = headings.filter(h => h.type === "heading").length;
  console.log(`  H2 count: ${h2Count}`);
  if (h2Count < 3) issues.push("SEO: Fewer than 3 H2 headings");

  // ── TEST 9: FAQ Schema Readiness ──
  console.log("\n[TEST 9] FAQ SCHEMA READINESS");
  // The blog renderer parses FAQ from heading-h3 + paragraph pairs after "Frequently Asked Questions" heading
  let faqSection = false;
  let faqPairs = 0;
  for (let i = 0; i < content.length; i++) {
    const b = content[i];
    if (b.type === "heading" && b.text.toLowerCase().includes("frequently asked questions")) {
      faqSection = true;
      continue;
    }
    if (faqSection && b.type === "heading") break;
    if (faqSection && b.type === "paragraph" && b.text.startsWith("**") && b.text.endsWith("**")) {
      // Bold question, next paragraph should be answer
      faqPairs++;
    }
  }
  console.log(`  FAQ section found: ${faqSection ? "✅" : "🔴"}`);
  console.log(`  FAQ Q&A pairs detected: ${faqPairs}`);
  
  // Check if the FAQ format works with the blog renderer's parsing
  // The renderer looks for heading-h3 + paragraph pairs
  let faqH3Count = 0;
  let inFaqSection = false;
  for (let i = 0; i < content.length; i++) {
    if (content[i].type === "heading" && content[i].text.toLowerCase().includes("frequently asked questions")) {
      inFaqSection = true;
      continue;
    }
    if (inFaqSection && content[i].type === "heading") break;
    if (inFaqSection && content[i].type === "heading-h3") faqH3Count++;
  }
  console.log(`  FAQ H3 sub-headings (for schema): ${faqH3Count}`);
  
  if (!faqSection) issues.push("SEO: No FAQ section found");
  if (faqH3Count === 0 && faqPairs > 0) {
    issues.push("SCHEMA FIX NEEDED: FAQ questions are bold paragraphs, not H3 headings. Google FAQPage schema parser expects heading-h3 + paragraph pairs.");
    fixesNeeded.push("faq-schema");
  }

  // ── TEST 10: Word Count ──
  console.log("\n[TEST 10] WORD COUNT");
  const wordCount = allText.split(/\s+/).filter(Boolean).length;
  console.log(`  Total words: ${wordCount}`);
  if (wordCount < 1200) issues.push("WARNING: Below target word count (1200-1500)");
  if (wordCount > 3500) issues.push("INFO: Article exceeds 3500 words - very comprehensive");
  console.log(`  Target range: 1,200-1,500 | Actual: ${wordCount}`);

  // ── TEST 11: Empty/Malformed Blocks ──
  console.log("\n[TEST 11] EMPTY/MALFORMED BLOCK CHECK");
  let emptyBlocks = 0;
  content.forEach((b, i) => {
    if (b.type !== "divider" && (!b.text || b.text.trim() === "")) {
      console.log(`  🔴 Empty block at index ${i}: type="${b.type}"`);
      emptyBlocks++;
    }
  });
  if (emptyBlocks === 0) console.log("  ✅ PASS - No empty blocks");
  else issues.push(`WARNING: ${emptyBlocks} empty content blocks found`);

  // ── TEST 12: CTA Block Validation ──
  console.log("\n[TEST 12] CTA BOOK WIDGET VALIDATION");
  const ctaBlocks = content.filter(b => b.type === "cta");
  console.log(`  CTA blocks found: ${ctaBlocks.length}`);
  ctaBlocks.forEach((cta, idx) => {
    const parts = cta.text.split("|");
    console.log(`  CTA #${idx + 1}:`);
    console.log(`    URL: ${parts[0]}`);
    console.log(`    Button text: ${parts[1]}`);
    console.log(`    Hook text: ${parts[2] || "(none)"}`);
    if (!parts[0].startsWith("/")) issues.push("CTA: URL should be relative path");
    if (parts.length < 3) issues.push("CTA: Missing hook text");
  });
  if (ctaBlocks.length === 0) issues.push("CRITICAL: No CTA book widget");

  // ── TEST 13: Duplicate/Consecutive Block Check ──
  console.log("\n[TEST 13] CONSECUTIVE DUPLICATE CHECK");
  let duplicateCount = 0;
  for (let i = 1; i < content.length; i++) {
    if (content[i].text === content[i-1].text && content[i].type === content[i-1].type && content[i].type !== "divider") {
      console.log(`  🔴 Duplicate at index ${i}: "${content[i].text.substring(0, 60)}..."`);
      duplicateCount++;
    }
  }
  if (duplicateCount === 0) console.log("  ✅ PASS - No consecutive duplicates");

  // ── TEST 14: Exclamation Mark Density (AI indicator) ──
  console.log("\n[TEST 14] EXCLAMATION MARK DENSITY");
  const exclamations = (allText.match(/!/g) || []).length;
  console.log(`  Exclamation marks: ${exclamations}`);
  if (exclamations > 10) issues.push(`AI INDICATOR: ${exclamations} exclamation marks (high density)`);
  console.log(`  ${exclamations <= 10 ? "✅ PASS" : "🔴 HIGH"} - threshold is 10`);

  // ── TEST 15: Sentence Starting Pattern Variety ──
  console.log("\n[TEST 15] SENTENCE STARTING VARIETY");
  const sentences = allText.split(/[.!?]\s+/).filter(s => s.length > 10);
  const starters = {};
  sentences.forEach(s => {
    const firstWord = s.trim().split(/\s+/)[0]?.toLowerCase();
    if (firstWord) starters[firstWord] = (starters[firstWord] || 0) + 1;
  });
  const overusedStarters = Object.entries(starters)
    .filter(([w, c]) => c > 8 && !["the", "a", "an", "if", "it", "in", "for"].includes(w))
    .sort((a, b) => b[1] - a[1]);
  if (overusedStarters.length > 0) {
    overusedStarters.forEach(([w, c]) => {
      console.log(`  ⚠️ "${w}" starts ${c} sentences`);
    });
    issues.push("STYLE: Some sentence starters may be overused");
  } else {
    console.log("  ✅ PASS - Good variety in sentence starters");
  }

  // ── FINAL SUMMARY ──
  console.log("\n" + "=".repeat(70));
  console.log("AUDIT SUMMARY");
  console.log("=".repeat(70));
  
  const criticals = issues.filter(i => i.startsWith("CRITICAL"));
  const warnings = issues.filter(i => i.startsWith("WARNING") || i.startsWith("INFO"));
  const seoIssues = issues.filter(i => i.startsWith("SEO") || i.startsWith("SCHEMA"));
  const styleIssues = issues.filter(i => i.startsWith("AI") || i.startsWith("STYLE"));
  
  console.log(`\n  CRITICAL: ${criticals.length}`);
  criticals.forEach(i => console.log(`    🔴 ${i}`));
  console.log(`  SEO/SCHEMA: ${seoIssues.length}`);
  seoIssues.forEach(i => console.log(`    🟡 ${i}`));
  console.log(`  STYLE: ${styleIssues.length}`);
  styleIssues.forEach(i => console.log(`    🟡 ${i}`));
  console.log(`  WARNINGS: ${warnings.length}`);
  warnings.forEach(i => console.log(`    ⚠️ ${i}`));
  
  console.log(`\n  FIXES NEEDED: ${fixesNeeded.length > 0 ? fixesNeeded.join(", ") : "NONE"}`);
  console.log(`  TOTAL ISSUES: ${issues.length}`);
  console.log(`  VERDICT: ${criticals.length === 0 ? "✅ READY FOR PRODUCTION" : "🔴 NEEDS FIXES"}`);

  // Output fixes needed as JSON for next script
  if (fixesNeeded.length > 0) {
    console.log("\nFIXES_JSON:" + JSON.stringify(fixesNeeded));
  }

  process.exit(0);
}

audit();
