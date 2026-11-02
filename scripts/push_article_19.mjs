/**
 * Push Article #19 to Firebase Firestore
 * Run: node scripts/push_article_19.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

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

// Parse article_19.md into structured blocks
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

  // Skip title H1 and author metadata line if present
  let i = startIndex;
  while (
    i < lines.length &&
    (lines[i].startsWith("# ") ||
      lines[i].trim() === "" ||
      lines[i].startsWith("*Last reviewed") ||
      lines[i].startsWith("Last reviewed") ||
      lines[i].startsWith("**By Talha"))
  ) {
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
    } else if (currentBlockType === "highlight") {
      blocks.push({ type: "highlight", text });
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

    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushBlock();
      const imgUrl = imgMatch[2].trim();
      const imgAlt = imgMatch[1].trim();
      const isInfographic =
        imgUrl.includes("diagram") ||
        imgUrl.includes("pipeline") ||
        imgUrl.includes("breakdown") ||
        imgUrl.includes("comparison") ||
        imgUrl.includes("infographic") ||
        imgUrl.includes("wireframe") ||
        imgUrl.includes("exploded") ||
        imgAlt.toLowerCase().includes("diagram") ||
        imgAlt.toLowerCase().includes("comparison") ||
        imgAlt.toLowerCase().includes("breakdown") ||
        imgAlt.toLowerCase().includes("blueprint") ||
        imgAlt.toLowerCase().includes("testing");
      blocks.push({
        type: isInfographic ? "infographic" : "image",
        text: `${imgUrl}|${imgAlt}`,
      });
      i++;
      continue;
    }

    // Callouts / Highlights (> [!NOTE] or > [!TIP])
    if (trimmed.startsWith("> [!NOTE]") || trimmed.startsWith("> [!TIP]") || trimmed.startsWith("> [!IMPORTANT]")) {
      flushBlock();
      const calloutLines = [];
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith(">") || lines[j].trim() === "")) {
        const cleanedLine = lines[j].trim().replace(/^>\s?\[!(NOTE|TIP|IMPORTANT)\]\s?/, "").replace(/^>\s?/, "");
        if (cleanedLine) calloutLines.push(cleanedLine);
        j++;
      }
      blocks.push({
        type: "highlight",
        text: calloutLines.join("\n").trim(),
      });
      i = j;
      continue;
    }

    // Code blocks (e.g. Pipeline sequence with ➔)
    if (trimmed.startsWith("```")) {
      flushBlock();
      const codeLines = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith("```")) {
        codeLines.push(lines[j]);
        j++;
      }
      const codeContent = codeLines.join("\n").trim();
      if (codeContent) {
        blocks.push({
          type: "code",
          text: codeContent,
        });
      }
      i = j + 1;
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

const mdPath = path.join(process.cwd(), ".seo cluster", "articles", "article_19.md");
const rawMd = fs.readFileSync(mdPath, "utf-8");
const contentBlocks = parseMarkdownToBlocks(rawMd);

const articleData = {
  slug: "amazon-3d-product-renders",
  title: "How 3D Product Renders Accelerate Amazon Launch Timelines",
  excerpt:
    "Master the parallel 3D rendering pipeline for Amazon. Learn how creating digital assets from CAD files during manufacturing eliminates 3-to-5 weeks of launch delays.",
  category: "Listing Optimization",
  tags: [
    "amazon 3d product renders",
    "product launch rendering",
    "amazon 3d product rendering agency",
    "pre launch product images amazon",
    "fast amazon listing creation",
    "Amazon listing optimization",
    "Amazon launch strategy",
  ],
  coverImage: "/images/article image/19/amazon-3d-product-renders-hero.avif",
  metaTitle: "How 3D Product Renders Accelerate Amazon Launch Timelines",
  metaDescription:
    "Learn how Amazon 3D product renders eliminate photography bottlenecks by parallel-processing listing images, A+ Content, and PickFu testing during manufacturing.",
  date: "2026-11-03",
  readTime: "7 min read",
  author: {
    name: "Talha Waseem",
    role: "Technical Strategist",
    avatar:
      "https://res.cloudinary.com/dciggvulg/image/upload/v1786712729/groworbit/authors/talha-waseem-avatar.jpg",
  },
  featured: false,
  status: "published",
  upvotes: 0,
  content: contentBlocks,
  updatedAt: new Date().toISOString(),
};

async function pushArticle() {
  console.log(`Parsed content blocks count: ${contentBlocks.length}`);
  const blockTypes = contentBlocks.reduce((acc, b) => {
    acc[b.type] = (acc[b.type] || 0) + 1;
    return acc;
  }, {});
  console.log("Block types distribution:", blockTypes);

  console.log(`Pushing article "${articleData.title}" (${contentBlocks.length} content blocks)...`);
  const docRef = doc(db, "blogs", articleData.slug);
  await setDoc(docRef, articleData);
  console.log(`SUCCESS: Article published to Firestore at blogs/${articleData.slug}`);
  process.exit(0);
}

pushArticle().catch((err) => {
  console.error("FAILED to push article:", err);
  process.exit(1);
});

