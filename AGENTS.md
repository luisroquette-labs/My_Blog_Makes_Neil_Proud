# CI e deploy

Use Node 24 (`nvm use`) e rode `bash scripts/install-hooks.sh` antes do primeiro
push neste checkout. Hook e GitHub Actions executam o mesmo `npm run preflight`.
Nunca use `--no-verify`, enfraqueça checks ou faça push direto para `main`.

## Fluxo Git por tarefa — regra básica

Para cada tarefa, crie uma branch dedicada a partir da `main` atualizada. Faça todos os commits relacionados nela e abra apenas um PR para `main`. Atualizações posteriores devem usar a mesma branch e o mesmo PR. Antes da integração, rode `mac-gate npm run preflight:ci` e confirme o Vercel Preview verde no SHA mais recente. Push direto para `main` é proibido, inclusive mediante autorização.
