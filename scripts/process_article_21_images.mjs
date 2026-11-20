import sharp from "sharp";
import fs from "fs";
import path from "path";

const userUploadedDir = "C:\\Users\\Shahr\\.gemini\\antigravity\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\.user_uploaded";
const targetDir = path.join(process.cwd(), "public", "images", "article image", "21");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function processImages() {
  const heroSrc = path.join(userUploadedDir, "media_1795172160617_2f1961bb.jpg");
  const economicsSrc = path.join(userUploadedDir, "media_1795172115481_7c9e777c.png");
  const pillarsSrc = path.join(userUploadedDir, "media_1795172115460_e11ada9d.png");

  console.log(`Processing Hero Image from: ${heroSrc}`);
  console.log(`Processing Economics Chart from: ${economicsSrc}`);
  console.log(`Processing Four Pillars Diagram from: ${pillarsSrc}`);

  const heroDest = path.join(targetDir, "amazon-conversion-rate-optimization-beats-bid-optimization-hero.avif");
  const economicsDest = path.join(targetDir, "amazon-cro-economics-cpa-cvr-financial-model.avif");
  const pillarsDest = path.join(targetDir, "amazon-cro-four-pillars-continuous-optimization-framework.avif");

  // 1. Hero Image
  console.log("Converting & compressing Hero image to AVIF...");
  await sharp(heroSrc)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(heroDest);
  console.log(`Hero image saved: ${(fs.statSync(heroDest).size / 1024).toFixed(1)} KB`);

  // 2. Economics Chart (clean diagram/chart, preserve sharpness)
  console.log("Converting & compressing Economics chart to AVIF...");
  await sharp(economicsSrc)
    .resize(1600, null, { withoutEnlargement: true })
    .avif({ quality: 85, effort: 6 })
    .toFile(economicsDest);
  console.log(`Economics chart saved: ${(fs.statSync(economicsDest).size / 1024).toFixed(1)} KB`);

  // 3. Four Pillars Diagram
  console.log("Converting & compressing Four Pillars diagram to AVIF...");
  await sharp(pillarsSrc)
    .resize(1600, null, { withoutEnlargement: true })
    .avif({ quality: 85, effort: 6 })
    .toFile(pillarsDest);
  console.log(`Four Pillars diagram saved: ${(fs.statSync(pillarsDest).size / 1024).toFixed(1)} KB`);

  console.log("SUCCESS: All Article 21 images converted and compressed to AVIF in public/images/article image/21/!");
}

processImages().catch((err) => {
  console.error("Error processing images:", err);
  process.exit(1);
});
