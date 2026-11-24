import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = path.join(process.cwd(), 'public', 'images', 'article image', '22');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToProcess = [
  {
    // User image 2: Leaky bucket vs Fix creative headphones (Hero)
    src: 'C:/Users/Shahr/.gemini/antigravity/brain/322c3c45-eeb0-4995-b47f-a3b6ae75e769/.user_uploaded/media_1795509291627_95b21ca8.jpg',
    dest: path.join(targetDir, 'why-scaling-ppc-before-fixing-creative-burns-budget-hero.avif'),
    width: 1440,
  },
  {
    // User image 3: Leaky bucket + 5% vs 10% CVR laptop + Retail Readiness Checklist
    src: 'C:/Users/Shahr/.gemini/antigravity/brain/322c3c45-eeb0-4995-b47f-a3b6ae75e769/.user_uploaded/media_1795509299546_4be030bf.jpg',
    dest: path.join(targetDir, 'amazon-retail-readiness-checklist-leaky-bucket-cvr-model.avif'),
    width: 1440,
  },
  {
    // User image 1: See-saw balance scale PPC Bid Optimization vs Creative & CRO
    src: 'C:/Users/Shahr/.gemini/antigravity/brain/322c3c45-eeb0-4995-b47f-a3b6ae75e769/.user_uploaded/media_1795509282986_33ea274d.jpg',
    dest: path.join(targetDir, 'amazon-ppc-bid-optimization-vs-creative-cro-balance-scale.avif'),
    width: 1440,
  }
];

async function processImages() {
  for (const img of imagesToProcess) {
    console.log(`Processing: ${img.src} -> ${img.dest}`);
    const metadata = await sharp(img.src).metadata();
    console.log(`Original: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

    await sharp(img.src)
      .resize({ width: Math.min(metadata.width, img.width), withoutEnlargement: true })
      .avif({ quality: 80, effort: 6 })
      .toFile(img.dest);

    const stats = fs.statSync(img.dest);
    console.log(`Converted to AVIF successfully! Size: ${(stats.size / 1024).toFixed(2)} KB`);
  }
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
