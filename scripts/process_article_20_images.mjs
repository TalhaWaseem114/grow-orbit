import sharp from "sharp";
import fs from "fs";
import path from "path";

const brainDir = "C:\\Users\\Shahr\\.gemini\\antigravity\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769";
const targetDir = path.join(process.cwd(), "public", "images", "article image", "20");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function findLatestImage(prefix) {
  const files = fs.readdirSync(brainDir);
  const matching = files
    .filter((f) => f.startsWith(prefix) && (f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".jpeg")))
    .map((f) => ({
      name: f,
      fullPath: path.join(brainDir, f),
      mtime: fs.statSync(path.join(brainDir, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (matching.length === 0) {
    throw new Error(`No image found matching prefix: ${prefix} in ${brainDir}`);
  }
  return matching[0].fullPath;
}

async function processImages() {
  const heroSrc = await findLatestImage("article_20_hero");
  const formulaSrc = await findLatestImage("article_20_formula");
  const decisionTreeSrc = await findLatestImage("article_20_decision_tree");

  console.log(`Found Hero image: ${heroSrc}`);
  console.log(`Found Formula image: ${formulaSrc}`);
  console.log(`Found Decision Tree image: ${decisionTreeSrc}`);

  const heroDest = path.join(targetDir, "amazon-acos-too-high-creative-fix-hero.avif");
  const formulaDest = path.join(targetDir, "acos-cvr-mathematical-relationship-formula-breakdown.avif");
  const decisionTreeDest = path.join(targetDir, "amazon-acos-diagnostic-decision-tree-audit.avif");

  console.log("Converting & compressing Hero image to AVIF...");
  await sharp(heroSrc)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(heroDest);
  console.log(`Hero image saved (${(fs.statSync(heroDest).size / 1024).toFixed(1)} KB)`);

  console.log("Converting & compressing Formula diagram to AVIF...");
  await sharp(formulaSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(formulaDest);
  console.log(`Formula diagram saved (${(fs.statSync(formulaDest).size / 1024).toFixed(1)} KB)`);

  console.log("Converting & compressing Decision Tree to AVIF...");
  await sharp(decisionTreeSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(decisionTreeDest);
  console.log(`Decision Tree saved (${(fs.statSync(decisionTreeDest).size / 1024).toFixed(1)} KB)`);

  console.log("SUCCESS: All Article 20 images converted and compressed to AVIF in public/images/article image/20/!");
}

processImages().catch((err) => {
  console.error("Error processing images:", err);
  process.exit(1);
});

