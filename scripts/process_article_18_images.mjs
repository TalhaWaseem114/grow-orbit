import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const heroSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\article_18_hero_1793132939866.jpg';
const wireframeSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\article_18_wireframe_1793132984954.jpg';
const explodedSrc = 'C:\\Users\\Shahr\\.gemini\\antigravity-ide\\brain\\322c3c45-eeb0-4995-b47f-a3b6ae75e769\\article_18_exploded_1793132960867.jpg';

const targetDir = path.join(process.cwd(), 'public', 'images', 'article image', '18');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const heroDest = path.join(targetDir, 'amazon-3d-rendering-photorealistic-hero.avif');
const wireframeDest = path.join(targetDir, 'photorealistic-3d-render-cad-wireframe-comparison.avif');
const explodedDest = path.join(targetDir, 'amazon-3d-product-exploded-view.avif');

async function processImages() {
  console.log('Processing hero image to AVIF...');
  await sharp(heroSrc)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(heroDest);
  const heroStat = fs.statSync(heroDest);
  console.log(`Hero image saved: ${heroDest} (${(heroStat.size / 1024).toFixed(1)} KB)`);

  console.log('Processing wireframe-to-render comparison to AVIF...');
  await sharp(wireframeSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(wireframeDest);
  const wireframeStat = fs.statSync(wireframeDest);
  console.log(`Wireframe comparison saved: ${wireframeDest} (${(wireframeStat.size / 1024).toFixed(1)} KB)`);

  console.log('Processing exploded view diagram to AVIF...');
  await sharp(explodedSrc)
    .resize(1400, null, { withoutEnlargement: true })
    .avif({ quality: 80, effort: 6 })
    .toFile(explodedDest);
  const explodedStat = fs.statSync(explodedDest);
  console.log(`Exploded view saved: ${explodedDest} (${(explodedStat.size / 1024).toFixed(1)} KB)`);

  console.log('SUCCESS: All Article 18 images converted and compressed to AVIF!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
