import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALi7uZIVIYO_Tomfc0PFDzV-YBMr5XFRg",
  authDomain: "groworbit-9b75a.firebaseapp.com",
  projectId: "groworbit-9b75a",
  storageBucket: "groworbit-9b75a.firebasestorage.app",
  messagingSenderId: "729990203843",
  appId: "1:729990203843:web:5f84f4989c87d452de1576",
  measurementId: "G-6TGTYN8XX4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const articlePath = path.resolve(".seo cluster/articles/article_3.md");
const rawContent = fs.readFileSync(articlePath, "utf-8");

// Parse frontmatter
const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!match) {
  console.error("Failed to parse frontmatter");
  process.exit(1);
}

const frontmatterStr = match[1];
const bodyContent = match[2].trim();

const frontmatter = {};
frontmatterStr.split("\n").forEach(line => {
  const parts = line.split(":");
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join(":").trim().replace(/^["']|["']$/g, "");
    frontmatter[key] = val;
  }
});

// Normalize body content
const normalized = bodyContent
  .replace(/\r\n/g, "\n")
  .replace(/^(#{2,4}\s+[^\n]+)\n(?!\n)/gm, "$1\n\n");

const rawBlocks = normalized.split(/\n\n+/).filter(Boolean);

const blocks = [];
for (let i = 0; i < rawBlocks.length; i++) {
  const text = rawBlocks[i].trim();
  if (!text) continue;

  // Skip top-level # title if it matches article title
  if (text.startsWith("# ") && !text.startsWith("## ")) {
    continue;
  }

  // Skip metadata date line if standalone
  if (text.startsWith("*Last updated:") || text.startsWith("*Last reviewed:")) {
    continue;
  }

  // Defensive: split if heading has newline
  if (/^#{1,4}\s+/.test(text) && text.includes("\n")) {
    const lines = text.split("\n");
    const headingLine = lines[0].trim();
    const remainingText = lines.slice(1).join("\n").trim();
    
    // Add heading
    let hType = "heading";
    if (headingLine.startsWith("#### ")) hType = "heading-h4";
    else if (headingLine.startsWith("### ")) hType = "heading-h3";
    blocks.push({ type: hType, text: headingLine.replace(/^#{1,4}\s*/, "") });

    // Handle remaining
    if (remainingText) {
      let rType = "paragraph";
      if (remainingText.startsWith("- ") || remainingText.startsWith("* ")) rType = "list";
      blocks.push({ type: rType, text: remainingText });
    }
    continue;
  }

  let type = "paragraph";
  let cleanedText = text;

  if (text === "---") {
    type = "divider";
    cleanedText = "";
  } else if (text.startsWith("💡 ")) {
    type = "highlight";
    cleanedText = text.replace(/^💡\s*/, "");
  } else if (text.startsWith("> [!IMPORTANT]") || text.startsWith("> [!NOTE]") || text.startsWith("> [!TIP]") || text.startsWith("> [!WARNING]")) {
    type = "highlight";
    cleanedText = text.replace(/^>\s*\[!.*?\]\s*(?:\*\*.*?\*\*:?)?\s*/i, "").replace(/^>\s*/gm, "");
  } else if (text.startsWith("> ")) {
    type = "quote";
    cleanedText = text.replace(/^>\s*/gm, "");
  } else if (text.startsWith("@[youtube")) {
    type = "youtube";
    const m = text.match(/@\[youtube(?:\|(.*?))?\]\((.*?)\)/);
    cleanedText = m ? `${m[2]}|${m[1] || "Embedded Video"}` : "";
  } else if (text.startsWith("%%CTA|")) {
    type = "cta";
    cleanedText = text.replace(/^%%CTA\|/, "").replace(/%%$/, "");
  } else if (text.startsWith("#### ")) {
    type = "heading-h4";
    cleanedText = text.replace(/^####\s*/, "");
  } else if (text.startsWith("### ")) {
    type = "heading-h3";
    cleanedText = text.replace(/^###\s*/, "");
  } else if (text.startsWith("## ")) {
    type = "heading";
    cleanedText = text.replace(/^##\s*/, "");
  } else if (text.startsWith("![")) {
    type = "image";
    const m = text.match(/!\[(.*?)\]\((.*?)\)/);
    cleanedText = m ? `${m[2]}|${m[1] || "Blog Image"}` : "";
  } else if (text.startsWith("- ") || text.startsWith("* ")) {
    type = "list";
    cleanedText = text;
  } else if (text.startsWith("|")) {
    type = "table";
    cleanedText = text;
  }

  blocks.push({ type, text: cleanedText });
}

const wordCount = bodyContent.split(/\s+/).filter(Boolean).length;
const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;

const slug = frontmatter.slug || "amazon-mobile-image-optimization";

const postData = {
  slug: slug,
  title: frontmatter.title || "Amazon Mobile Image Optimization: How to Design Product Images for Small Screens",
  excerpt: frontmatter.meta_description || "Master Amazon mobile image optimization. Learn the GS1 Mobile Ready Hero Image standard, the 3-second squint test, infographic hierarchy & mobile A/B testing.",
  category: "Main Image CTR",
  tags: [
    "Amazon Mobile Optimization",
    "Mobile Ready Hero Image",
    "Listing Optimization",
    "Main Image CTR",
    "Amazon Conversion Rate"
  ],
  coverImage: frontmatter.cover_image || "/images/article image/5/amazon-mobile-image-optimization.jpg",
  date: "2026-09-08",
  lastModified: "2026-09-08",
  readTime: readTime,
  author: {
    name: "Talha Waseem",
    role: "Technical Strategist",
    avatar: "https://res.cloudinary.com/dciggvulg/image/upload/v1786712729/groworbit/authors/talha-waseem-avatar.jpg"
  },
  status: "published",
  featured: false,
  views: 0,
  content: blocks
};

console.log("Publishing article to Firestore with ID:", slug);
console.log("Total Blocks:", blocks.length);
console.log("Sample blocks around squint test:");
blocks.forEach((b, idx) => {
  if (b.text.includes("Squint Test") || (idx > 0 && blocks[idx-1].text.includes("Squint Test"))) {
    console.log(`Block ${idx} [${b.type}]:`, b.text.slice(0, 80));
  }
});

setDoc(doc(db, "blogs", slug), postData)
  .then(() => {
    console.log("SUCCESS: Article #3 published cleanly to Firestore!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERROR publishing article:", err);
    process.exit(1);
  });
