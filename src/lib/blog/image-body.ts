export interface BodyImage {
  url: string;
  alt: string;
}

export function injectBodyImages(content: string, images: BodyImage[]): string {
  if (images.length === 0) return content;

  const lines = content.split('\n');
  const h2Indexes = lines
    .map((line, i) => (/^##\s/.test(line) ? i : -1))
    .filter(i => i >= 0);

  if (h2Indexes.length < 2) return content;

  const targets = h2Indexes.length >= 4
    ? [h2Indexes[1], h2Indexes[3]]
    : [h2Indexes[1]];

  targets
    .map((lineIndex, i) => ({ lineIndex, image: images[i] }))
    .filter(x => x.image !== undefined)
    .reverse()
    .forEach(({ lineIndex, image }) => {
      lines.splice(lineIndex, 0, '', `![${image.alt}](${image.url})`, '');
    });

  return lines.join('\n');
}

export function injectInfographic(content: string, infographic: BodyImage | null): string {
  if (!infographic) return content;

  const lines = content.split('\n');
  const h2Indexes = lines
    .map((line, i) => (/^##\s/.test(line) ? i : -1))
    .filter(i => i >= 0);

  const target = h2Indexes.length > 0 ? h2Indexes[h2Indexes.length - 1] : lines.length;
  lines.splice(target, 0, '', `![${infographic.alt}](${infographic.url})`, '');
  return lines.join('\n');
}

export interface InlineCta {
  title: string;
  subtitle: string;
  buttonLabel: string;
  url: string;
}

export function injectInlineCtas(content: string, cta: InlineCta | null): string {
  if (!cta || !cta.url.trim()) return content;

  const lines = content.split('\n');
  const block = `> **[${cta.title}](${cta.url})** — ${cta.subtitle}`;
  const imageIndexes = lines
    .map((line, i) => (/^!\[[^\]]*\]\([^)]*\)/.test(line) ? i : -1))
    .filter(i => i >= 0);

  [...imageIndexes].reverse().forEach(i => {
    lines.splice(i + 1, 0, '', block);
  });

  return lines.join('\n');
}
