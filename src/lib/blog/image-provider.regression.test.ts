import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('blog image provider', () => {
  it('preserves gpt-image-1 while routing through OpenRouter', () => {
    const source = readFileSync(new URL('./image-gen.ts', import.meta.url), 'utf8');
    expect(source).toContain("'openai/gpt-image-1'");
    expect(source).toContain("'https://openrouter.ai/api/v1/images'");
    expect(source).toContain('process.env.MY_BLOG_IMAGES_OPENROUTER_API_KEY');
    expect(source).toContain('|| process.env.MY_BLOG_OPENROUTER_API_KEY');
    expect(source).not.toContain('google/gemini-2.5-flash-image');
  });
});
