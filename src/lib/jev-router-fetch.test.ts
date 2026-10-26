import { afterEach, describe, expect, it, vi } from 'vitest';
import { createJevRouterFetch } from './jev-router-fetch';

afterEach(() => vi.unstubAllEnvs());

describe('Jev Router fetch', () => {
  it('roteia pelo Jev por padrão', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('{"choices":[{"message":{"content":"ok"}}]}'));
    await createJevRouterFetch(fetchImpl)('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', body: JSON.stringify({ model: 'fixed', messages: [] }) });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toMatchObject({ model: 'typesafe/jev-router', provider: { only: ['Anthropic'] } });
  });

  it('roteia e volta ao Claude direto quando o Jev falha', async () => {
    vi.stubEnv('OPENROUTER_JEV_PERCENT', '100');
    const fetchImpl = vi.fn().mockResolvedValueOnce(new Response('{}', { status: 503 })).mockResolvedValueOnce(new Response('{"choices":[{"message":{"content":"ok"}}]}'));
    await createJevRouterFetch(fetchImpl)('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', body: JSON.stringify({ model: 'fixed', messages: [] }) });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).model).toBe('typesafe/jev-router');
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).provider).toEqual({ only: ['Anthropic'] });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).plugins).toEqual([{ id: 'jev-router', cost_tier: 'low', allowed_models: ['anthropic/claude-haiku-5.5', 'anthropic/claude-sonnet-5.5', 'anthropic/claude-opus-5.5'] }]);
    expect(JSON.parse(fetchImpl.mock.calls[1][1].body)).toMatchObject({ model: 'anthropic/claude-haiku-5.5', provider: { only: ['Anthropic'] } });
  });

  it('preserva a rota original se Jev e Claude falharem', async () => {
    vi.stubEnv('OPENROUTER_JEV_PERCENT', '100');
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(new Response('{}', { status: 503 }))
      .mockResolvedValueOnce(new Response(''))
      .mockResolvedValueOnce(new Response('{"choices":[{"message":{"content":"continuidade"}}]}'));
    const body = { model: 'z-ai/glm-5.3', messages: [] };
    const response = await createJevRouterFetch(fetchImpl)('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', body: JSON.stringify(body) });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetchImpl.mock.calls[2][1].body)).toEqual(body);
    expect((await response.json()).choices[0].message.content).toBe('continuidade');
  });
});
