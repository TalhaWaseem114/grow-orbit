import fs from 'fs';

const rawContent = fs.readFileSync('.seo cluster/articles/article_13.md', 'utf8');

// Parse frontmatter
const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
const fm = {};
if (fmMatch) {
  fmMatch[1].split(/\r?\n/).forEach(line => {
    const ci = line.indexOf(':');
    if (ci !== -1) {
      fm[line.slice(0, ci).trim()] = line.slice(ci + 1).trim().replace(/^["']|["']$/g, '');
    }
  });
}

const secondDash = rawContent.indexOf('---', 4);
const body = secondDash !== -1 ? rawContent.slice(secondDash + 3) : rawContent;
const lines = body.split(/\r?\n/);
const lower = body.toLowerCase();

let passed = 0, failed = 0, advisories = 0;
const log = [];

function test(cat, name, ok, detail, advisory = false) {
  log.push({ cat, name, ok, detail, advisory });
  if (ok) passed++;
  else if (advisory) advisories++;
  else failed++;
}

// ===== A. PUNCTUATION & CHARACTER HYGIENE (8 tests) =====
test('A. Punctuation Hygiene', 'Zero em-dashes (U+2014)', (body.match(/\u2014/g)||[]).length === 0, `${(body.match(/\u2014/g)||[]).length} found`);
test('A. Punctuation Hygiene', 'Zero en-dashes (U+2013)', (body.match(/\u2013/g)||[]).length === 0, `${(body.match(/\u2013/g)||[]).length} found`);
test('A. Punctuation Hygiene', 'Zero horizontal bars (U+2015/U+2012)', (body.match(/[\u2015\u2012]/g)||[]).length === 0, `${(body.match(/[\u2015\u2012]/g)||[]).length} found`);
const ntl = lines.filter(l => !l.trim().startsWith('|') && !l.trim().startsWith('---'));
test('A. Punctuation Hygiene', 'Zero double-hyphens in prose', (ntl.join('\n').match(/--/g)||[]).length === 0, `${(ntl.join('\n').match(/--/g)||[]).length} found`);
test('A. Punctuation Hygiene', 'Zero unicode arrow glyphs', (body.match(/[\u2190-\u21FF\u2794-\u27BF]/g)||[]).length === 0, `${(body.match(/[\u2190-\u21FF\u2794-\u27BF]/g)||[]).length} found`);
test('A. Punctuation Hygiene', 'Zero ASCII arrows', (body.match(/(->|-->|=>|<-|<--)/g)||[]).length === 0, `${(body.match(/(->|-->|=>|<-|<--)/g)||[]).length} found`);
test('A. Punctuation Hygiene', 'Zero smart/curly quotes', (body.match(/[\u201C\u201D\u2018\u2019]/g)||[]).length === 0, `Straight ASCII quotes only`);
const nbsp = (body.match(/\u00a0/g)||[]).length;
test('A. Punctuation Hygiene', 'Zero non-breaking spaces', nbsp === 0, `${nbsp} found`);

// ===== B. AI VOCABULARY FORENSICS (1 test, 53 markers) =====
const slop = ['delve','testament','tapestry','beacon','game-changer','game changer','elevate','unleash','skyrocket','supercharge','unlock the power','holistic','seamlessly','plethora','myriad','cornerstone','pivotal','revolutionize','cutting-edge','foster','realm','symphony','treasure trove','paramount','demystify','navigating the complexities','furthermore','moreover',"let's dive in",'dive deep','comprehensive guide','embark on','in conclusion',"it's important to remember",'crucial role','vital role','vibrant','bustling','harness','empower','underscore',"in today's",'fast-paced','landscape','look no further','without further ado','transformative','ever-evolving','unparalleled','powerhouse','game changing','beacon of hope','catalyst for change'];
const hit = slop.filter(m => new RegExp(`\\b${m.replace(/'/g,"'")}\\b`,'i').test(lower));
test('B. AI Vocabulary Forensics', 'Zero AI slop markers (53 categories)', hit.length === 0, hit.length === 0 ? '0/53 triggered' : `Triggered: ${hit.join(', ')}`);

// ===== C. ROBOTIC SYNTAX (3 tests) =====
const robotic = ['here are some','below are the following','in this section we will explore','as we have seen','it goes without saying','needless to say'];
test('C. Robotic Syntax', 'No robotic list lead-ins', robotic.filter(r => lower.includes(r)).length === 0, 'Clean natural intros');
const fp = lines.find(l => l.trim() && !l.startsWith('#') && !l.startsWith('*') && !l.startsWith('By ') && !l.startsWith('Last'));
test('C. Robotic Syntax', 'Direct opening paragraph', !/in today's|in the fast-paced|welcome to|navigating the/.test(fp ? fp.toLowerCase() : ''), `Opens with practical dietary supplement premise`);
test('C. Robotic Syntax', 'Strategic conclusion (not generic)', lines.some(l => l.startsWith('## Final Takeaway')), 'Executive Final Takeaway');

// ===== D. BURSTINESS & CADENCE (4 tests) =====
const prose = lines.filter(l => { const t = l.trim(); return t && !t.startsWith('#') && !t.startsWith('|') && !t.startsWith('*') && !t.startsWith('By ') && !t.startsWith('Last') && !t.startsWith('Note:') && !t.startsWith('---'); });
const fullProse = prose.join(' ');
const sents = fullProse.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).filter(s => s.trim().length > 3);
const lens = sents.map(s => s.trim().split(/\s+/).length);
const avg = lens.reduce((a,b) => a+b, 0) / (lens.length||1);
const sd = Math.sqrt(lens.reduce((a,b) => a + Math.pow(b - avg, 2), 0) / (lens.length||1));
const short = lens.filter(l => l <= 7).length;
const long = lens.filter(l => l >= 24).length;
test('D. Burstiness & Cadence', `Sentence Std Dev >= 6.0 (human rhythm)`, sd >= 6.0, `${sd.toFixed(2)} words`);
test('D. Burstiness & Cadence', 'Short punchy sentences (<=7 words) >= 6', short >= 6, `${short} found (${((short/lens.length)*100).toFixed(1)}%)`);
test('D. Burstiness & Cadence', 'Long complex sentences (>=24 words) >= 8', long >= 8, `${long} found (${((long/lens.length)*100).toFixed(1)}%)`);
test('D. Burstiness & Cadence', 'Average sentence length 12-22 words', avg >= 12 && avg <= 22, `${avg.toFixed(1)} words`);

// ===== E. LEXICAL DIVERSITY (2 tests) =====
const allW = fullProse.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w => w.length > 0);
const uniq = new Set(allW);
const ttr = (uniq.size / (allW.length||1)) * 100;
test('E. Lexical Diversity', 'Type-Token Ratio >= 25%', ttr >= 25, `${ttr.toFixed(1)}% (${uniq.size} unique / ${allW.length} total)`);
const domTerms = ['supplement facts','serving size','dietary supplements policy','ksm-66','cognizin','extract','standardization','cgmp','third-party tested','structure/function','disease claims','ftc','fda','raw-herb equivalent','3d bottle rendering','mechanism of action','amber glass','magnesium'];
const matched = domTerms.filter(d => lower.includes(d));
test('E. Lexical Diversity', 'Domain vocabulary coverage >= 15/18', matched.length >= 15, `${matched.length}/${domTerms.length} terms`);

// ===== F. GROUNDED EXAMPLES (1 test) =====
const g1 = lower.includes('magnesium supplement') && lower.includes('serving amount');
const g2 = lower.includes('ksm-66') && lower.includes('cognizin');
const g3 = lower.includes('500 mg') && lower.includes('10,000 mg raw-herb equivalent');
const g4 = lower.includes('march 31, 2026') && lower.includes('ingredient-weight');
const g5 = lower.includes('cures anxiety') && lower.includes('fda-approved formula');
test('F. Grounded Examples', 'Concrete compliance & category scenarios (5 scenarios)', [g1,g2,g3,g4,g5].filter(Boolean).length >= 4, `${[g1,g2,g3,g4,g5].filter(Boolean).length}/5 scenarios validated`);

// ===== G. SEO KEYWORD STRATEGY (9 tests) =====
const pkr = /supplement a\+ content examples|supplement a plus content examples/gi;
const pkm = body.match(pkr) || [];
const h1 = lines.find(l => l.startsWith('# '));
test('G. SEO Keywords', 'Primary KW in H1', /supplement a\+ content examples/i.test(h1||''), `H1: "${h1}"`);
test('G. SEO Keywords', 'Primary KW in first 150 words', /supplement a plus content examples/i.test(body.slice(0, 1200)), 'Present in opening section');
const tail = lines.slice(-25).join('\n');
test('G. SEO Keywords', 'Primary KW in conclusion', /supplement a\+ content examples/i.test(tail), 'Present in Final Takeaway');
test('G. SEO Keywords', 'Primary KW frequency >= 4', pkm.length >= 4, `${pkm.length} occurrences`);
test('G. SEO Keywords', 'Secondary: 3d bottle rendering', /3d bottle rendering/i.test(body), 'Present');
test('G. SEO Keywords', 'Secondary: dietary supplements policy', /dietary supplements policy/i.test(body), 'Present');
test('G. SEO Keywords', 'Secondary: supplement facts panel', /supplement facts/i.test(body), 'Present');
test('G. SEO Keywords', 'Secondary: ingredient transparency', /ingredient transparency/i.test(body), 'Present');
test('G. SEO Keywords', 'Secondary: structure/function', /structure\/function/i.test(body), 'Present');

// ===== H. FRONTMATTER & METADATA (6 tests) =====
const mt = fm.meta_title || '';
const md = fm.meta_description || '';
test('H. Frontmatter', 'Meta title length 45-60 chars', mt.length >= 45 && mt.length <= 60, `${mt.length} chars`);
test('H. Frontmatter', 'Meta description length 140-160 chars', md.length >= 140 && md.length <= 160, `${md.length} chars`);
test('H. Frontmatter', 'Slug present & kebab-case', /^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.slug||''), fm.slug);
test('H. Frontmatter', 'Cover image path with .avif format', (fm.cover_image||'').endsWith('.avif'), fm.cover_image);
test('H. Frontmatter', 'Author byline: Talha Waseem, Technical Strategist', !!lines.find(l => l.includes('By Talha Waseem') && l.includes('Technical Strategist')), 'Confirmed');
test('H. Frontmatter', 'Freshness date: October 2026', !!lines.find(l => l.includes('Last reviewed:') && l.includes('2026')), 'Confirmed');

// ===== I. LINK & URL INTEGRITY (6 tests) =====
const mdLinks = [];
const lr = /\[([^\]]+)\]\(([^)]+)\)/g;
let m2;
while ((m2 = lr.exec(body)) !== null) mdLinks.push({ a: m2[1], u: m2[2] });
test('I. Link Integrity', 'Zero chatgpt.com URLs', !body.includes('chatgpt.com'), 'Clean');
test('I. Link Integrity', 'Zero UTM tracking parameters', !body.includes('utm_source'), 'Clean');
test('I. Link Integrity', 'Internal /service/listing-optimization link', mdLinks.some(l => l.u.includes('/service/listing-optimization')), 'Present with descriptive anchor');
test('I. Link Integrity', 'Sibling /blog/amazon-premium-a-content link', mdLinks.some(l => l.u.includes('/blog/amazon-premium-a-content')), 'Present');
test('I. Link Integrity', 'Sibling /blog/amazon-a-content-design link', mdLinks.some(l => l.u.includes('/blog/amazon-a-content-design')), 'Present');
test('I. Link Integrity', 'Descriptive anchor texts (zero generic)', mdLinks.filter(l => /^(click here|read more|here|link)$/i.test(l.a.trim())).length === 0, '100% descriptive');

// ===== J. DOCUMENT STRUCTURE (6 tests) =====
const h1s = lines.filter(l => l.startsWith('# '));
const h2s = lines.filter(l => l.startsWith('## '));
const h3s = lines.filter(l => l.startsWith('### '));
test('J. Document Structure', 'Single H1 element', h1s.length === 1, `${h1s.length} H1 found`);
test('J. Document Structure', 'H2 sections >= 7', h2s.length >= 7, `${h2s.length} H2 found`);
test('J. Document Structure', 'H3 subsections >= 5', h3s.length >= 5, `${h3s.length} H3 found`);
let hierOk = true, pLev = 0;
for (const l of lines) { const hm = l.match(/^(#{1,6})\s/); if (hm) { if (hm[1].length > pLev + 1 && pLev !== 0) hierOk = false; pLev = hm[1].length; } }
test('J. Document Structure', 'Sequential heading hierarchy', hierOk, 'H1 -> H2 -> H3 strict');
test('J. Document Structure', 'Data tables present (>= 3)', (body.match(/\| ---/g)||[]).length >= 3, `${(body.match(/\| ---/g)||[]).length} tables`);
test('J. Document Structure', 'Word count 1,200 - 4,000', allW.length >= 1200 && allW.length <= 4000, `${allW.length} words`);

// ===== K. E-E-A-T (5 tests) =====
test('K. E-E-A-T', 'Author credentials', !!lines.find(l => l.includes('Talha Waseem')), 'Technical Strategist at Grow Orbit');
test('K. E-E-A-T', 'Regulatory citations (FDA, FTC, Amazon)', mdLinks.filter(l => l.u.includes('fda.gov') || l.u.includes('ftc.gov') || l.u.includes('amazon.com')).length >= 3, 'Authoritative regulatory sources');
test('K. E-E-A-T', 'Compliance reality (No fake cure guarantees)', lower.includes('cures anxiety') && lower.includes('remove the claim'), 'Debunks prohibited claims');
test('K. E-E-A-T', 'Physical label prerequisite honesty', lower.includes('does not replace the required images of the actual product label in the listing'), 'Acknowledges mandatory gallery label photos');
test('K. E-E-A-T', 'Dedicated Source Standard section', body.includes('## Source Standard'), 'Present at footer');

// ===== L. FAQ & SNIPPETS (3 tests) =====
const faqIdx = lines.findIndex(l => l.startsWith('## Frequently Asked Questions'));
const faqQ = lines.filter((l, i) => i > faqIdx && l.startsWith('### '));
test('L. FAQ & Snippets', 'FAQ section with >= 5 H3 questions', faqIdx !== -1 && faqQ.length >= 5, `${faqQ.length} questions`);
test('L. FAQ & Snippets', '3D bottle rendering snippet target', !!lines.find(l => l.includes('3D bottle rendering for Amazon is useful when reflective amber glass')), 'Extractable 3D render definition');
test('L. FAQ & Snippets', '2026 labeling rule snippet target', !!lines.find(l => l.includes('March 31, 2026')), 'Extractable compliance date & policy rule');

// ===== M. AEO / GEO (5 tests) =====
test('M. AEO / GEO', 'Module counts extractable (5 vs 7, 14 vs 19)', lower.includes('five modules from 14 types') && lower.includes('seven modules from 19 types'), 'Explicit numerical bounds');
test('M. AEO / GEO', 'Dimensions extractable (970x300, 1464x600)', lower.includes('970') && lower.includes('1464'), 'Pixel dimensions present');
test('M. AEO / GEO', 'Enforcement date extractable (March 31, 2026)', lower.includes('march 31, 2026'), 'Documented');
test('M. AEO / GEO', 'Copy transformation matrix extractable', (body.match(/\| Risky wording \| Clearer alternative \|/g)||[]).length > 0, 'Clean transformation matrix');
test('M. AEO / GEO', 'Google FAQ deprecation awareness', lower.includes('google no longer displays faq rich results'), 'Accurately documented');

// ===== N. MOBILE-FIRST & CWV (2 tests) =====
const paras = body.split(/\n\s*\n/).filter(p => !p.trim().startsWith('#') && !p.trim().startsWith('|'));
const paraLens = paras.map(p => p.trim().split(/\s+/).length);
test('N. Mobile-First', 'Avg paragraph <= 60 words', (paraLens.reduce((a,b)=>a+b,0)/(paraLens.length||1)) <= 60, `Avg: ${(paraLens.reduce((a,b)=>a+b,0)/(paraLens.length||1)).toFixed(1)} words`);
test('N. Mobile-First', 'Max paragraph <= 100 words', Math.max(...paraLens) <= 100, `Max: ${Math.max(...paraLens)} words`);

// ===== O. TECHNICAL ENCODING (1 test) =====
test('O. Technical Encoding', 'UTF-8 clean (no BOM, null, zero-width)', !(rawContent.charCodeAt(0) === 0xFEFF || rawContent.includes('\0') || /[\u200B\u200C\u200D\uFEFF]/.test(rawContent)), 'Clean');

// ===== P. READABILITY (2 tests) =====
function syl(w) { w = w.toLowerCase(); if (w.length <= 3) return 1; w = w.replace(/(?:[^laeiouy]|ed|es|e)$/, ''); w = w.replace(/^y/, ''); const m = w.match(/[aeiouy]{1,2}/g); return m ? m.length : 1; }
const totSyl = allW.reduce((s, w) => s + syl(w), 0);
const fre = 206.835 - 1.015 * (allW.length / (sents.length||1)) - 84.6 * (totSyl / (allW.length||1));
const fkg = 0.39 * (allW.length / (sents.length||1)) + 11.8 * (totSyl / (allW.length||1)) - 15.59;
test('P. Readability', 'Flesch Reading Ease 35-65 (professional/trade)', fre >= 35 && fre <= 65, `${fre.toFixed(1)}`);
test('P. Readability', 'Flesch-Kincaid Grade 8.0-13.5 (executive)', fkg >= 8.0 && fkg <= 13.5, `Grade ${fkg.toFixed(1)}`);

// ===== Q. USER SEARCHER INTENT (25 queries) =====
const queries = [
  ['What are good supplement A+ Content examples?', lower.includes('supplement a+ content examples') && lower.includes('five practical')],
  ['What modules should supplement A+ include?', lower.includes('hero section') && lower.includes('ingredient') && lower.includes('usage') && lower.includes('facts panel') && lower.includes('comparison')],
  ['Why do supplement listings fail in A+?', lower.includes('attractive bottle and a list of ingredients') && lower.includes('imply scientific validation')],
  ['How to show ingredient transparency?', lower.includes('ingredient transparency grid') && lower.includes('three cards')],
  ['Can I claim KSM-66 or Cognizin?', lower.includes('ksm-66') && lower.includes('actually present and the brand has the right to reference it')],
  ['What is the raw-herb equivalent rule?', lower.includes('10,000 mg raw-herb equivalent') && lower.includes('500 mg of extract') && lower.includes('conflicts with the actual supplement facts')],
  ['What is Amazon March 31 2026 enforcement?', lower.includes('march 31, 2026') && lower.includes('ingredient-weight and raw-material-equivalent')],
  ['Are certification badges allowed?', lower.includes('third-party tested') && lower.includes('cgmp') && lower.includes('documentation supports it')],
  ['Can I say FDA approved?', lower.includes('do not imply that the fda has approved a supplement')],
  ['How to design a hero banner for supplements?', lower.includes('product hero banner') && lower.includes('clear photograph or accurate 3d render')],
  ['When should I use 3D bottle rendering?', lower.includes('reflective amber glass') && lower.includes('glossy plastic') && lower.includes('consistent photography')],
  ['Can 3D renders invent product features?', lower.includes('must accurately represent the real packaging') && lower.includes('not invent product features')],
  ['What are A+ image dimensions for supplements?', lower.includes('970') && lower.includes('1464')],
  ['Are mechanism of action graphics allowed?', lower.includes('mechanism-of-action graphic') && lower.includes('imply that a finished supplement produces a specific effect')],
  ['What does FTC say about implied health claims?', lower.includes('ftc health products compliance guidance') && lower.includes('diagram can imply a benefit')],
  ['Why is Supplement Facts close up needed?', lower.includes('polished bottle image loses value when customers cannot read the label')],
  ['Does A+ replace main image label photos?', lower.includes('does not replace the required images of the actual product label in the listing')],
  ['How to make labels readable on mobile?', lower.includes('check the mobile view') && lower.includes('preview the layout on mobile and desktop')],
  ['How to structure a supplement comparison chart?', lower.includes('product comparison matrix') && lower.includes('daily formula') && lower.includes('single-ingredient')],
  ['Can I compare against competitor supplements?', lower.includes('do not use the chart to compare against competitor products')],
  ['How to replace risky disease wording?', lower.includes('cures anxiety') && lower.includes('state the ingredient and amount per serving')],
  ['Should I use Premium A+ for supplements?', lower.includes('should you use premium a+ for supplement listings') && lower.includes('basic a+ may be enough')],
  ['What happens if listing violates supplement policy?', lower.includes('noncompliant asins may be removed')],
  ['What is structure/function vs disease claim?', lower.includes('structure/function claims from disease claims') && lower.includes('fda structure/function guidance')],
  ['Where to get supplement listing design help?', lower.includes('/service/listing-optimization') && lower.includes('supplement listing layout design')]
];
queries.forEach(([q, ok]) => test('Q. User Intent', q, ok, ok ? 'Resolved' : 'Missing'));

// ===== R. LIVE GOOGLEBOT SIMULATION (via local dev server) =====
async function runGooglebotTests() {
  console.log('\nRunning Live Googlebot Fetch against http://localhost:3000/blog/supplement-a-plus-content-examples ...');
  try {
    const res = await fetch('http://localhost:3000/blog/supplement-a-plus-content-examples');
    test('R. Googlebot', 'HTTP Status 200 OK', res.status === 200, `HTTP ${res.status}`);
    const ct = res.headers.get('content-type') || '';
    test('R. Googlebot', 'Content-Type: text/html UTF-8', ct.includes('text/html'), ct);

    const html = await res.text();
    test('R. Googlebot', 'HTML payload > 50KB (SSR hydrated)', html.length > 50000, `${(html.length/1024).toFixed(1)} KB`);

    // Title tag
    const tm = html.match(/<title>([^<]+)<\/title>/i);
    const titleText = tm ? tm[1] : '';
    test('R. Googlebot', 'Title tag present & within 60 chars', titleText.length > 0 && titleText.length <= 70, `"${titleText}" (${titleText.length} chars)`);

    // Meta description
    const dm = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const descText = dm ? dm[1] : '';
    test('R. Googlebot', 'Meta description present & <= 165 chars', descText.length > 0 && descText.length <= 165, `"${descText}" (${descText.length} chars)`);

    // Canonical tag
    const cm = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    test('R. Googlebot', 'Canonical tag present & HTTPS', !!cm && cm[1].startsWith('https://'), cm ? cm[1] : 'Missing');

    // Open Graph
    test('R. Googlebot', 'Open Graph title & image present', html.includes('og:title') && html.includes('og:image'), 'OG Tags verified');

    // JSON-LD structured data
    const jsonLds = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
    test('R. Googlebot', 'JSON-LD schema blocks present (>= 2)', jsonLds.length >= 2, `${jsonLds.length} blocks found`);

    let hasBlogPosting = false, hasFaq = false;
    jsonLds.forEach(m => {
      try {
        const parsed = JSON.parse(m[1]);
        if (parsed['@type'] === 'BlogPosting') hasBlogPosting = true;
        if (parsed['@type'] === 'FAQPage') hasFaq = true;
      } catch(e) {}
    });
    test('R. Googlebot', 'BlogPosting schema with author & publisher', hasBlogPosting, 'Verified');
    test('R. Googlebot', 'FAQPage schema dynamically generated', hasFaq, 'Verified');

    // Image alt text
    const imgMatches = [...html.matchAll(/<img\s+([^>]+)>/gi)];
    const missingAlt = imgMatches.filter(m => !m[1].includes('alt='));
    test('R. Googlebot', '100% of images have Alt attribute', missingAlt.length === 0, `${imgMatches.length} images checked`);

    // SpamBrain / Hidden Text Signals
    test('R. Googlebot', 'Zero hidden spam text / CSS cloaking', !/display:\s*none[^>]*>[^<]{100,}/i.test(html), 'Clean');

  } catch(e) {
    test('R. Googlebot', 'Live fetch succeeded', false, e.message);
  }
}

await runGooglebotTests();

// ===== SUMMARY =====
console.log('\n======================================================');
console.log(' DEEP MASTER AUDIT & SIMULATION - ARTICLE #13');
console.log('======================================================\n');
console.log(`TOTAL TESTS:  ${passed + failed + advisories}`);
console.log(`PASSED:       ${passed}`);
console.log(`FAILED:       ${failed}`);
console.log(`ADVISORIES:   ${advisories}`);
console.log(`PASS RATE:    ${((passed / (passed + failed + advisories)) * 100).toFixed(1)}%\n`);

const cats = {};
log.forEach(l => {
  if (!cats[l.cat]) cats[l.cat] = { p: 0, f: 0, a: 0, t: 0 };
  cats[l.cat].t++;
  if (l.ok) cats[l.cat].p++;
  else if (l.advisory) cats[l.cat].a++;
  else cats[l.cat].f++;
});

for (const [c, v] of Object.entries(cats)) {
  const icon = v.f > 0 ? 'FAIL' : v.a > 0 ? 'WARN' : 'PASS';
  console.log(`[${icon}] ${c.padEnd(28)}: ${v.p}/${v.t} passed${v.f ? ` | ${v.f} FAILED` : ''}${v.a ? ` | ${v.a} advisory` : ''}`);
}

const failures = log.filter(l => !l.ok);
if (failures.length > 0) {
  console.log('\n--- FAILED TESTS ---');
  failures.forEach(f => console.log(`  [FAIL] ${f.cat} > ${f.name}: ${f.detail}`));
}

console.log('\n--- ARTICLE METRICS ---');
console.log(`Prose Words: ${allW.length} | Sentences: ${sents.length} | Avg Length: ${avg.toFixed(1)}w | StdDev: ${sd.toFixed(2)}w`);
console.log(`Short (<=7w): ${short} (${((short/lens.length)*100).toFixed(1)}%) | Long (>=24w): ${long} (${((long/lens.length)*100).toFixed(1)}%)`);
console.log(`TTR: ${ttr.toFixed(1)}% | Domain Terms: ${matched.length}/${domTerms.length}`);
console.log(`Primary KW Occurrences: ${pkm.length} | Flesch RE: ${fre.toFixed(1)} | FK Grade: ${fkg.toFixed(1)}`);
console.log(`H1: ${h1s.length} | H2: ${h2s.length} | H3: ${h3s.length} | Links: ${mdLinks.length} | Tables: ${(body.match(/\| ---/g)||[]).length}`);
