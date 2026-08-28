@AGENTS.md

# CI e deploy

Use Node 24 (`nvm use`) e rode `bash scripts/install-hooks.sh` antes do primeiro
push neste checkout. Hook e GitHub Actions executam o mesmo `npm run preflight`.
Nunca use `--no-verify`, enfraqueça checks ou faça push direto para `main`.
