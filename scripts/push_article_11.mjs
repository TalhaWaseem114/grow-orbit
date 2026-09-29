/**
 * Push Article #11 to Firebase Firestore
 * Run: node scripts/push_article_11.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";

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

// Parse article_11.md into blocks
function parseMarkdownToBlocks(mdContent) {
  const lines = mdContent.split(/\r?\n/);
  const blocks = [];
  
  // Strip frontmatter
  let startIndex = 0;
  if (lines[0].trim() === "---") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "---") {
        startIndex = i + 1;
        break;
      }
    }
  }

  // Skip title H1 and metadata subtitle if present
  let i = startIndex;
  while (i < lines.length && (lines[i].startsWith("# ") || lines[i].trim() === "" || lines[i].startsWith("*Last reviewed"))) {
    i++;
  }

  let currentBlockType = null;
  let currentLines = [];

  function flushBlock() {
    if (currentLines.length === 0) return;
    const text = currentLines.join("\n").trim();
    if (!text) {
      currentLines = [];
      return;
    }

    if (currentBlockType === "cta") {
      // CTA format: [BOOK_MEETING_CTA: /get-started|Title|Desc]
      const match = text.match(/\[BOOK_MEETING_CTA:\s*([^|]+)\|([^|]+)\|([^\]]+)\]/);
      if (match) {
        blocks.push({
          type: "cta",
          text: `${match[1].trim()}|${match[2].trim()}|${match[3].trim()}`,
        });
      } else {
        blocks.push({ type: "paragraph", text });
      }
    } else if (currentBlockType === "heading") {
      blocks.push({ type: "heading", text });
    } else if (currentBlockType === "heading-h3") {
      blocks.push({ type: "heading-h3", text });
    } else if (currentBlockType === "table") {
      blocks.push({ type: "table", text });
    } else if (currentBlockType === "list") {
      blocks.push({ type: "list", text });
    } else if (currentBlockType === "divider") {
      blocks.push({ type: "divider", text: "" });
    } else {
      blocks.push({ type: "paragraph", text });
    }

    currentLines = [];
    currentBlockType = null;
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "---") {
      flushBlock();
      blocks.push({ type: "divider", text: "" });
      i++;
      continue;
    }

    if (trimmed.startsWith("[BOOK_MEETING_CTA:")) {
      flushBlock();
      currentBlockType = "cta";
      currentLines.push(trimmed);
      flushBlock();
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushBlock();
      blocks.push({ type: "heading", text: trimmed.replace(/^##\s+/, "") });
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushBlock();
      blocks.push({ type: "heading-h3", text: trimmed.replace(/^###\s+/, "") });
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      if (currentBlockType !== "table") {
        flushBlock();
        currentBlockType = "table";
      }
      currentLines.push(line);
      i++;
      continue;
    }

    if (trimmed.match(/^(\*|\-|\d+\.)\s+/)) {
      if (currentBlockType !== "list") {
        flushBlock();
        currentBlockType = "list";
      }
      currentLines.push(line);
      i++;
      continue;
    }

    if (trimmed === "") {
      flushBlock();
      i++;
      continue;
    }

    // Standard paragraph line
    if (currentBlockType !== "paragraph") {
      flushBlock();
      currentBlockType = "paragraph";
    }
    currentLines.push(line);
    i++;
  }

  flushBlock();
  return blocks;
}

const rawMd = fs.readFileSync("d:/web/Grow Orbit/grow orbit/nextjs/.seo cluster/articles/article_11.md", "utf-8");
const contentBlocks = parseMarkdownToBlocks(rawMd);

const articleData = {
  slug: "amazon-a-content-design",
  title: "Amazon A+ Content Design: Complete Guide & Best Practices (2026)",
  excerpt: "Master Amazon A+ Content design with our 2026 guide. Learn module structuring, Basic vs Premium A+, 3D rendering, mobile layout, and compliance rules.",
  category: "Listing Optimization",
  tags: [
    "amazon a+ content design",
    "A+ Content design",
    "Amazon A+ Content",
    "Premium A+",
    "EBC design Amazon",
    "Amazon listing optimization",
  ],
  coverImage: "/images/article image/11/amazon-a-content-design.avif",
  date: "2026-09-29",
  readTime: "16 min read",
  author: {
    name: "Talha Waseem",
    role: "Technical Strategist",
    avatar: null,
  },
  status: "published",
  featured: false,
  views: 0,
  content: contentBlocks,
};

console.log("Parsed content blocks count:", contentBlocks.length);
const typeCounts = {};
contentBlocks.forEach(b => { typeCounts[b.type] = (typeCounts[b.type] || 0) + 1; });
console.log("Block types distribution:", typeCounts);

async function pushToFirestore() {
  console.log(`Pushing article "${articleData.title}" (${contentBlocks.length} content blocks)...`);
  const docRef = doc(db, "blogs", articleData.slug);
  await setDoc(docRef, articleData);
  console.log(`SUCCESS: Article published to Firestore at blogs/${articleData.slug}`);
  process.exit(0);
}

pushToFirestore().catch((err) => {
  console.error("Error pushing article:", err);
  process.exit(1);
});
