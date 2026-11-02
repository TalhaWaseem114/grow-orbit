import sharp from "sharp";
import fs from "fs";
import path from "path";

const heroSrc = "C:\\Users\\Shahr\\.gemini\\antigravity\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\amazon_3d_render_hero_1793648179032.jpg";
const timelineSrc = "C:\\Users\\Shahr\\.gemini\\antigravity\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\amazon_3d_vs_traditional_timeline_1793648195641.jpg";
const anglesSrc = "C:\\Users\\Shahr\\.gemini\\antigravity\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\amazon_3d_render_angles_ab_test_1793648238909.jpg";

const targetDir = path.join(process.cwd(), "public", "images", "article image", "19");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const heroDest = path.join(targetDir, "amazon-3d-product-renders-hero.avif");
const timelineDest = path.join(targetDir, "amazon-launch-timeline-3d-parallel-pipeline.avif");
const anglesDest = path.join(targetDir, "3d-render-pre-launch-ab-testing-pickfu.avif");

async function processImages() {
  console.log("Processing hero image to AVIF...");
  await sharp(heroSrc)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(heroDest);
  const heroStat = fs.statSync(heroDest);
  console.log(`Hero image saved: ${heroDest} (${(heroStat.size / 1024).toFixed(1)} KB)`);

  console.log("Processing timeline diagram to AVIF...");
  await sharp(timelineSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(timelineDest);
  const timelineStat = fs.statSync(timelineDest);
  console.log(`Timeline diagram saved: ${timelineDest} (${(timelineStat.size / 1024).toFixed(1)} KB)`);

  console.log("Processing pre-launch angles comparison to AVIF...");
  await sharp(anglesSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(anglesDest);
  const anglesStat = fs.statSync(anglesDest);
  console.log(`Angles comparison saved: ${anglesDest} (${(anglesStat.size / 1024).toFixed(1)} KB)`);

  console.log("SUCCESS: All Article 19 images converted and compressed to AVIF!");
}

processImages().catch((err) => {
  console.error("Error processing images:", err);
  process.exit(1);
});

