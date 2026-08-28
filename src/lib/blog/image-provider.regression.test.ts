import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('blog image provider', () => {
  it('uses Seedream 4.5 at 2K through OpenRouter', () => {
    const source = readFileSync(new URL('./image-gen.ts', import.meta.url), 'utf8');
    expect(source).toContain("'bytedance-seed/seedream-4.5'");
    expect(source).toContain("'https://openrouter.ai/api/v1/images'");
    expect(source).toContain("resolution: '2K'");
    expect(source).toContain("aspect_ratio: size === '1024x1024' ? '1:1' : '16:9'");
    expect(source).toContain('process.env.MY_BLOG_IMAGES_OPENROUTER_API_KEY');
    expect(source).not.toContain('process.env.MY_BLOG_OPENROUTER_API_KEY');
    expect(source).not.toContain("model: 'openai/gpt-image-1'");

    const setup = readFileSync(new URL('../../app/setup/page.tsx', import.meta.url), 'utf8');
    expect(setup).toContain("const images = envPresent('MY_BLOG_IMAGES_OPENROUTER_API_KEY');");
  });
});
