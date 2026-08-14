// Helper to dynamically calculate reading time based on content word count
export function getReadTime(post) {
  if (!post) return "5 min read";
  if (post.readTime && post.readTime.trim() !== "") return post.readTime;
  if (!post.content || !Array.isArray(post.content)) return "5 min read";

  let allText = "";
  post.content.forEach((block) => {
    if (block?.text) {
      allText += " " + block.text;
    }
  });

  const wordsCount = allText.trim().split(/\s+/).filter(Boolean).length;
  if (wordsCount === 0) return "5 min read";

  const readingSpeed = 200; // average words per minute
  const minutes = Math.max(1, Math.ceil(wordsCount / readingSpeed));
  return `${minutes} min read`;
}

// Helper to parse bold (**text**) and links ([anchor](url)) in markdown text
export function parseMarkdownText(text) {
  if (!text) return "";
  return text
    .replace(/\[\s?\]\s*/g, '☑ ')
    .replace(/\[x\]\s*/gi, '✅ ')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900">$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, (match, anchor, url) => {
      const isInternal = url.startsWith('/') || url.includes('groworbit.com') || url.includes('groworbitofficial.com');
      const targetAttr = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<a href="${url}"${targetAttr} class="text-orange-500 hover:text-orange-600 underline font-semibold transition-colors">${anchor}</a>`;
    });
}
