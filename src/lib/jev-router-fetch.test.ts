import { afterEach, describe, expect, it, vi } from 'vitest';
import { createJevRouterFetch } from './jev-router-fetch';

afterEach(() => vi.unstubAllEnvs());

describe('Jev Router fetch', () => {
  it('roteia pelo Jev por padrão', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('{"choices":[{"message":{"content":"ok"}}]}'));
    await createJevRouterFetch(fetchImpl)('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', body: JSON.stringify({ model: 'fixed', messages: [] }) });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toMatchObject({ model: 'typesafe/jev-router', provider: { only: ['Anthropic'] } });
  });

  it('roteia e volta ao modelo fixo quando o Jev falha', async () => {
    vi.stubEnv('OPENROUTER_JEV_PERCENT', '100');
    const fetchImpl = vi.fn().mockResolvedValueOnce(new Response('{}', { status: 503 })).mockResolvedValueOnce(new Response('{"choices":[{"message":{"content":"ok"}}]}'));
    await createJevRouterFetch(fetchImpl)('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', body: JSON.stringify({ model: 'fixed', messages: [] }) });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).model).toBe('typesafe/jev-router');
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).provider).toEqual({ only: ['Anthropic'] });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).plugins).toEqual([{ id: 'jev-router', cost_tier: 'low', allowed_models: ['anthropic/claude-haiku-5.5', 'anthropic/claude-sonnet-5.5', 'anthropic/claude-opus-5.5'] }]);
    expect(JSON.parse(fetchImpl.mock.calls[1][1].body).model).toBe('fixed');
  });
});
