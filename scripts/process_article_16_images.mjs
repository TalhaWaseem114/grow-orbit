import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const heroSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\hero_3d_render_vs_photo_clean_1792518502886.jpg';
const compSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\comparison_photo_vs_3d_render_1792517374068.jpg';

const targetDir = path.join(process.cwd(), 'public', 'images', 'article image', '16');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const heroDest = path.join(targetDir, 'product-rendering-vs-product-photography.avif');
const compDest = path.join(targetDir, '3d-render-vs-product-photography-comparison.avif');

async function processImages() {
  console.log('Processing hero image to AVIF...');
  await sharp(heroSrc)
    .resize(1200, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(heroDest);
  const heroStat = fs.statSync(heroDest);
  console.log(`Hero image saved: ${heroDest} (${(heroStat.size / 1024).toFixed(1)} KB)`);

  console.log('Processing comparison diagram to AVIF...');
  await sharp(compSrc)
    .resize(1200, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(compDest);
  const compStat = fs.statSync(compDest);
  console.log(`Comparison image saved: ${compDest} (${(compStat.size / 1024).toFixed(1)} KB)`);

  console.log('SUCCESS: All images converted and compressed to AVIF!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
