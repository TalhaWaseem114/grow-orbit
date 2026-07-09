const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
        console.log('Deleted file:', curPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log('Deleted folder:', folderPath);
  } else {
    console.log('Not found:', folderPath);
  }
}

const base = 'D:\\web\\Grow Orbit\\grow orbit\\nextjs\\src\\app';

const toDelete = [
  base + '\\api\\contracts\\%5Bid%5D',
  base + '\\api\\public\\contracts\\%5Btoken%5D',
  base + '\\sign\\%5Btoken%5D',
];

toDelete.forEach(deleteFolderRecursive);
console.log('All done!');
