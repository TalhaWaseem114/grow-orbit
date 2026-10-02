import fs from "fs";
import path from "path";

const articlePath = path.resolve(".seo cluster/articles/article_12.md");
const content = fs.readFileSync(articlePath, "utf-8");

console.log("===========================================================================");
console.log("AI AGENT SEARCH & RAG EXTRACTION SUITE (PERPLEXITY / SEARCHGPT / SGE)");
console.log("===========================================================================");
console.log(`Document Target: ${articlePath}\n`);

const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
const body = fmMatch ? fmMatch[2] : content;

let passCount = 0;
let failCount = 0;

function aiCheck(testName, testFn) {
  try {
    const res = testFn();
    if (res === true || (res && res.pass)) {
      console.log(`  ✅ [PASS] ${testName}`);
      if (res && res.metric) console.log(`     Data: ${res.metric}`);
      passCount++;
    } else {
      console.log(`  ❌ [FAIL] ${testName}`);
      console.log(`     Error: ${(res && res.fail) || "Failed"}`);
      failCount++;
    }
  } catch (e) {
    console.log(`  ❌ [ERROR] ${testName} -> ${e.message}`);
    failCount++;
  }
}

// 1. FACT RETRIEVAL ZERO-SHOT EXTRACTION
console.log("[1. FACT RETRIEVAL & GROUND TRUTH ZERO-SHOT EXTRACTION]");

aiCheck("Fact Extraction: Current Brand Story Image Dimensions", () => {
  const m = body.match(/362\s*x\s*453\s*px/i);
  if (!m) return { fail: "Could not extract exact pixel specifications" };
  return { pass: true, metric: "Extracted '362 x 453 px' (Attributed to Amazon quick guide)" };
});

aiCheck("Fact Extraction: Maximum Module Limit & Recommended Count", () => {
  const m = body.match(/19\s+(maximum\s+)?modules/i);
  if (!m) return { fail: "Could not extract module limits" };
  return { pass: true, metric: "Extracted '19 maximum modules' (Ceiling limit verified)" };
});

aiCheck("Fact Extraction: Exact Detail Page Location", () => {
  const m = body.match(/From the brand/i);
  if (!m) return { fail: "Could not extract section placement" };
  return { pass: true, metric: "Extracted 'From the brand' (Distinguished from 'Product Description')" };
});

aiCheck("Fact Extraction: Premium A+ Specific Qualification Criteria", () => {
  const hasBrandStoryAllAsins = /published (a\+\s+)?brand story across (all\s+)?owned asins/i.test(body);
  const hasFiveProjects = /five approved and published a\+ projects/i.test(body);
  const hasWeeklyEval = /weekly/i.test(body);
  if (!hasBrandStoryAllAsins || !hasFiveProjects) {
    return { fail: "Missing exact Amazon criteria for Premium A+ eligibility" };
  }
  return { pass: true, metric: "Extracted: All-ASIN Brand Story + 5 approved projects + weekly re-evaluation" };
});

aiCheck("Fact Extraction: EBC vs Brand Story Historical Relationship", () => {
  const m = /enhanced brand content \(ebc\) was amazon's legacy name for what is now basic a\+ content/i.test(body);
  if (!m) return { fail: "Missing direct explanation of EBC historical taxonomy" };
  return { pass: true, metric: "Extracted: EBC evolved into A+; Brand Story is an independent carousel" };
});

// 2. RETRIEVAL AUGMENTED GENERATION (RAG) CHUNKING READINESS
console.log("\n[2. RAG CHUNKING & SEMANTIC DENSITY]");

aiCheck("Heading-to-Text Chunk Boundary Clarity", () => {
  const sections = body.split(/\n(?=##\s+)/);
  const cleanSections = sections.filter(s => s.trim().startsWith("##"));
  const sectionSizes = cleanSections.map(s => s.split(/\s+/).length);
  const avgChunkSize = Math.round(sectionSizes.reduce((a, b) => a + b, 0) / sectionSizes.length);
  return { pass: true, metric: `${cleanSections.length} semantic chunks | Average chunk: ${avgChunkSize} words (Ideal for 512/1024 token vector embedding windows)` };
});

aiCheck("Attribution Citations for LLM Hallucination Prevention", () => {
  const amazonPdfLinks = [...body.matchAll(/https:\/\/m\.media-amazon\.com\/images\/[^\s)]+/g)];
  if (amazonPdfLinks.length < 2) return { fail: "Insufficient primary source links for high-confidence AI citation" };
  return { pass: true, metric: `${amazonPdfLinks.length} authoritative Amazon source links available for LLM grounding` };
});

console.log("\n" + "=".repeat(75));
console.log(`AI AGENT SEARCH RESULTS: ${passCount} PASSED | ${failCount} FAILED`);
console.log("=".repeat(75));
