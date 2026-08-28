#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

EXPECTED_NODE="$(tr -d '[:space:]' < .nvmrc)"
ACTUAL_NODE="$(node -p 'process.versions.node.split(".")[0]')"
if [[ "$ACTUAL_NODE" != "$EXPECTED_NODE" ]]; then
  echo "Node $EXPECTED_NODE obrigatório; encontrado Node $ACTUAL_NODE."
  exit 1
fi

if [[ "${NODE_OPTIONS:-}" != *"--max-old-space-size="* ]]; then
  export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--max-old-space-size=4096"
fi

npm run test:preflight-parity
npm run audit:runtime
node scripts/validate-product-site.mjs
npm run lint
npm test
npm run build
