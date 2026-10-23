import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const heroSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\article_17_hero_viewport_1792782585208.jpg';
const budgetSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\article_17_budget_diagram_1792782642004.jpg';

const targetDir = path.join(process.cwd(), 'public', 'images', 'article image', '17');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const heroDest = path.join(targetDir, 'amazon-product-rendering-pricing-hero.avif');
const budgetDest = path.join(targetDir, 'amazon-3d-rendering-package-budget-breakdown.avif');

async function processImages() {
  console.log('Processing hero image to AVIF...');
  await sharp(heroSrc)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(heroDest);
  const heroStat = fs.statSync(heroDest);
  console.log(`Hero image saved: ${heroDest} (${(heroStat.size / 1024).toFixed(1)} KB)`);

  console.log('Processing budget breakdown infographic to AVIF...');
  await sharp(budgetSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(budgetDest);
  const budgetStat = fs.statSync(budgetDest);
  console.log(`Budget diagram saved: ${budgetDest} (${(budgetStat.size / 1024).toFixed(1)} KB)`);

  console.log('SUCCESS: All images converted and compressed to AVIF!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
