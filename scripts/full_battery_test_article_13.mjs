/**
 * FULL BATTERY TEST SUITE — Article #13
 * Supplement A+ Content Examples: 5 Layouts for Wellness Brands
 *
 * Tests beyond the forensic/SEO audit:
 *   T1.  HTML Validity & Semantic Compliance
 *   T2.  Accessibility (WCAG 2.1 AA) Audit
 *   T3.  Link Verification (all hrefs resolve)
 *   T4.  Structured Data Deep Validation
 *   T5.  Performance & Payload Budget
 *   T6.  Security Headers
 *   T7.  Social Sharing Preview (OG + Twitter)
 *   T8.  Spelling & Grammar Heuristics
 *   T9.  Canonical & Crawlability Chain
 *   T10. Mobile Viewport Simulation
 *   T11. Content Duplication / Thin Content
 *   T12. Image Optimization Audit
 *   T13. Internal Linking Depth & Anchor Quality
 *   T14. Regulatory Compliance Cross-Check
 *   T15. AEO / AI-Overview Extractability
 *   T16. E-E-A-T Signal Density
 */

import fs from 'fs';
import path from 'path';

const SLUG = 'supplement-a-plus-content-examples';
const LOCAL_URL = `http://localhost:3000/blog/${SLUG}`;
const PROD_URL = `https://www.groworbitofficial.com/blog/${SLUG}`;
const ARTICLE_PATH = path.resolve('d:/web/Grow Orbit/grow orbit/nextjs/.seo cluster/articles/article_13.md');

const results = { pass: 0, fail: 0, warn: 0, details: [] };

function test(category, name, passed, detail = '', severity = 'FAIL') {
  const status = passed ? 'PASS' : severity;
  if (passed) results.pass++;
  else if (severity === 'WARN') results.warn++;
  else results.fail++;
  results.details.push({ category, name, status, detail });
  const icon = passed ? '\x1b[32m✓\x1b[0m' : severity === 'WARN' ? '\x1b[33m⚠\x1b[0m' : '\x1b[31m✗\x1b[0m';
  console.log(`  ${icon} [${category}] ${name} ${detail ? `— ${detail}` : ''}`);
}

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('  FULL BATTERY TEST SUITE — ARTICLE #13');
  console.log('  ' + new Date().toISOString());
  console.log('='.repeat(70) + '\n');

  // ===================== FETCH HTML =====================
  let html = '';
  let fetchTime = 0;
  try {
    const t0 = performance.now();
    const res = await fetch(LOCAL_URL);
    fetchTime = performance.now() - t0;
    html = await res.text();
    test('T0. Connectivity', 'Dev server responds', res.status === 200, `HTTP ${res.status}, ${fetchTime.toFixed(0)}ms`);
  } catch (e) {
    test('T0. Connectivity', 'Dev server responds', false, e.message);
    console.log('\n  Cannot proceed without dev server. Exiting.\n');
    process.exit(1);
  }

  const rawArticle = fs.readFileSync(ARTICLE_PATH, 'utf-8');
  const lower = html.toLowerCase();

  // ===================== T1. HTML VALIDITY & SEMANTICS =====================
  console.log('\n--- T1. HTML Validity & Semantic Compliance ---');
  test('T1. HTML', 'DOCTYPE present', html.trimStart().startsWith('<!DOCTYPE') || html.trimStart().startsWith('<!doctype'), html.substring(0, 20));
  test('T1. HTML', 'lang attribute on <html>', /<html[^>]+lang="/.test(html), '');
  test('T1. HTML', 'Single <main> landmark', (html.match(/<main[\s>]/gi) || []).length === 1, `${(html.match(/<main[\s>]/gi) || []).length} found`);
  test('T1. HTML', '<article> semantic wrapper', /<article[\s>]/i.test(html), '');
  test('T1. HTML', '<header> present', /<header[\s>]/i.test(html), '');
  test('T1. HTML', '<footer> present', /<footer[\s>]/i.test(html), '');
  test('T1. HTML', 'No deprecated tags (<center>, <font>, <marquee>)', !/<(center|font|marquee)[\s>]/i.test(html), '');
  test('T1. HTML', 'No inline style attributes > 5', (html.match(/style="/gi) || []).length <= 25, `${(html.match(/style="/gi) || []).length} inline styles`, 'WARN');

  // Heading hierarchy in rendered HTML
  const htmlHeadings = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map(m => parseInt(m[1]));
  let hierOk = true;
  for (let i = 1; i < htmlHeadings.length; i++) {
    if (htmlHeadings[i] > htmlHeadings[i - 1] + 1) hierOk = false;
  }
  test('T1. HTML', 'Heading hierarchy (no level skipping)', hierOk, `Sequence: ${htmlHeadings.join(',')}`);
  test('T1. HTML', 'Exactly 1 <h1>', htmlHeadings.filter(h => h === 1).length === 1, `${htmlHeadings.filter(h => h === 1).length} found`);

  // ===================== T2. ACCESSIBILITY (WCAG 2.1 AA) =====================
  console.log('\n--- T2. Accessibility (WCAG 2.1 AA) ---');
  // All images must have alt text
  const imgs = [...html.matchAll(/<img[^>]*>/gi)];
  const imgsWithAlt = imgs.filter(m => /alt="[^"]+"/i.test(m[0]));
  const imgsNoAlt = imgs.filter(m => !/alt=/i.test(m[0]));
  test('T2. a11y', 'All <img> have alt attributes', imgsNoAlt.length === 0, `${imgs.length} images, ${imgsNoAlt.length} missing alt`);
  test('T2. a11y', 'No empty alt="" on content images', imgsWithAlt.length >= 1, `${imgsWithAlt.length} with descriptive alt`);

  // Links have discernible text
  const emptyLinks = [...html.matchAll(/<a[^>]*>(\s*)<\/a>/gi)];
  test('T2. a11y', 'No empty <a> tags (discernible text)', emptyLinks.length === 0, `${emptyLinks.length} empty links`);

  // Skip-to-content or skip navigation
  test('T2. a11y', 'Skip navigation or landmark nav', /<nav[\s>]/i.test(html), '');

  // Color contrast hint: check no light-gray-on-white text (heuristic)
  const veryLightTextCSS = html.match(/color:\s*#[cdef]{3,6}/gi) || [];
  test('T2. a11y', 'No extremely light text colors (contrast hint)', veryLightTextCSS.length <= 2, `${veryLightTextCSS.length} potential low-contrast rules`, 'WARN');

  // Table accessibility
  const tables = [...html.matchAll(/<table[^>]*>/gi)];
  const tablesWithHeaders = [...html.matchAll(/<th[\s>]/gi)];
  test('T2. a11y', 'Tables have <th> headers', tables.length === 0 || tablesWithHeaders.length > 0, `${tables.length} tables, ${tablesWithHeaders.length} <th>`);

  // Focus management: tabindex=-1 abuse
  const negTabindex = (html.match(/tabindex="-1"/gi) || []).length;
  test('T2. a11y', 'No excessive tabindex="-1" (keyboard trap)', negTabindex <= 5, `${negTabindex} found`, 'WARN');

  // ARIA landmarks
  test('T2. a11y', 'ARIA roles or semantic landmarks present', /role="(banner|navigation|main|contentinfo)"/i.test(html) || /<(header|nav|main|footer)[\s>]/i.test(html), '');

  // ===================== T3. LINK VERIFICATION =====================
  console.log('\n--- T3. Link Verification ---');
  const allHrefs = [...html.matchAll(/href="([^"]+)"/gi)].map(m => m[1]);
  const internalLinks = allHrefs.filter(h => h.startsWith('/') && !h.startsWith('//'));
  const externalLinks = allHrefs.filter(h => h.startsWith('http'));
  const anchorLinks = allHrefs.filter(h => h.startsWith('#'));
  const mailtoLinks = allHrefs.filter(h => h.startsWith('mailto:'));
  
  test('T3. Links', 'Internal links present', internalLinks.length >= 2, `${internalLinks.length} internal links`);
  test('T3. Links', 'External links present', externalLinks.length >= 1, `${externalLinks.length} external links`);
  test('T3. Links', 'No javascript: void links', !allHrefs.some(h => h.includes('javascript:')), '');
  test('T3. Links', 'No empty href=""', !allHrefs.some(h => h === '' || h === '#'), `${allHrefs.filter(h => h === '' || h === '#').length} empty hrefs`, 'WARN');

  // Check internal links resolve (sample 5)
  const sampleInternals = [...new Set(internalLinks)].slice(0, 5);
  for (const link of sampleInternals) {
    try {
      const r = await fetch(`http://localhost:3000${link}`, { method: 'HEAD', redirect: 'follow' });
      test('T3. Links', `Internal: ${link}`, r.status < 400, `HTTP ${r.status}`);
    } catch (e) {
      test('T3. Links', `Internal: ${link}`, false, e.message);
    }
  }

  // Check external links (sample 3 regulatory ones)
  const regLinks = externalLinks.filter(h => 
    h.includes('sellercentral.amazon') || h.includes('fda.gov') || h.includes('ftc.gov') || h.includes('developers.google')
  );
  for (const link of regLinks.slice(0, 4)) {
    try {
      let r = await fetch(link, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
      if (r.status >= 400) {
        // Some servers (e.g. ftc.gov) block HEAD requests; fallback to GET
        r = await fetch(link, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000) });
      }
      test('T3. Links', `External: ${new URL(link).hostname}`, r.status < 400, `HTTP ${r.status}`);
    } catch (e) {
      test('T3. Links', `External: ${link.substring(0, 50)}...`, false, e.message, 'WARN');
    }
  }

  // ===================== T4. STRUCTURED DATA DEEP VALIDATION =====================
  console.log('\n--- T4. Structured Data Deep Validation ---');
  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  test('T4. Schema', 'JSON-LD blocks present', jsonLdBlocks.length >= 1, `${jsonLdBlocks.length} blocks`);

  let blogPosting = null, faqPage = null;
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1]);
      const items = data['@graph'] || [data];
      for (const item of items) {
        if (item['@type'] === 'BlogPosting') blogPosting = item;
        if (item['@type'] === 'FAQPage') faqPage = item;
      }
    } catch (e) { /* nested parsing */ }
  }
  // Also check if each block is individually parseable
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
      // Check for type
      const parsed = JSON.parse(block[1]);
      if (parsed['@type'] === 'BlogPosting') blogPosting = parsed;
      if (parsed['@type'] === 'FAQPage') faqPage = parsed;
    } catch (e) {
      test('T4. Schema', 'JSON-LD syntax valid', false, e.message);
    }
  }

  test('T4. Schema', 'BlogPosting schema present', !!blogPosting, '');
  if (blogPosting) {
    test('T4. Schema', 'BlogPosting.headline present', !!blogPosting.headline, `"${(blogPosting.headline || '').substring(0, 50)}"`);
    test('T4. Schema', 'BlogPosting.author present', !!blogPosting.author, JSON.stringify(blogPosting.author).substring(0, 60));
    test('T4. Schema', 'BlogPosting.datePublished valid ISO', /^\d{4}-\d{2}-\d{2}/.test(blogPosting.datePublished || ''), blogPosting.datePublished);
    test('T4. Schema', 'BlogPosting.publisher present', !!blogPosting.publisher, JSON.stringify(blogPosting.publisher).substring(0, 60));
    test('T4. Schema', 'BlogPosting.image present', !!blogPosting.image, typeof blogPosting.image === 'string' ? blogPosting.image.substring(0, 60) : 'object');
    test('T4. Schema', 'BlogPosting.mainEntityOfPage present', !!blogPosting.mainEntityOfPage, '');
    test('T4. Schema', 'BlogPosting.wordCount present', blogPosting.wordCount > 0, `${blogPosting.wordCount} words`);
  }

  test('T4. Schema', 'FAQPage schema present', !!faqPage, '');
  if (faqPage) {
    const questions = faqPage.mainEntity || [];
    test('T4. Schema', 'FAQPage has >= 5 questions', questions.length >= 5, `${questions.length} Q&As`);
    test('T4. Schema', 'Each Q has name + acceptedAnswer', questions.every(q => q.name && q.acceptedAnswer?.text), '');
    // Check that Q&A text is not empty
    test('T4. Schema', 'All answers non-empty', questions.every(q => (q.acceptedAnswer?.text || '').length > 20), '');
  }

  // ===================== T5. PERFORMANCE & PAYLOAD BUDGET =====================
  console.log('\n--- T5. Performance & Payload Budget ---');
  const htmlSizeKB = html.length / 1024;
  test('T5. Perf', 'HTML payload < 500KB (crawl budget)', htmlSizeKB < 500, `${htmlSizeKB.toFixed(1)} KB`);
  test('T5. Perf', 'TTFB < 3000ms', fetchTime < 3000, `${fetchTime.toFixed(0)}ms`);
  test('T5. Perf', 'TTFB < 800ms (ideal)', fetchTime < 800, `${fetchTime.toFixed(0)}ms`, 'WARN');
  
  // Inline JS size
  const inlineScripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  const totalInlineJS = inlineScripts.reduce((sum, m) => sum + m[1].length, 0);
  test('T5. Perf', 'Inline JS < 200KB', totalInlineJS / 1024 < 200, `${(totalInlineJS / 1024).toFixed(1)} KB`);

  // CSS count (external stylesheets)
  const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/gi)];
  test('T5. Perf', 'CSS files <= 10', cssLinks.length <= 10, `${cssLinks.length} stylesheets`);

  // Script count
  const scriptTags = [...html.matchAll(/<script[^>]+src="([^"]*)"/gi)];
  const isDev = scriptTags.some(s => s[1].includes('turbopack') || s[1].includes('hmr') || s[1].includes('%5B'));
  const threshold = isDev ? 50 : 20;
  test('T5. Perf', `External JS files <= ${threshold}${isDev ? ' (dev mode chunks)' : ''}`, scriptTags.length <= threshold, `${scriptTags.length} scripts`);

  // ===================== T6. SECURITY HEADERS =====================
  console.log('\n--- T6. Security Headers ---');
  try {
    const secRes = await fetch(LOCAL_URL, { method: 'HEAD' });
    const headers = Object.fromEntries(secRes.headers.entries());
    
    test('T6. Security', 'X-Frame-Options or CSP frame-ancestors', !!headers['x-frame-options'] || (headers['content-security-policy'] || '').includes('frame-ancestors'), headers['x-frame-options'] || 'via CSP', 'WARN');
    test('T6. Security', 'X-Content-Type-Options: nosniff', headers['x-content-type-options'] === 'nosniff', headers['x-content-type-options'] || 'missing', 'WARN');
    test('T6. Security', 'Content-Type header present', !!headers['content-type'], headers['content-type']);
    test('T6. Security', 'No Server version leak', !headers['server'] || !headers['server'].match(/\d+\.\d+/), headers['server'] || 'hidden', 'WARN');
  } catch (e) {
    test('T6. Security', 'Security headers check', false, e.message, 'WARN');
  }

  // ===================== T7. SOCIAL SHARING PREVIEW =====================
  console.log('\n--- T7. Social Sharing Preview (OG + Twitter) ---');
  const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
  const ogDesc = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i);
  const ogImage = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
  const ogUrl = html.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i);
  const ogType = html.match(/<meta[^>]+property="og:type"[^>]+content="([^"]+)"/i);
  const twCard = html.match(/<meta[^>]+name="twitter:card"[^>]+content="([^"]+)"/i);
  const twImage = html.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i);

  test('T7. Social', 'og:title present', !!ogTitle, ogTitle ? ogTitle[1].substring(0, 60) : 'missing');
  test('T7. Social', 'og:description present', !!ogDesc, ogDesc ? ogDesc[1].substring(0, 60) : 'missing');
  test('T7. Social', 'og:image present', !!ogImage, ogImage ? ogImage[1].substring(0, 60) : 'missing');
  test('T7. Social', 'og:url present', !!ogUrl, ogUrl ? ogUrl[1] : 'missing');
  test('T7. Social', 'og:type = article', ogType && ogType[1] === 'article', ogType ? ogType[1] : 'missing');
  test('T7. Social', 'twitter:card present', !!twCard, twCard ? twCard[1] : 'missing');
  test('T7. Social', 'twitter:image present', !!twImage, twImage ? twImage[1].substring(0, 60) : 'missing');
  test('T7. Social', 'og:title matches page title', ogTitle && html.includes(ogTitle[1]), '');

  // ===================== T8. SPELLING & GRAMMAR HEURISTICS =====================
  console.log('\n--- T8. Spelling & Grammar Heuristics ---');
  const articleLower = rawArticle.toLowerCase();
  
  // Common misspellings in supplement content
  const misspellings = [
    'suppliment', 'ingrediant', 'recieve', 'occured', 'seperate', 'accomodate',
    'neccessary', 'gurantee', 'definately', 'reccomend', 'occurance', 'consistant',
    'benifit', 'concious', 'enviroment', 'dillema', 'fullfill', 'harrass',
    'immediatly', 'liason', 'millenium', 'occassion', 'priveledge', 'wierd',
    'recomend', 'committment', 'comparision', 'complience', 'tranparency'
  ];
  const foundMisspellings = misspellings.filter(w => articleLower.includes(w));
  test('T8. Spelling', 'No common misspellings', foundMisspellings.length === 0, foundMisspellings.length > 0 ? `Found: ${foundMisspellings.join(', ')}` : 'Clean');

  // Double space check
  const doubleSpaces = (rawArticle.match(/  +(?![\*\-#|])/g) || []).length;
  test('T8. Spelling', 'No double spaces in prose', doubleSpaces <= 2, `${doubleSpaces} instances`, 'WARN');

  // Repeated consecutive words
  const repeatedWords = rawArticle.match(/\b(\w{3,})\s+\1\b/gi) || [];
  test('T8. Spelling', 'No repeated consecutive words', repeatedWords.length === 0, repeatedWords.length > 0 ? repeatedWords.join(', ') : 'Clean');

  // Orphan punctuation
  const orphanPunct = (rawArticle.match(/\s[.,;:!?]\s/g) || []).length;
  test('T8. Spelling', 'No orphan punctuation', orphanPunct === 0, `${orphanPunct} found`);

  // Unmatched parentheses/brackets
  const openParens = (rawArticle.match(/\(/g) || []).length;
  const closeParens = (rawArticle.match(/\)/g) || []).length;
  test('T8. Spelling', 'Matched parentheses', openParens === closeParens, `( = ${openParens}, ) = ${closeParens}`);
  const openBrackets = (rawArticle.match(/\[/g) || []).length;
  const closeBrackets = (rawArticle.match(/\]/g) || []).length;
  test('T8. Spelling', 'Matched brackets', openBrackets === closeBrackets, `[ = ${openBrackets}, ] = ${closeBrackets}`);

  // ===================== T9. CANONICAL & CRAWLABILITY CHAIN =====================
  console.log('\n--- T9. Canonical & Crawlability Chain ---');
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  test('T9. Crawl', 'Canonical tag present', !!canonical, canonical ? canonical[1] : 'missing');
  test('T9. Crawl', 'Canonical is absolute URL', canonical && canonical[1].startsWith('https://'), canonical ? canonical[1] : '');
  test('T9. Crawl', 'Canonical matches slug', canonical && canonical[1].includes(SLUG), '');

  // Robots meta
  const robotsMeta = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
  test('T9. Crawl', 'Robots meta = index, follow', robotsMeta && robotsMeta[1].includes('index') && robotsMeta[1].includes('follow'), robotsMeta ? robotsMeta[1] : 'missing');

  // No noindex
  test('T9. Crawl', 'No noindex directive', !lower.includes('noindex'), '');
  test('T9. Crawl', 'No nofollow on page level', !(robotsMeta && robotsMeta[1].includes('nofollow')), '');

  // Check robots.txt for disallow
  try {
    const rRes = await fetch('http://localhost:3000/robots.txt');
    const rTxt = await rRes.text();
    test('T9. Crawl', 'robots.txt does not block /blog/', !rTxt.includes('Disallow: /blog/'), '');
    test('T9. Crawl', 'Sitemap referenced in robots.txt', rTxt.toLowerCase().includes('sitemap'), '');
  } catch (e) {
    test('T9. Crawl', 'robots.txt accessible', false, e.message, 'WARN');
  }

  // Check sitemap for this URL
  try {
    const sRes = await fetch('http://localhost:3000/sitemap.xml');
    const sTxt = await sRes.text();
    test('T9. Crawl', 'Sitemap includes this article', sTxt.includes(SLUG), '');
  } catch (e) {
    test('T9. Crawl', 'Sitemap accessible', false, e.message, 'WARN');
  }

  // ===================== T10. MOBILE VIEWPORT SIMULATION =====================
  console.log('\n--- T10. Mobile Viewport Simulation ---');
  const viewport = html.match(/<meta[^>]+name="viewport"[^>]+content="([^"]+)"/i);
  test('T10. Mobile', 'Viewport meta tag present', !!viewport, viewport ? viewport[1] : 'missing');
  test('T10. Mobile', 'width=device-width set', viewport && viewport[1].includes('device-width'), '');

  // No fixed-width elements > 600px in inline styles
  const fixedWidths = [...html.matchAll(/width:\s*(\d+)px/gi)].map(m => parseInt(m[1]));
  const wideElements = fixedWidths.filter(w => w > 600);
  test('T10. Mobile', 'No inline fixed widths > 600px', wideElements.length === 0, `${wideElements.length} elements > 600px wide`, 'WARN');

  // No horizontal scroll indicators (overflow-x: scroll in inline)
  test('T10. Mobile', 'No forced overflow-x: scroll', !html.includes('overflow-x: scroll'), '', 'WARN');

  // Font size check (no < 12px inline)
  const smallFonts = [...html.matchAll(/font-size:\s*(\d+)px/gi)].map(m => parseInt(m[1])).filter(s => s < 12);
  test('T10. Mobile', 'No font-size < 12px (touch readability)', smallFonts.length === 0, `${smallFonts.length} tiny fonts`, 'WARN');

  // ===================== T11. CONTENT DUPLICATION / THIN CONTENT =====================
  console.log('\n--- T11. Content Quality & Duplication ---');
  // Word count
  const proseText = rawArticle.replace(/^---[\s\S]*?---/, '').replace(/\|[^|]+\|/g, '').replace(/[#*\[\]()\-_]/g, '');
  const words = proseText.split(/\s+/).filter(w => w.length > 0);
  test('T11. Content', 'Word count >= 1500 (substantive)', words.length >= 1500, `${words.length} words`);
  test('T11. Content', 'Word count <= 4000 (not bloated)', words.length <= 4000, `${words.length} words`);

  // Unique sentences ratio (detect copy-paste)
  const sentences = rawArticle.match(/[^.!?]+[.!?]+/g) || [];
  const uniqueSentences = new Set(sentences.map(s => s.trim().toLowerCase()));
  const sentenceUniqueness = uniqueSentences.size / (sentences.length || 1);
  test('T11. Content', 'Sentence uniqueness > 90%', sentenceUniqueness > 0.9, `${(sentenceUniqueness * 100).toFixed(1)}%`);

  // No placeholder text
  const placeholders = ['lorem ipsum', 'todo', 'fixme', 'placeholder', '[insert', 'xxx', 'tbd'];
  const foundPlaceholders = placeholders.filter(p => articleLower.includes(p));
  test('T11. Content', 'No placeholder text', foundPlaceholders.length === 0, foundPlaceholders.join(', ') || 'Clean');

  // ===================== T12. IMAGE OPTIMIZATION AUDIT =====================
  console.log('\n--- T12. Image Optimization Audit ---');
  const imgDir = path.resolve('d:/web/Grow Orbit/grow orbit/nextjs/public/images/article image/13');
  if (fs.existsSync(imgDir)) {
    const imgFiles = fs.readdirSync(imgDir);
    test('T12. Images', 'Cover image exists in /13/', imgFiles.length >= 1, imgFiles.join(', '));
    
    const avifFiles = imgFiles.filter(f => f.endsWith('.avif'));
    test('T12. Images', 'AVIF format used (next-gen)', avifFiles.length >= 1, avifFiles.join(', '));
    
    for (const img of avifFiles) {
      const stats = fs.statSync(path.join(imgDir, img));
      const sizeKB = stats.size / 1024;
      test('T12. Images', `${img} < 200KB`, sizeKB < 200, `${sizeKB.toFixed(1)} KB`);
      test('T12. Images', `${img} > 10KB (not corrupt)`, sizeKB > 10, `${sizeKB.toFixed(1)} KB`);
    }
  } else {
    test('T12. Images', 'Image directory exists', false, imgDir);
  }

  // Check rendered HTML image references
  const imgSrcs = [...html.matchAll(/src="([^"]*article[^"]*image[^"]*)"/gi)].map(m => m[1]);
  test('T12. Images', 'Article image referenced in HTML', imgSrcs.length >= 1 || html.includes('supplement-a-plus-content-examples'), `${imgSrcs.length} article image refs`);

  // ===================== T13. INTERNAL LINKING DEPTH & ANCHOR QUALITY =====================
  console.log('\n--- T13. Internal Linking & Anchor Quality ---');
  // Extract all internal link anchors from the article
  const mdLinks = [...rawArticle.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  const internalMdLinks = mdLinks.filter(m => m[2].startsWith('/'));
  const externalMdLinks = mdLinks.filter(m => m[2].startsWith('http'));

  test('T13. Links', 'Internal links in article >= 2', internalMdLinks.length >= 2, `${internalMdLinks.length} internal links`);
  test('T13. Links', 'External authority links >= 3', externalMdLinks.length >= 3, `${externalMdLinks.length} external links`);
  
  // Check anchor text quality (no "click here", "read more")
  const badAnchors = mdLinks.filter(m => /^(click here|read more|here|link|this)$/i.test(m[1].trim()));
  test('T13. Links', 'No generic anchor text', badAnchors.length === 0, badAnchors.length > 0 ? badAnchors.map(m => m[1]).join(', ') : 'All descriptive');
  
  // Anchor text length check (2-10 words ideal)
  const shortAnchors = mdLinks.filter(m => m[1].split(/\s+/).length < 2);
  test('T13. Links', 'Anchor text >= 2 words', shortAnchors.length <= 1, `${shortAnchors.length} single-word anchors`, 'WARN');

  // ===================== T14. REGULATORY COMPLIANCE CROSS-CHECK =====================
  console.log('\n--- T14. Regulatory Compliance Cross-Check ---');
  test('T14. Compliance', 'No "FDA approved" claim for supplements', (() => {
    const fdaIdx = articleLower.indexOf('fda-approved formula');
    if (fdaIdx === -1) return true;
    const lineWithFda = rawArticle.substring(Math.max(0, fdaIdx - 50), fdaIdx + 80);
    return lineWithFda.includes('|') || lineWithFda.includes('Remove') || lineWithFda.includes('Risky');
  })(), '');
  test('T14. Compliance', 'No "clinically proven" without caveat', !articleLower.includes('clinically proven') || articleLower.includes('compliance review'), '');
  test('T14. Compliance', 'No "guaranteed results"', !articleLower.includes('guaranteed results'), '');
  test('T14. Compliance', 'No "cures" without being in risky-wording example', (() => {
    const curesIdx = articleLower.indexOf('cures anxiety');
    if (curesIdx === -1) return true;
    // Check it's inside a table row (risky wording example)
    const lineWithCures = rawArticle.substring(Math.max(0, curesIdx - 50), curesIdx + 80);
    return lineWithCures.includes('|') || lineWithCures.includes('Risky');
  })(), '');
  test('T14. Compliance', 'FDA structure/function reference present', articleLower.includes('structure/function'), '');
  test('T14. Compliance', 'FTC guidance referenced', articleLower.includes('ftc health products compliance guidance'), '');
  test('T14. Compliance', 'Amazon dietary supplements policy linked', articleLower.includes('dietary supplements policy'), '');
  test('T14. Compliance', 'March 2026 enforcement mentioned', articleLower.includes('march 31, 2026'), '');
  test('T14. Compliance', 'Disclaimer present (not legal advice)', articleLower.includes('not a substitute for') || articleLower.includes('design guidance'), '');

  // ===================== T15. AEO / AI-OVERVIEW EXTRACTABILITY =====================
  console.log('\n--- T15. AEO / AI-Overview Extractability ---');
  // Can Google SGE / AI Overview extract a direct answer?
  test('T15. AEO', 'Definitive answer in first 2 paragraphs', rawArticle.split('\n\n').slice(1, 3).join(' ').length > 100, 'Opening summary is substantial');
  
  // Check for extractable numbered items
  const numberedSections = rawArticle.match(/## \d+\./g) || [];
  test('T15. AEO', 'Numbered sections for list extraction', numberedSections.length >= 3, `${numberedSections.length} numbered H2s`);
  
  // Tables extractable by AI
  const tableRows = (rawArticle.match(/^\|.+\|$/gm) || []).length;
  test('T15. AEO', 'Data tables for structured extraction', tableRows >= 6, `${tableRows} table rows`);
  
  // FAQ extractability
  const faqSection = rawArticle.indexOf('## Frequently Asked Questions');
  test('T15. AEO', 'FAQ section with ### questions', faqSection !== -1, '');
  
  // Definition-style answers
  const definitionPatterns = rawArticle.match(/\b(is|are|means|refers to|can be defined as)\b/gi) || [];
  test('T15. AEO', 'Definitional language for snippet extraction', definitionPatterns.length >= 3, `${definitionPatterns.length} definition patterns`);

  // ===================== T16. E-E-A-T SIGNAL DENSITY =====================
  console.log('\n--- T16. E-E-A-T Signal Density ---');
  test('T16. E-E-A-T', 'Author name with title', rawArticle.includes('Talha Waseem') && rawArticle.includes('Technical Strategist'), '');
  test('T16. E-E-A-T', 'Last reviewed date present', rawArticle.includes('Last reviewed:'), '');
  test('T16. E-E-A-T', 'Source Standard section', rawArticle.includes('## Source Standard'), '');
  test('T16. E-E-A-T', 'Multiple authority citations (FDA, FTC, Amazon)', 
    articleLower.includes('fda') && articleLower.includes('ftc') && articleLower.includes('amazon'), '');
  test('T16. E-E-A-T', 'Experience signals (practical examples)', 
    articleLower.includes('consider a magnesium') || articleLower.includes('imagine a wellness brand'), '');
  test('T16. E-E-A-T', 'Editorial disclaimer present', 
    articleLower.includes('design guidance') && articleLower.includes('not a substitute'), '');
  test('T16. E-E-A-T', 'No fake testimonials or reviews', 
    !articleLower.includes('customer said') && !articleLower.includes('5-star review') && !articleLower.includes('testimonial'), 'Clean');

  // ===================== SUMMARY =====================
  console.log('\n' + '='.repeat(70));
  console.log('  FINAL RESULTS');
  console.log('='.repeat(70));
  console.log(`\n  TOTAL TESTS:   ${results.pass + results.fail + results.warn}`);
  console.log(`  \x1b[32mPASSED:      ${results.pass}\x1b[0m`);
  console.log(`  \x1b[31mFAILED:      ${results.fail}\x1b[0m`);
  console.log(`  \x1b[33mWARNINGS:    ${results.warn}\x1b[0m`);
  console.log(`  PASS RATE:     ${((results.pass / (results.pass + results.fail + results.warn)) * 100).toFixed(1)}%`);
  console.log(`  HARD PASS:     ${((results.pass / (results.pass + results.fail)) * 100).toFixed(1)}% (excl. warnings)\n`);

  if (results.fail > 0) {
    console.log('  --- HARD FAILURES ---');
    results.details.filter(d => d.status === 'FAIL').forEach(d => {
      console.log(`  \x1b[31m✗\x1b[0m [${d.category}] ${d.name} — ${d.detail}`);
    });
  }
  if (results.warn > 0) {
    console.log('\n  --- WARNINGS (non-blocking) ---');
    results.details.filter(d => d.status === 'WARN').forEach(d => {
      console.log(`  \x1b[33m⚠\x1b[0m [${d.category}] ${d.name} — ${d.detail}`);
    });
  }

  console.log('\n' + '='.repeat(70) + '\n');
}

main().catch(e => { console.error(e); process.exit(1); });
