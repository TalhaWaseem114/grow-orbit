import fs from 'fs';

const raw = fs.readFileSync('.seo cluster/articles/article_13.md', 'utf8');

// Parse frontmatter
const fmM = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
const fm = {};
if (fmM) {
  fmM[1].split(/\r?\n/).forEach(l => {
    const ci = l.indexOf(':');
    if (ci !== -1) fm[l.slice(0, ci).trim()] = l.slice(ci + 1).trim().replace(/^['"]|['"]$/g, '');
  });
}
const body = raw.slice(fmM ? fmM[0].length : 0);
const lower = body.toLowerCase();

let passed = 0, failed = 0;
function test(name, ok, detail) {
  if (ok) {
    passed++;
    console.log('[PASS]', name, ':', detail);
  } else {
    failed++;
    console.error('[FAIL]', name, ':', detail);
  }
}

// 1. Punctuation
test('Zero em-dashes', (body.match(/\u2014/g)||[]).length === 0, 'Clean');
test('Zero en-dashes', (body.match(/\u2013/g)||[]).length === 0, 'Clean');
const nonTable = body.split(/\r?\n/).filter(l => !l.trim().startsWith('|') && !l.trim().startsWith('---'));
test('Zero double-hyphens outside markdown tables/hr', (nonTable.join('\n').match(/--/g)||[]).length === 0, 'Clean');

// 2. AI markers
const slop = ['delve','testament','tapestry','beacon','game-changer','elevate','unleash','skyrocket','supercharge','unlock the power','holistic','seamlessly','plethora','myriad','cornerstone','pivotal','revolutionize','cutting-edge','foster','realm','symphony','treasure trove','paramount','demystify','navigating the complexities','furthermore','moreover','comprehensive guide','in conclusion'];
const hit = slop.filter(s => new RegExp('\\b' + s + '\\b', 'i').test(lower));
test('Zero AI markers', hit.length === 0, hit.length === 0 ? '0 found' : 'Hit: ' + hit.join(', '));

// 3. Link hygiene
test('Zero chatgpt.com links', !body.includes('chatgpt.com'), 'Clean');
test('Internal link to /service/listing-optimization', body.includes('/service/listing-optimization'), 'Present');
test('Internal link to /blog/amazon-premium-a-content', body.includes('/blog/amazon-premium-a-content'), 'Present');
test('Internal link to /blog/amazon-a-content-design', body.includes('/blog/amazon-a-content-design'), 'Present');
test('Target anchor text present', body.includes('[supplement listing layout design](/service/listing-optimization)'), 'Present');

// 4. Structure
test('Heading 1 count', (body.match(/^#\s+/gm)||[]).length === 1, 'Single H1');
test('H2 count >= 7', (body.match(/^##\s+/gm)||[]).length >= 7, (body.match(/^##\s+/gm)||[]).length + ' H2s');
test('H3 count >= 5', (body.match(/^###\s+/gm)||[]).length >= 5, (body.match(/^###\s+/gm)||[]).length + ' H3s');
test('Tables count >= 3', (body.match(/\| ---/g)||[]).length >= 3, (body.match(/\| ---/g)||[]).length + ' tables');
test('Booking CTA block present', body.includes('[BOOK_MEETING_CTA:'), 'Present');

// 5. Frontmatter
test('Meta title length (45-60)', fm.meta_title && fm.meta_title.length >= 45 && fm.meta_title.length <= 60, fm.meta_title?.length + ' chars');
test('Meta description length (140-160)', fm.meta_description && fm.meta_description.length >= 140 && fm.meta_description.length <= 160, fm.meta_description?.length + ' chars');
test('Slug kebab-case', /^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.slug||''), fm.slug);
test('Cover image ends with .avif', (fm.cover_image||'').endsWith('.avif'), fm.cover_image);

// 6. Keywords
test('Primary keyword in H1', lower.includes('supplement a+ content examples') || lower.includes('supplement a plus content examples'), 'Present');
test('Keyword frequency >= 4', (body.match(/supplement a\+ content examples|supplement a plus content examples/gi)||[]).length >= 4, (body.match(/supplement a\+ content examples|supplement a plus content examples/gi)||[]).length + ' occurrences');

// Word count
const words = body.trim().replace(/[^a-z0-9\s]/gi, ' ').split(/\s+/).filter(Boolean);
test('Word count 1200-4000', words.length >= 1200 && words.length <= 4000, words.length + ' words');

console.log('\nAudit complete: ' + passed + ' passed, ' + failed + ' failed.');
