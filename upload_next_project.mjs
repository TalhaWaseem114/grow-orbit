import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'dciggvulg',
  api_key: '854727634599877',
  api_secret: 'dF3EG3ZVEkGRV0esvJmjgziOggk'
});

const NEW_UPLOAD_DIR = path.join(process.cwd(), 'public', 'newUpload');

const PROJECT_NAME = 'neogrid_hand_grip';

// Mapping rules based on user's screenshot
const renameMap = {
  "main image.png": "main_image.png",
  "Artboard 1 (4).png": "2.png",
  "Artboard 2 (4).png": "3.png",
  "Artboard 3 (4).png": "4.png",
  "Artboard 4 (4).png": "5.png",
  "Artboard 5 (4).png": "6.png",
  "Artboard 6 (3).png": "7.png",
  
  "Artboard 1 (5).png": "aplus-1.png",
  "Artboard 2 (5).png": "aplus-2.png",
  "Artboard 3 (5).png": "aplus-3.png",
  "Artboard 4 (5).png": "aplus-4.png",
  "Artboard 5 (5).png": "aplus-5.png",
  "Artboard 6 (4).png": "aplus-6.png",
  "Artboard 7 (4).png": "aplus-7.png",
  "Artboard 8 (2).png": "aplus-8.png",
};

async function run() {
  const files = fs.readdirSync(NEW_UPLOAD_DIR).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} images to process.`);

  let urls = [];

  for (const file of files) {
    const newName = renameMap[file] || file.replace(/ /g, '_');
    const oldPath = path.join(NEW_UPLOAD_DIR, file);
    const newPath = path.join(NEW_UPLOAD_DIR, newName);

    // Rename file
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: "${file}" -> "${newName}"`);
    }

    // Upload to Cloudinary
    const publicId = `grow_orbit_portfolio/${PROJECT_NAME}/${newName.replace('.png', '')}`;
    console.log(`Uploading ${newName}...`);
    try {
      const result = await cloudinary.uploader.upload(newPath, {
        public_id: publicId,
        overwrite: true
      });
      console.log(`Uploaded: ${result.secure_url}`);
      urls.push({ name: newName, url: result.secure_url });
      
      // Delete local file
      fs.unlinkSync(newPath);
      console.log(`Deleted local file: ${newName}`);
    } catch (e) {
      console.error(`Failed to upload ${newName}`, e);
    }
  }
  
  // Write URLs to file
  if (urls.length > 0) {
    const reportPath = path.join(NEW_UPLOAD_DIR, 'uploaded_urls.txt');
    let reportContent = '## Uploaded URLs for Neogrid Hand Grip\n\n';
    
    // Group by listing vs aplus
    const listing = urls.filter(u => !u.name.includes('aplus')).sort((a,b) => a.name.localeCompare(b.name));
    const aplus = urls.filter(u => u.name.includes('aplus')).sort((a,b) => a.name.localeCompare(b.name));
    
    reportContent += '### Listing Images\n';
    listing.forEach(u => reportContent += `- ${u.name}: ${u.url}\n`);
    
    reportContent += '\n### A+ Content\n';
    aplus.forEach(u => reportContent += `- ${u.name}: ${u.url}\n`);
    
    fs.writeFileSync(reportPath, reportContent, 'utf-8');
    console.log(`\nSuccess! URLs written to ${reportPath}`);
  }
}

run();
