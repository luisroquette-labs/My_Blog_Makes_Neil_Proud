#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMMON_GIT_DIR="$(git -C "$ROOT" rev-parse --path-format=absolute --git-common-dir)"
PRIMARY_ROOT="$(dirname "$COMMON_GIT_DIR")"

git -C "$ROOT" config core.hooksPath "$PRIMARY_ROOT/.githooks"

echo "Hooks instalados: todo push executará npm run preflight."
