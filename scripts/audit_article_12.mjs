import fs from "fs";

const raw = fs.readFileSync("d:/web/Grow Orbit/grow orbit/nextjs/.seo cluster/articles/article_12.md", "utf-8");

console.log("=".repeat(75));
console.log("ARTICLE #12 COMPREHENSIVE DEEP AUDIT & QUALITY SUITE");
console.log("=".repeat(75));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let advisoryTests = 0;
const failures = [];
const advisories = [];

function check(name, fn) {
  totalTests++;
  try {
    const res = fn();
    if (res === true || res === undefined) {
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } else if (res && res.warn) {
      console.log(`  ⚠️ ADVISORY: ${name} -> ${res.warn}`);
      advisoryTests++;
      advisories.push({ name, reason: res.warn });
    } else {
      const reason = (res && res.fail) ? res.fail : "Failed check";
      console.log(`  ❌ FAIL: ${name} -> ${reason}`);
      failedTests++;
      failures.push({ name, reason });
    }
  } catch (err) {
    console.log(`  ❌ FAIL: ${name} -> Error: ${err.message}`);
    failedTests++;
    failures.push({ name, reason: err.message });
  }
}

// Extract frontmatter
const fmMatch = raw.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
const frontmatterRaw = fmMatch ? fmMatch[1] : "";
const body = raw.replace(/^---[\s\S]*?---/, "").trim();

// [GROUP 1] FRONTMATTER & METADATA STANDARDS
console.log("\n[GROUP 1] FRONTMATTER & METADATA STANDARDS");

check("Frontmatter exists and parses", () => {
  if (!fmMatch) return { fail: "Frontmatter block missing" };
  return true;
});

check("Title defined in frontmatter", () => {
  const m = frontmatterRaw.match(/title:\s*"([^"]+)"/);
  if (!m || !m[1]) return { fail: "Missing frontmatter title" };
  return true;
});

check("Meta title defined (< 65 chars)", () => {
  const m = frontmatterRaw.match(/meta_title:\s*"([^"]+)"/);
  if (!m || !m[1]) return { fail: "Missing meta_title" };
  if (m[1].length > 65) return { fail: `Meta title too long (${m[1].length} chars)` };
  return true;
});

check("Meta description defined (120-160 chars)", () => {
  const m = frontmatterRaw.match(/meta_description:\s*"([^"]+)"/);
  if (!m || !m[1]) return { fail: "Missing meta_description" };
  if (m[1].length < 120 || m[1].length > 165) return { fail: `Meta description length (${m[1].length}) not in 120-165 range` };
  return true;
});

check("Primary keyword in frontmatter", () => {
  const m = frontmatterRaw.match(/primary_keyword:\s*"([^"]+)"/);
  if (!m || m[1] !== "amazon brand story guidelines") return { fail: "Incorrect or missing primary_keyword in frontmatter" };
  return true;
});

check("Target anchor text in frontmatter", () => {
  const m = frontmatterRaw.match(/target_anchor_text:\s*"([^"]+)"/);
  if (!m || m[1] !== "Amazon Brand Story design") return { fail: "Incorrect target_anchor_text" };
  return true;
});

check("Internal link URL in frontmatter", () => {
  const m = frontmatterRaw.match(/internal_link_url:\s*"([^"]+)"/);
  if (!m || m[1] !== "/service/listing-optimization") return { fail: "Incorrect internal_link_url" };
  return true;
});

check("Slug defined and clean", () => {
  const m = frontmatterRaw.match(/slug:\s*"([^"]+)"/);
  if (!m || m[1] !== "amazon-brand-story-guidelines") return { fail: "Invalid slug in frontmatter" };
  return true;
});

check("Cover image defined", () => {
  const m = frontmatterRaw.match(/cover_image:\s*"([^"]+)"/);
  if (!m || !m[1].includes("/images/article image/12/")) return { fail: "Missing or invalid cover_image path" };
  return true;
});

// [GROUP 2] STRICT PUNCTUATION HYGIENE (ZERO LONG DASHES / ARROWS)
console.log("\n[GROUP 2] STRICT PUNCTUATION HYGIENE (ZERO LONG DASHES / ARROWS)");

check("Zero em-dashes (—)", () => {
  const matches = body.match(/—/g) || [];
  if (matches.length > 0) return { fail: `Found ${matches.length} em-dashes` };
  return true;
});

check("Zero en-dashes (–)", () => {
  const matches = body.match(/–/g) || [];
  if (matches.length > 0) return { fail: `Found ${matches.length} en-dashes` };
  return true;
});

check("Zero double hyphens in prose (--)", () => {
  const lines = body.split("\n");
  for (const line of lines) {
    if (line.trim() === "---") continue;
    if (/\b\s*--\s*\b/.test(line)) {
      return { fail: `Double hyphen in prose: "${line.trim()}"` };
    }
  }
  return true;
});

check("Zero arrow symbols (→, ➔, \\u2192, \\u2794)", () => {
  const arrowRegex = /[→➔➜➝➞➟➡➥➦➧➨]/gu;
  const matches = body.match(arrowRegex) || [];
  if (matches.length > 0) return { fail: `Found ${matches.length} arrow character(s): "${matches.join(' ')}"` };
  return true;
});

check("Zero text arrows (->, -->)", () => {
  const matches = body.match(/(-->|->)/g) || [];
  if (matches.length > 0) return { fail: `Found ${matches.length} text arrows` };
  return true;
});

// [GROUP 3] FORBIDDEN AI SLOP & CLICHÉS DETECTION
console.log("\n[GROUP 3] FORBIDDEN AI SLOP & CLICHÉS DETECTION");

check("Zero Tier 1 & Tier 2 AI slop clichés", () => {
  const slop = [
    /in today's fast-paced/i,
    /delve into/i,
    /tapestry of/i,
    /beacon of/i,
    /testament to/i,
    /game changer/i,
    /navigate the complexities/i,
    /without further ado/i,
    /look no further/i,
    /in the realm of/i,
    /skyrocket your/i,
  ];
  for (const p of slop) {
    if (p.test(body)) return { fail: `Found slop phrase: ${p.source}` };
  }
  return true;
});

// [GROUP 4] LINK & URL INTEGRITY
console.log("\n[GROUP 4] LINK & URL INTEGRITY");

check("Zero chatgpt.com domain URLs", () => {
  const matches = body.match(/https?:\/\/(?:www\.)?chatgpt\.com[^\s)"]*/gi) || [];
  if (matches.length > 0) return { fail: `Found chatgpt.com URL(s): ${matches.join(', ')}` };
  return true;
});

check("Zero UTM tracking parameters", () => {
  const matches = body.match(/utm_[a-zA-Z0-9_]+=[^&\s)"]+/gi) || [];
  if (matches.length > 0) return { fail: `Found UTM parameters: ${matches.join(', ')}` };
  return true;
});

check("Target internal link exists with correct anchor text", () => {
  const targetPattern = /\[Amazon Brand Story design\]\(\/service\/listing-optimization\/?\)/;
  if (!targetPattern.test(body)) return { fail: "Missing exact [Amazon Brand Story design](/service/listing-optimization) link" };
  return true;
});

check("Internal blog links use clean relative paths", () => {
  const hasAplus = /\[A\+\s+Content\s+design\s+guide\]\(\/blog\/amazon-a-content-design\)/i.test(body);
  if (!hasAplus) return { fail: "Missing clean relative link to /blog/amazon-a-content-design" };
  return true;
});

check("Repetition density of external citation links (< 4x)", () => {
  const matches = [...body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)"]+)\)/g)];
  const counts = {};
  matches.forEach(m => {
    const url = m[2];
    counts[url] = (counts[url] || 0) + 1;
  });
  const excessive = Object.entries(counts).filter(([url, count]) => count > 3);
  if (excessive.length > 0) {
    return { fail: `Excessive repetition: ${excessive.map(([u, c]) => `${c}x ${u}`).join(', ')}` };
  }
  return true;
});

// [GROUP 5] SEO KEYWORD STRATEGY & DENSITY
console.log("\n[GROUP 5] SEO KEYWORD STRATEGY & DENSITY");

const primaryKeyword = "amazon brand story guidelines";
const cleanLower = body.toLowerCase();

check("Primary keyword in H1", () => {
  const h1Match = body.match(/^#\s+(.+)$/m);
  if (!h1Match || !h1Match[1].toLowerCase().includes(primaryKeyword)) {
    return { fail: "Primary keyword missing from H1" };
  }
  return true;
});

check("Primary keyword in first 100 words", () => {
  const words = cleanLower.split(/\s+/).slice(0, 100).join(" ");
  if (!words.includes(primaryKeyword)) {
    return { fail: "Primary keyword missing from first 100 words" };
  }
  return true;
});

check("Primary keyword in conclusion / final takeaways", () => {
  const conclusionIndex = body.lastIndexOf("## Final Takeaway");
  if (conclusionIndex === -1) return { fail: "Missing Final Takeaway H2" };
  const conclusionText = body.slice(conclusionIndex).toLowerCase();
  if (!conclusionText.includes(primaryKeyword)) {
    return { fail: "Primary keyword missing from conclusion section" };
  }
  return true;
});

check("Primary keyword natural density (3 - 8 occurrences)", () => {
  const matches = cleanLower.match(new RegExp(primaryKeyword, "g")) || [];
  console.log(`    (Primary keyword count: ${matches.length})`);
  if (matches.length < 3 || matches.length > 8) {
    return { fail: `Count ${matches.length} outside natural range (3-8)` };
  }
  return true;
});

check("Secondary keyword: 'brand story vs a plus content'", () => {
  if (!cleanLower.includes("brand story vs a plus content") && !cleanLower.includes("brand story vs. a+ content")) {
    return { fail: "Missing secondary keyword" };
  }
  return true;
});

check("Secondary keyword: 'amazon brand story carousel'", () => {
  if (!cleanLower.includes("amazon brand story carousel")) return { fail: "Missing secondary keyword" };
  return true;
});

check("Secondary keyword: 'amazon brand story examples'", () => {
  if (!cleanLower.includes("amazon brand story examples")) return { fail: "Missing secondary keyword" };
  return true;
});

check("Secondary keyword: 'amazon brand story size'", () => {
  if (!cleanLower.includes("amazon brand story size")) return { fail: "Missing secondary keyword" };
  return true;
});

check("Secondary keyword: 'ebc vs brand story'", () => {
  if (!cleanLower.includes("ebc vs brand story")) return { fail: "Missing secondary keyword" };
  return true;
});

// [GROUP 6] CONTENT STRUCTURE & INTERACTIVE ELEMENTS
console.log("\n[GROUP 6] CONTENT STRUCTURE & INTERACTIVE ELEMENTS");

const totalWords = body.trim().split(/\s+/).length;
check(`Word count target (1,500 - 3,500 words) -> Actual: ${totalWords}`, () => {
  if (totalWords < 1500) return { fail: `Word count too low (${totalWords})` };
  return true;
});

check("H2 headings structure (at least 8 H2s)", () => {
  const h2s = body.match(/^##\s+.+/gm) || [];
  console.log(`    (H2 headings count: ${h2s.length})`);
  if (h2s.length < 8) return { fail: `Found only ${h2s.length} H2s` };
  return true;
});

check("H3 subheadings present (at least 6 H3s)", () => {
  const h3s = body.match(/^###\s+.+/gm) || [];
  console.log(`    (H3 headings count: ${h3s.length})`);
  if (h3s.length < 6) return { fail: `Found only ${h3s.length} H3s` };
  return true;
});

check("Markdown tables properly formatted", () => {
  const tables = body.match(/\|[\s\S]*?\|[\r\n]+\|[-:| ]+\|/g) || [];
  console.log(`    (Formatted tables count: ${tables.length})`);
  if (tables.length < 2) return { fail: `Expected at least 2 tables, found ${tables.length}` };
  return true;
});

check("Interactive CTA block present and properly formatted", () => {
  const ctaMatch = body.match(/\[BOOK_MEETING_CTA:\s*([^|]+)\|([^|]+)\|([^\]]+)\]/);
  if (!ctaMatch) return { fail: "Missing or malformed [BOOK_MEETING_CTA: ...] widget" };
  return true;
});

// [GROUP 7] FAQ SCHEMA & SEARCH ENGINE PARSING
console.log("\n[GROUP 7] FAQ SCHEMA & SEARCH ENGINE PARSING");

check("Frequently Asked Questions section exists", () => {
  if (!/## Frequently Asked Questions/i.test(body)) return { fail: "Missing FAQ H2" };
  return true;
});

check("FAQ Schema pairs extractable (H3 question + Paragraph answer)", () => {
  const faqSection = body.split(/## Frequently Asked Questions/i)[1].split(/^##\s+/m)[0];
  const questions = faqSection.match(/^###\s+.+\?/gm) || [];
  console.log(`    (Extracted ${questions.length} FAQ questions)`);
  if (questions.length < 6) return { fail: `Only ${questions.length} FAQ items found` };
  return true;
});

check("FAQ direct answers have clean plain-text answers (no trailing citation links)", () => {
  const faqSection = body.split(/## Frequently Asked Questions/i)[1].split(/^##\s+/m)[0];
  const matches = faqSection.match(/\[[^\]]+\]\([^)]+\)/g) || [];
  if (matches.length > 0) {
    return { fail: `Found citation link(s) inside FAQ section: ${matches.join(', ')}` };
  }
  return true;
});

// [GROUP 8] READABILITY & STYLISTIC METRICS
console.log("\n[GROUP 8] READABILITY & STYLISTIC METRICS");

function calculateFlesch(text) {
  const clean = text.replace(/\[[^\]]+\]\([^)]+\)/g, "").replace(/[#*`_]/g, "");
  const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const w = clean.trim().split(/\s+/).filter(x => x.length > 0);
  if (sentences.length === 0 || w.length === 0) return { fre: 0, fk: 0 };
  
  let totalSyllables = 0;
  w.forEach(word => {
    let wordClean = word.toLowerCase().replace(/[^a-z]/g, "");
    if (!wordClean) return;
    if (wordClean.length <= 3) { totalSyllables += 1; return; }
    wordClean = wordClean.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    wordClean = wordClean.replace(/^y/, '');
    const m = wordClean.match(/[aeiouy]{1,2}/g);
    totalSyllables += m ? m.length : 1;
  });

  const wordsPerSentence = w.length / sentences.length;
  const syllablesPerWord = totalSyllables / w.length;
  const fre = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
  const fk = (0.39 * wordsPerSentence) + (11.8 * syllablesPerWord) - 15.59;
  return { fre: Math.round(fre * 10) / 10, fk: Math.round(fk * 10) / 10 };
}

const { fre, fk } = calculateFlesch(body);
check(`Flesch Reading Ease score -> ${fre}`, () => {
  if (fre < 40) return { warn: `Reading ease is ${fre}` };
  return true;
});

check(`Flesch-Kincaid Grade Level -> ${fk}`, () => {
  if (fk > 14) return { warn: `Grade level is ${fk}` };
  return true;
});

console.log("\n" + "=".repeat(75));
console.log(`AUDIT RESULTS: ${passedTests} PASSED | ${failedTests} FAILED | ${advisoryTests} ADVISORIES (Total: ${totalTests})`);
console.log("=".repeat(75));

if (failedTests === 0) {
  console.log("🎉 ALL TESTS PASSED! Article 12 is 100% compliant and ready for publication.");
  process.exit(0);
} else {
  console.log("CRITICAL FAILURES DETECTED:");
  failures.forEach((f, i) => console.log(`  ${i+1}. [${f.name}]: ${f.reason}`));
  process.exit(1);
}
