// src/lib/blog/image-gen.ts
import sharp from 'sharp';
import { uploadImageToStorage } from './supabase-blog';
import { AUTOBLOG_PROFILE } from '@/lib/autoblog-profile';

const OPENROUTER_IMAGES_URL = 'https://openrouter.ai/api/v1/images';

async function requestImage(body: Record<string, unknown>): Promise<string | null> {
  const apiKey = process.env.MY_BLOG_IMAGES_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('MY_BLOG_IMAGES_OPENROUTER_API_KEY not configured');
  const response = await fetch(OPENROUTER_IMAGES_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'openai/gpt-image-1', ...body }),
  });
  if (!response.ok) throw new Error(`OpenRouter image request failed: ${response.status}`);
  const data = await response.json() as { data?: Array<{ b64_json?: string }> };
  return data.data?.[0]?.b64_json ?? null;
}

/** PNG 1536x1024 do gpt-image-1 → 1280x853 webp q80 (~150-250KB; Neil: "5MB → 200KB"). */
async function optimizeToWebp(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(1280, 853, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();
}

async function generateImageB64(prompt: string): Promise<string | null> {
  // gpt-image-1: sempre retorna b64_json (response_format não é aceito),
  // quality aceita 'low'|'medium'|'high'|'auto', size aceita 1024x1024|1536x1024|1024x1536|auto
  return requestImage({
    prompt,
    size: '1536x1024',
    quality: 'medium',
  });
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
    const b64 = await requestImage({
      prompt: `${prompt}, clean infographic style, bold shapes and icons, flat design, NO text, no words, no letters`,
      size: '1024x1024',
      quality: 'medium',
    });
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
