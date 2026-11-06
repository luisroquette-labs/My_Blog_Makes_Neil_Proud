import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

describe('retired autoblog deployment', () => {
  it('does not schedule generation or link-audit crons', () => {
    const config = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'));

    expect(config.crons).toBeUndefined();
  });
});
