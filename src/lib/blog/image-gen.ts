// src/lib/blog/image-gen.ts
import sharp from 'sharp';
import { uploadImageToStorage } from './supabase-blog';
import { AUTOBLOG_PROFILE } from '@/lib/autoblog-profile';

const OPENROUTER_IMAGE_MODEL = 'openai/gpt-image-1';

/** PNG 1536x1024 do gpt-image-1 → 1280x853 webp q80 (~150-250KB; Neil: "5MB → 200KB"). */
async function optimizeToWebp(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(1280, 853, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();
}

async function generateImageB64(prompt: string, size: '1536x1024' | '1024x1024' = '1536x1024'): Promise<string | null> {
  const openRouterKey = process.env.MY_BLOG_IMAGES_OPENROUTER_API_KEY
    || process.env.MY_BLOG_OPENROUTER_API_KEY;
  if (openRouterKey) {
    const response = await fetch('https://openrouter.ai/api/v1/images', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openRouterKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OPENROUTER_IMAGE_MODEL,
        prompt,
        n: 1,
        size,
        quality: 'medium',
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!response.ok) throw new Error(`OpenRouter image HTTP ${response.status}`);
    const data = (await response.json()) as { data?: Array<{ b64_json?: string }> };
    return data.data?.[0]?.b64_json ?? null;
  }

  return null;
}

export async function generateAndUploadCover(
  prompt: string,
  slug: string,
): Promise<string | null> {
  if (!AUTOBLOG_PROFILE.integrations.imageGenerationEnabled) return null;
  if (!prompt?.trim()) return null; // prompt vazio = chamada paga desperdiçada

  try {
    const b64 = await generateImageB64(prompt);
    if (!b64) return null;

    const webp = await optimizeToWebp(Buffer.from(b64, 'base64'));
    return await uploadImageToStorage(`${slug}.webp`, webp, 'image/webp');
  } catch (err) {
    console.error('[image-gen] Falhou, artigo será publicado sem capa:', err);
    return null;
  }
}

/** Infográfico (quadrado, sem texto — IA não gera texto legível confiável):
 *  resumo visual no fim do artigo, compartilhável. Flag infographicsEnabled. */
export async function generateAndUploadInfographic(
  prompt: string,
  slug: string,
): Promise<string | null> {
  if (!AUTOBLOG_PROFILE.integrations.infographicsEnabled) return null;
  if (!prompt?.trim()) return null; // prompt vazio = chamada paga desperdiçada

  try {
    const b64 = await generateImageB64(
      `${prompt}, clean infographic style, bold shapes and icons, flat design, NO text, no words, no letters`,
      '1024x1024',
    );
    if (!b64) return null;

    const webp = await sharp(Buffer.from(b64, 'base64'))
      .resize(1024, 1024, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();
    return await uploadImageToStorage(`${slug}-infographic.webp`, webp, 'image/webp');
  } catch (err) {
    console.warn('[image-gen] Infográfico falhou (não bloqueia publicação):', err);
    return null;
  }
}

/** 1-2 imagens para o corpo do artigo, com alt por keyword (quebram o texto). */
export async function generateAndUploadBodyImages(
  prompts: string[],
  slug: string,
  keyword: string,
): Promise<Array<{ url: string; alt: string }>> {
  if (!AUTOBLOG_PROFILE.integrations.imageGenerationEnabled) return [];

  const results: Array<{ url: string; alt: string }> = [];
  for (let i = 0; i < prompts.length; i++) {
    if (!prompts[i]?.trim()) continue; // prompt vazio = chamada paga desperdiçada
    try {
      const b64 = await generateImageB64(prompts[i]);
      if (!b64) continue;
      const webp = await optimizeToWebp(Buffer.from(b64, 'base64'));
      const url = await uploadImageToStorage(`${slug}-body-${i + 1}.webp`, webp, 'image/webp');
      if (url) results.push({ url, alt: `${keyword} — ilustração ${i + 1}` });
    } catch (err) {
      console.warn(`[image-gen] Imagem ${i + 1} do corpo falhou (não bloqueia publicação):`, err);
    }
  }
  return results;
}
