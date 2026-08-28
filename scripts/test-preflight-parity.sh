#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

grep -Fq 'npm run preflight' .githooks/pre-push
grep -Fq 'npm run preflight' .github/workflows/ci.yml
grep -Fq -- '--git-common-dir' scripts/install-hooks.sh
grep -Fq 'npm run audit:runtime' scripts/preflight.sh
grep -Fq 'node scripts/validate-product-site.mjs' scripts/preflight.sh
grep -Fq 'npm run lint' scripts/preflight.sh
grep -Fq 'npm test' scripts/preflight.sh
grep -Fq 'npm run build' scripts/preflight.sh

echo "Hook e CI usam o preflight canônico completo."
