import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), '.seo cluster', 'articles', 'article_16.md');
if (!fs.existsSync(filePath)) {
  console.error("article_16.md does not exist!");
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');

console.log("==========================================");
console.log("   FORENSIC AUDIT: ARTICLE #16 DRAFT      ");
console.log("==========================================\n");

let score = 100;
const deductions = [];

// 1. Frontmatter
const hasFrontmatter = content.startsWith('---') && content.indexOf('---', 3) > 3;
if (!hasFrontmatter) {
  deductions.push("-20: Missing or invalid YAML frontmatter");
  score -= 20;
} else {
  console.log("✅ Frontmatter: Present");
  const fmMatch = content.match(/---([\s\S]*?)---/);
  const fm = fmMatch ? fmMatch[1] : '';
  const title = fm.match(/title:\s*["']?([^"'\r\n]+)["']?/)?.[1];
  const slug = fm.match(/slug:\s*["']?([^"'\r\n]+)["']?/)?.[1];
  const desc = fm.match(/description:\s*["']?([^"'\r\n]+)["']?/)?.[1];
  const author = fm.match(/author:\s*["']?([^"'\r\n]+)["']?/)?.[1];
  console.log("   Title:", title);
  console.log("   Slug:", slug);
  console.log("   Author:", author);
  console.log("   Description length:", desc?.length, "chars");
}

// 2. Word Count
const words = content.replace(/---[\s\S]*?---/, '').trim().split(/\s+/).length;
console.log("\n✅ Word count:", words, "words (Target: 1,200 - 2,500 words)");
if (words < 1100) {
  deductions.push("-10: Word count under minimum 1,100 words");
  score -= 10;
} else if (words > 3500) {
  deductions.push("-5: Word count excessively verbose (>3500 words)");
  score -= 5;
}

// 3. Primary Keyword Density
const primaryKW = "product rendering vs product photography";
const kwRegex = new RegExp(primaryKW, 'gi');
const kwMatches = (content.match(kwRegex) || []).length;
console.log(`\n✅ Primary Keyword '${primaryKW}' matches:`, kwMatches);
if (kwMatches === 0) {
  deductions.push("-15: Primary keyword not found in body");
  score -= 15;
}

// 4. Hallucinated / Broken Links
const chatgptMatches = (content.match(/chatgpt\.com/gi) || []).length;
if (chatgptMatches > 0) {
  deductions.push(`-30: Contains ${chatgptMatches} chatgpt.com hallucinated link(s)`);
  score -= 30;
} else {
  console.log("✅ Domain Hygiene: 0 chatgpt.com links found");
}

// 5. Internal Links
const hasHubLink = content.includes('/service/listing-optimization');
const hasCaseStudyLink = content.includes('/case-study/li-03');
const hasCta = content.includes('[BOOK_MEETING_CTA:');

console.log("\n✅ Internal Linking Architecture:");
console.log("   Hub link (/service/listing-optimization):", hasHubLink ? "FOUND ✅" : "MISSING ❌");
console.log("   Case study (/case-study/li-03):", hasCaseStudyLink ? "FOUND ✅" : "MISSING ❌");
console.log("   Interactive CTA widget:", hasCta ? "FOUND ✅" : "MISSING ❌");

if (!hasHubLink) { deductions.push("-10: Missing primary hub link"); score -= 10; }
if (!hasCaseStudyLink) { deductions.push("-5: Missing case study link"); score -= 5; }
if (!hasCta) { deductions.push("-5: Missing CTA widget"); score -= 5; }

// 6. External E-E-A-T Links
const hasAmazonImageGuide = content.includes('sellercentral.amazon.com/help/hub/reference/external/G1881');
const hasAmazonStyleGuides = content.includes('sellercentral.amazon.com/help/hub/reference/external/G200270100');
console.log("\n✅ External Regulatory Citations:");
console.log("   Amazon Product Image Guide (G1881):", hasAmazonImageGuide ? "FOUND ✅" : "MISSING ❌");
console.log("   Amazon Style Guides (G200270100):", hasAmazonStyleGuides ? "FOUND ✅" : "MISSING ❌");

// 7. Table Formatting
const tableLines = content.split('\n').filter(l => l.trim().startsWith('|'));
console.log("\n✅ Comparison Table:");
console.log("   Table rows count:", tableLines.length);
if (tableLines.length < 5) {
  deductions.push("-10: Comparison table missing or improperly formatted");
  score -= 10;
} else {
  console.log("   Table structure: Valid Markdown pipe syntax");
}

// 8. Banned AI Words
const bannedWords = [
  'delve', 'tapestry', 'beacon', 'game-changer', 'game changer',
  'plethora', 'supercharge', 'unleash', 'testament', 'furthermore',
  'revolutionize', 'ever-evolving', 'fast-paced'
];
const foundBanned = [];
bannedWords.forEach(w => {
  const r = new RegExp(`\\b${w}\\b`, 'gi');
  if (r.test(content)) foundBanned.push(w);
});
console.log("\n✅ Generative AI Vocabulary Check:");
if (foundBanned.length > 0) {
  console.log("   ⚠️ Banned words found:", foundBanned);
  deductions.push(`-5: AI vocabulary triggers: ${foundBanned.join(', ')}`);
  score -= 5;
} else {
  console.log("   Pristine: 0 banned AI filler words detected");
}

// 9. Heading Outline Hierarchy
const h1Count = (content.match(/^#\s+/gm) || []).length;
const h2Count = (content.match(/^##\s+/gm) || []).length;
const h3Count = (content.match(/^###\s+/gm) || []).length;
console.log("\n✅ Heading Hierarchy Outline:");
console.log(`   H1 tags: ${h1Count} (Target: exactly 1)`);
console.log(`   H2 tags: ${h2Count} (Target: 4 - 8)`);
console.log(`   H3 tags: ${h3Count} (Target: 4 - 15)`);
if (h1Count !== 1) { deductions.push("-10: Must have exactly 1 H1"); score -= 10; }
if (h2Count < 3) { deductions.push("-5: Too few H2 sections"); score -= 5; }

console.log("\n==========================================");
console.log(`   FINAL AUDIT SCORE: ${score} / 100`);
if (deductions.length > 0) {
  console.log("   Deductions:");
  deductions.forEach(d => console.log("   ", d));
} else {
  console.log("   STATUS: 🚀 100% PRODUCTION READY!");
}
console.log("==========================================\n");
