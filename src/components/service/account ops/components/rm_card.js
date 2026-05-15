const fs = require('fs');

const file = 'OpsHero.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find the start and end of the block
const startStr = '<div className="absolute bottom-[-90px]';
const startIndex = content.indexOf(startStr);

if (startIndex !== -1) {
  // We know it ends with several divs, so we can just delete from startIndex to the next </div>\n          </div>
  const match = content.substring(startIndex, startIndex + 1000);
  // Just use regex to replace that specific block
  content = content.replace(/<div className="absolute bottom-\[-90px\][\s\S]*?<\/div>[\s\n]*<\/div>[\s\n]*<\/div>/, '</div>\n        </div>');
  
  // Or simpler, just delete lines manually:
}

// better way:
const lines = content.split('\n');
const newLines = lines.filter((line, i) => i < 201 || i > 217);

fs.writeFileSync(file, newLines.join('\n'));
console.log("Done");
