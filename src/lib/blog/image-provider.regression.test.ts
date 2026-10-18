import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('blog image provider', () => {
  it('routes cover, infographic and body images through the approved three tiers', () => {
    const source = readFileSync(new URL('./image-gen.ts', import.meta.url), 'utf8');
    expect(source).toContain("'bytedance-seed/seedream-5-0-pro'");
    expect(source).toContain("'bytedance-seed/seedream-4.5'");
    expect(source).toContain("'google/gemini-3.1-flash-lite-image'");
    expect(source).toContain("'https://openrouter.ai/api/v1/images'");
    expect(source).toContain("resolution: tier === 'fast' ? '1K' : '2K'");
    expect(source).toContain("aspect_ratio: size === '1024x1024' ? '1:1' : '16:9'");
    expect(source).toContain("generateImageB64(prompt, 'premium')");
    expect(source).toContain("'standard',\n      '1024x1024'");
    expect(source).toContain("generateImageB64(prompts[i], 'fast')");
    expect(source).toContain('process.env.MY_BLOG_IMAGES_OPENROUTER_API_KEY');
    expect(source).not.toContain('process.env.MY_BLOG_OPENROUTER_API_KEY');
    expect(source).not.toContain("model: 'openai/gpt-image-1'");

    const setup = readFileSync(new URL('../../app/setup/page.tsx', import.meta.url), 'utf8');
    expect(setup).toContain("const images = envPresent('MY_BLOG_IMAGES_OPENROUTER_API_KEY');");
  });
});
