import GithubSlugger from 'github-slugger';

export interface TocItem {
  depth: 2 | 3;
  text: string;
  slug: string;
}

function cleanInline(s: string): string {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1$2')
    .trim();
}

export function extractToc(content: string): TocItem[] {
  const codeStripped = content.replace(/```[\s\S]*?```/g, '');
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of codeStripped.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const text = cleanInline(m[2]);
    if (!text) continue;
    items.push({
      depth: m[1].length === 2 ? 2 : 3,
      text,
      slug: slugger.slug(text),
    });
  }

  return items;
}
