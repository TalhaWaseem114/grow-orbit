import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'dciggvulg',
  api_key: '854727634599877',
  api_secret: 'dF3EG3ZVEkGRV0esvJmjgziOggk'
});

const PORTFOLIO_FILE = 'src/data/portfolioData.js';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function uploadImage(localPath) {
  const fullPath = path.join(PUBLIC_DIR, localPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return null;
  }
  try {
    console.log(`Uploading ${localPath}...`);
    // Example localPath: /assets/portfolio/nexa pouches/main image.png
    // We want the public_id to be something like: grow_orbit_portfolio/nexa_pouches/main_image
    
    // Remove the leading slash and extension, then replace spaces with underscores
    let publicId = localPath.replace(/^\//, '').replace(/\.[^/.]+$/, '').replace(/ /g, '_');
    
    // publicId becomes: assets/portfolio/nexa_pouches/main_image
    // Let's prepend grow_orbit_portfolio/ to keep it isolated
    publicId = `grow_orbit_portfolio/${publicId}`;

    const result = await cloudinary.uploader.upload(fullPath, {
      public_id: publicId,
      overwrite: true
    });
    console.log(`Uploaded! URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error);
    return null;
  }
}

async function run() {
  let content = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
  
  // Find all matches for "/assets/portfolio/something.ext"
  const regex = /"(\/assets\/portfolio\/[^"]+)"/g;
  
  const matches = [...content.matchAll(regex)];
  // Get unique paths
  const uniquePaths = [...new Set(matches.map(m => m[1]))];
  
  console.log(`Found ${uniquePaths.length} unique local images to upload.`);
  
  let changesMade = 0;
  for (const localPath of uniquePaths) {
    const cloudinaryUrl = await uploadImage(localPath);
    if (cloudinaryUrl) {
      // Replace all occurrences in the content
      content = content.split(`"${localPath}"`).join(`"${cloudinaryUrl}"`);
      changesMade++;
    }
  }
  
  if (changesMade > 0) {
    fs.writeFileSync(PORTFOLIO_FILE, content, 'utf-8');
    console.log(`Successfully updated ${changesMade} image paths in portfolioData.js!`);
  } else {
    console.log("No changes made to portfolioData.js");
  }
}

run();
