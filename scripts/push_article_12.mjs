/**
 * Push Article #12 to Firebase Firestore
 * Run: node scripts/push_article_12.mjs
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

// Parse article_12.md into blocks
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

const rawMd = fs.readFileSync("d:/web/Grow Orbit/grow orbit/nextjs/.seo cluster/articles/article_12.md", "utf-8");
const contentBlocks = parseMarkdownToBlocks(rawMd);

const articleData = {
  slug: "amazon-brand-story-guidelines",
  title: "Amazon Brand Story Guidelines 2026: Brand Story vs. A+ Content",
  excerpt: "Learn Amazon Brand Story guidelines, current image specs, carousel structure, Brand Story vs A+ Content, and how to use both across your Amazon catalog.",
  category: "Listing Optimization",
  tags: [
    "amazon brand story guidelines",
    "brand story vs a plus content",
    "amazon brand story carousel",
    "amazon brand story examples",
    "amazon brand story size",
    "ebc vs brand story",
    "Amazon listing optimization",
  ],
  coverImage: "/images/article image/12/amazon-brand-story-guidelines.avif",
  metaTitle: "Amazon Brand Story Guidelines 2026 | Brand Story vs A+",
  metaDescription: "Learn Amazon Brand Story guidelines, current image specs, carousel structure, Brand Story vs A+ Content, and how to use both across your Amazon catalog.",
  date: "2026-10-02",
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
