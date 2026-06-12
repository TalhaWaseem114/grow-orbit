const fs = require('fs');

const path = 'src/app/(main)/portfolio/[id]/PortfolioClient.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace all <img with <SmartImage
content = content.replace(/<img /g, '<SmartImage ');

// 2. Add SmartImage definition
const smartImageDef = `
/* ─── SMART IMAGE COMPONENT ─── */
function SmartImage({ src, alt, className, style, onClick }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-50/80 flex items-center justify-center z-0 pointer-events-none">
          <div className="w-5 h-5 border-2 border-zinc-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || ""}
        className={\`\${className || ""} transition-opacity duration-500 z-10 \${loaded ? "opacity-100" : "opacity-0"}\`}
        style={style}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
`;

content = content.replace('/* ─── LIGHTBOX ─── */', smartImageDef + '\n/* ─── LIGHTBOX ─── */');

// 3. Fix Lightbox relative container
content = content.replace(
    /<SmartImage src=\{image\.src\}.*?onClick=\{e => e\.stopPropagation\(\)\}.*?\/>/,
    `<div className="relative max-w-full max-h-[88vh] flex items-center justify-center rounded-2xl overflow-hidden">\n        <SmartImage src={image.src} alt={image.label} className="max-w-full max-h-[88vh] object-contain" onClick={e => e.stopPropagation()} />\n      </div>`
);

// 4. Fix MainImageCTRDisplay thumbnails relative container
content = content.replace(
    /<div className=\{\`w-20 h-20 bg-white rounded-xl overflow-hidden border-2 mb-1\.5/g,
    '<div className={`relative w-20 h-20 bg-white rounded-xl overflow-hidden border-2 mb-1.5'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
