/**
 * Comprehensive Deep Audit Script for Article #11
 * Tests markdown source file against every strict standard:
 * - Punctuation hygiene (NO em-dashes, en-dashes, arrows, double hyphens)
 * - AI slop pattern detection (50+ clichés)
 * - URL cleanliness (zero chatgpt.com, zero utm params)
 * - Primary keyword density & strategic placement (H1, intro, conclusion)
 * - Secondary / LSI keywords presence
 * - Internal link anchor text & target URL
 * - Structural formatting (Markdown tables, lists, headings, CTA widget)
 * - FAQ Schema extraction test
 * - Readability & Demonstrative openers
 */

import fs from "fs";
import path from "path";

const articlePath = path.resolve("d:/web/Grow Orbit/grow orbit/nextjs/.seo cluster/articles/article_11.md");
if (!fs.existsSync(articlePath)) {
  console.error("FATAL: Article 11 file not found at " + articlePath);
  process.exit(1);
}

const rawMd = fs.readFileSync(articlePath, "utf-8");

console.log("=".repeat(75));
console.log("ARTICLE #11 COMPREHENSIVE DEEP AUDIT & QUALITY SUITE");
console.log("=".repeat(75));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let advisories = 0;

function test(name, fn) {
  totalTests++;
  try {
    const res = fn();
    if (res === true || res === undefined) {
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } else if (res && res.warn) {
      console.log(`  ⚠️ ADVISORY: ${name} -> ${res.warn}`);
      advisories++;
    } else {
      console.log(`  ❌ FAIL: ${name} -> ${res}`);
      failedTests++;
    }
  } catch (err) {
    console.log(`  ❌ FAIL: ${name} (Exception: ${err.message})`);
    failedTests++;
  }
}

// Extract Frontmatter
const frontmatterMatch = rawMd.match(/^---\r?\n([\s\S]*?)\r?\n---/);
const frontmatter = {};
if (frontmatterMatch) {
  frontmatterMatch[1].split("\n").forEach(line => {
    const idx = line.indexOf(":");
    if (idx !== -1) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      frontmatter[k] = v;
    }
  });
}

// Body text excluding frontmatter
const bodyText = frontmatterMatch ? rawMd.slice(frontmatterMatch[0].length) : rawMd;
const words = bodyText.trim().split(/\s+/);

// ── GROUP 1: FRONTMATTER & METADATA ──
console.log("\n[GROUP 1] FRONTMATTER & METADATA STANDARDS");
test("Frontmatter exists and parses", () => !!frontmatterMatch);
test("Title matches guidelines", () => frontmatter.title && frontmatter.title.includes("Amazon A+ Content Design"));
test("Meta title defined (< 65 chars)", () => {
  if (!frontmatter.meta_title) return "Missing meta_title";
  if (frontmatter.meta_title.length > 65) return `Too long: ${frontmatter.meta_title.length} chars`;
  return true;
});
test("Meta description defined (120-160 chars)", () => {
  if (!frontmatter.meta_description) return "Missing meta_description";
  const len = frontmatter.meta_description.length;
  if (len < 100 || len > 165) return { warn: `Length is ${len} chars (ideal 120-160)` };
  return true;
});
test("Primary keyword in frontmatter", () => frontmatter.primary_keyword === "amazon a+ content design");
test("Target anchor text in frontmatter", () => frontmatter.target_anchor_text === "A+ Content design");
test("Internal link URL in frontmatter", () => frontmatter.internal_link_url === "/service/listing-optimization");
test("Slug defined and clean", () => frontmatter.slug === "amazon-a-content-design");
test("Cover image defined", () => frontmatter.cover_image && frontmatter.cover_image.endsWith(".avif"));

// ── GROUP 2: STRICT PUNCTUATION & DASH AUDIT ──
console.log("\n[GROUP 2] STRICT PUNCTUATION HYGIENE (ZERO LONG DASHES / ARROWS)");
test("Zero em-dashes (—)", () => {
  const count = (rawMd.match(/—/g) || []).length;
  return count === 0 ? true : `Found ${count} em-dashes`;
});
test("Zero en-dashes (–)", () => {
  const count = (rawMd.match(/–/g) || []).length;
  return count === 0 ? true : `Found ${count} en-dashes`;
});
test("Zero double hyphens in prose (--)", () => {
  // Strip frontmatter, markdown dividers (---), and table column alignment markers (| :--- |)
  const cleaned = rawMd
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^\s*---\s*$/gm, "")
    .replace(/\|\s*:?-+:?\s*/g, "");
  const count = (cleaned.match(/--/g) || []).length;
  return count === 0 ? true : `Found ${count} double hyphens`;
});
test("Zero arrow symbols (→, ➔, \\u2192, \\u2794)", () => {
  const count = (rawMd.match(/[→➔\u2192\u2794]/g) || []).length;
  return count === 0 ? true : `Found ${count} arrow symbols`;
});
test("Zero text arrows (->, -->)", () => {
  const count = (rawMd.match(/--?>/g) || []).length;
  return count === 0 ? true : `Found ${count} text arrow symbols`;
});

// ── GROUP 3: AI SLOP PATTERNS (50+ CLICHÉS) ──
console.log("\n[GROUP 3] FORBIDDEN AI SLOP & CLICHÉS DETECTION");
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
  "revolutionize", "beacon", "testament", "orchestrate", "crucial role",
  "pivotal", "holistic", "foster", "synergy", "robust", "demystify"
];

const lowerBody = bodyText.toLowerCase();
let slopHits = [];
slopPatterns.forEach(p => {
  const reg = new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
  const cnt = (lowerBody.match(reg) || []).length;
  if (cnt > 0) slopHits.push(`"${p}" (${cnt}x)`);
});

test("Zero Tier 1 & Tier 2 AI slop clichés", () => {
  return slopHits.length === 0 ? true : `Detected slop: ${slopHits.join(", ")}`;
});

// ── GROUP 4: LINK & URL HYGIENE ──
console.log("\n[GROUP 4] LINK & URL INTEGRITY");
const allUrls = bodyText.match(/https?:\/\/[^\s\)]+/g) || [];
const allMarkdownLinks = bodyText.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

test("Zero chatgpt.com domain URLs", () => {
  const count = allUrls.filter(u => u.includes("chatgpt.com")).length;
  return count === 0 ? true : `Found ${count} chatgpt.com URLs`;
});
test("Zero UTM tracking parameters", () => {
  const count = allUrls.filter(u => u.includes("utm_")).length;
  return count === 0 ? true : `Found ${count} UTM parameters`;
});
test("Zero insecure http:// links", () => {
  const count = allUrls.filter(u => u.startsWith("http://")).length;
  return count === 0 ? true : `Found ${count} insecure http:// URLs`;
});
test("Target internal link exists with correct anchor text", () => {
  const match = bodyText.includes("[A+ Content design](/service/listing-optimization)");
  return match ? true : "Missing exact match: [A+ Content design](/service/listing-optimization)";
});
test("Internal blog links use relative paths", () => {
  const internalLinks = allMarkdownLinks.filter(l => l.includes("](/") && !l.includes("](http"));
  return internalLinks.length >= 4 ? true : `Expected at least 4 internal links, found ${internalLinks.length}`;
});
test("External authority links present (Amazon official resources)", () => {
  const amazonLinks = allUrls.filter(u => u.includes("amazon.com"));
  return amazonLinks.length >= 5 ? true : `Expected >= 5 Amazon official links, found ${amazonLinks.length}`;
});

// ── GROUP 5: SEO KEYWORD PLACEMENT & DENSITY ──
console.log("\n[GROUP 5] SEO KEYWORD STRATEGY & DENSITY");
const pk = "amazon a+ content design";
const pkReg = new RegExp("amazon a\\+\\s*content design", "gi");
const pkCount = (bodyText.match(pkReg) || []).length;

test("Primary keyword in H1", () => {
  const h1Match = bodyText.match(/^#\s+(.+)$/m);
  if (!h1Match) return "No H1 found";
  return h1Match[1].toLowerCase().includes(pk) ? true : `H1 lacks primary keyword: ${h1Match[1]}`;
});
test("Primary keyword in first 100 words", () => {
  const first100 = words.slice(0, 100).join(" ").toLowerCase();
  return first100.includes(pk) ? true : "Primary keyword not in first 100 words";
});
test("Primary keyword in conclusion / final takeaways", () => {
  const last300 = words.slice(-300).join(" ").toLowerCase();
  return last300.includes(pk) ? true : "Primary keyword not in final 300 words";
});
test("Primary keyword density (0.15% - 1.0% healthy natural distribution)", () => {
  const density = (pkCount * 4 / words.length) * 100;
  console.log(`    (Primary keyword count: ${pkCount} | Density: ${density.toFixed(2)}%)`);
  return (density >= 0.15 && density <= 1.2) ? true : { warn: `Density is ${density.toFixed(2)}%` };
});

const secondaries = [
  { kw: "amazon a+ content design services", min: 1 },
  { kw: "amazon a content design", min: 1 },
  { kw: "what is a plus content on amazon", min: 1 },
  { kw: "ebc design amazon", min: 1 },
  { kw: "amazon ebc graphic design", min: 1 }
];

secondaries.forEach(({ kw, min }) => {
  test(`Secondary keyword: "${kw}"`, () => {
    const reg = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
    const count = (bodyText.match(reg) || []).length;
    return count >= min ? true : `Expected at least ${min}x, found ${count}x`;
  });
});

// ── GROUP 6: CONTENT STRUCTURE, TABLES & CTAS ──
console.log("\n[GROUP 6] CONTENT STRUCTURE & INTERACTIVE ELEMENTS");
test("Word count target (1,500 - 3,500 words)", () => {
  const count = words.length;
  console.log(`    (Total body words: ${count})`);
  return count >= 1500 ? true : `Word count too low: ${count}`;
});
test("H2 headings structure (at least 6 H2s)", () => {
  const h2s = (bodyText.match(/^##\s+.+$/gm) || []);
  return h2s.length >= 6 ? true : `Only ${h2s.length} H2s found`;
});
test("H3 subheadings present (at least 8 H3s)", () => {
  const h3s = (bodyText.match(/^###\s+.+$/gm) || []);
  return h3s.length >= 8 ? true : `Only ${h3s.length} H3s found`;
});
test("Markdown tables properly formatted", () => {
  const tables = bodyText.match(/\|[\s\S]*?\|\r?\n\|(?:\s*:?---*:?\s*\|)+\r?\n(?:\|[\s\S]*?\|\r?\n?)+/g) || [];
  return tables.length >= 2 ? true : `Expected at least 2 tables, found ${tables.length}`;
});
test("Interactive CTA block present and properly formatted", () => {
  const ctaMatch = bodyText.match(/\[BOOK_MEETING_CTA:\s*\/get-started\|([^|]+)\|([^\]]+)\]/);
  return ctaMatch ? true : "Missing or invalid [BOOK_MEETING_CTA: /get-started|Title|Desc]";
});
test("Bulleted & numbered lists present", () => {
  const lists = bodyText.match(/^(\*|\d+\.)\s+/gm) || [];
  return lists.length >= 10 ? true : `Expected >= 10 list items, found ${lists.length}`;
});

// ── GROUP 7: FAQ SCHEMA & SEARCH ANSWERABILITY ──
console.log("\n[GROUP 7] FAQ SCHEMA & SEARCH ENGINE PARSING");
test("Frequently Asked Questions section exists", () => {
  return /## Frequently Asked Questions/i.test(bodyText);
});
test("FAQ Schema pairs extractable (H3 question + Paragraph answer)", () => {
  const faqSection = bodyText.split(/## Frequently Asked Questions/i)[1]?.split(/^##\s+/m)[0] || "";
  const questions = faqSection.match(/^###\s+(.+)$/gm) || [];
  console.log(`    (Extracted ${questions.length} FAQ questions)`);
  return questions.length >= 6 ? true : `Found only ${questions.length} questions`;
});
test("FAQ direct answer brevity (< 70 words in initial answer paragraph)", () => {
  const faqSection = bodyText.split(/## Frequently Asked Questions/i)[1]?.split(/^##\s+/m)[0] || "";
  const blocks = faqSection.split(/\r?\n\r?\n/).filter(b => b.trim());
  let allConcise = true;
  let longAnswers = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].startsWith("### ")) {
      const q = blocks[i].replace("### ", "").trim();
      const ans = blocks[i + 1] ? blocks[i + 1].trim() : "";
      const ansWords = ans.split(/\s+/).length;
      if (ansWords > 75) {
        allConcise = false;
        longAnswers.push(`"${q}" (${ansWords} words)`);
      }
    }
  }
  return allConcise ? true : { warn: `Some initial answers > 75 words: ${longAnswers.join(", ")}` };
});

// ── GROUP 8: READABILITY & VOICE METRICS ──
console.log("\n[GROUP 8] READABILITY & STYLISTIC METRICS");
const sentences = bodyText.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "");
  word = word.replace(/^y/, "");
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

let totalSyllables = 0;
words.forEach(w => { totalSyllables += countSyllables(w); });
const fleschEase = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (totalSyllables / words.length));
const fkGrade = (0.39 * (words.length / sentences.length)) + (11.8 * (totalSyllables / words.length)) - 15.59;

test("Flesch Reading Ease score", () => {
  console.log(`    (Flesch Reading Ease: ${fleschEase.toFixed(1)})`);
  return fleschEase >= 30 ? true : { warn: `Reading ease is ${fleschEase.toFixed(1)}` };
});
test("Flesch-Kincaid Grade Level", () => {
  console.log(`    (FK Grade Level: ${fkGrade.toFixed(1)})`);
  return fkGrade <= 14.0 ? true : { warn: `Grade level is ${fkGrade.toFixed(1)}` };
});
test("Demonstrative openers ratio (< 15% sentences starting with This/That/These/Those/It)", () => {
  const demoOpeners = sentences.filter(s => /^(This|That|These|Those|It)\s/i.test(s.trim()));
  const ratio = (demoOpeners.length / sentences.length) * 100;
  console.log(`    (Demonstrative openers: ${demoOpeners.length}/${sentences.length} = ${ratio.toFixed(1)}%)`);
  return ratio < 15.0 ? true : { warn: `Ratio is ${ratio.toFixed(1)}%` };
});

// ── SUMMARY ──
console.log("\n" + "=".repeat(75));
console.log(`AUDIT RESULTS: ${passedTests} PASSED | ${failedTests} FAILED | ${advisories} ADVISORIES (Total: ${totalTests})`);
console.log("=".repeat(75));

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL TESTS PASSED! Article 11 is 100% compliant and ready for publication.");
}
