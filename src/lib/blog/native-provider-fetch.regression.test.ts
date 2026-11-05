import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('REGRESSÃO: clientes do blog usam o fetch nativo do SDK', () => {
  it.each(['src/lib/blog/deepseek.ts', 'src/lib/blog/quality-gate.ts'])('%s não depende do fetch removido do JevRouter', (file) => {
    expect(readFileSync(file, 'utf8')).not.toContain('fetch: provider.fetch');
  });
});
