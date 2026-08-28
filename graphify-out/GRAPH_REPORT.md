# Graph Report - myblog  (2026-08-28)

## Corpus Check
- 89 files · ~220,587 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 522 nodes · 873 edges · 44 communities (32 shown, 12 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e793f34`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AUTOBLOG_PROFILE
- generate/route.ts
- distribution.ts
- Release 1.0.0 (2026-08-19)
- devDependencies
- blog/[slug]/page.tsx
- compilerOptions
- dependencies
- comments.ts
- Controle (validation gate)
- ArticleBody.tsx
- deepseek.ts
- metrics.ts
- EndCta.tsx
- Controle (Control Stage)
- validate.ts
- supabase-blog.ts
- vercel.json
- Autoblog Hero Illustration
- sota-claim.js
- validate-product-site.mjs
- Favicon (My Blog Makes Neil Proud)
- 001_autoblog.sql
- site.js
- next.config.ts
- postcss.config.mjs
- Public Blog UI
- 004_editorial_calendar.sql
- 005_blog_comments.sql
- 006_blog_metrics.sql
- 007_blog_broken_links.sql
- Feature Request Template (PT-BR)
- public.articles
- public.articles

## God Nodes (most connected - your core abstractions)
1. `GET()` - 25 edges
2. `AUTOBLOG_PROFILE` - 24 edges
3. `compilerOptions` - 16 edges
4. `getClient()` - 12 edges
5. `regenerateWithFeedback()` - 9 edges
6. `Release 1.0.0 (2026-08-19)` - 9 edges
7. `generateArticle()` - 8 edges
8. `generateArticleOutline()` - 8 edges
9. `generateArticleFromOutline()` - 8 edges
10. `runQualityGate()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Tabela editorial_calendar` --conceptually_related_to--> `AUTOBLOG_PROFILE`  [INFERRED]
  SETUP.md → src/lib/autoblog-profile.ts
- `SETUP.md (guia de instalação)` --references--> `AUTOBLOG_PROFILE`  [EXTRACTED]
  SETUP.md → src/lib/autoblog-profile.ts
- `validate-product-site.mjs` --references--> `Product site (docs/index.html)`  [INFERRED]
  .github/workflows/ci.yml → docs/index.html
- `PR Validation Checklist` --conceptually_related_to--> `SECURITY.md (política de segurança)`  [INFERRED]
  .github/pull_request_template.md → SECURITY.md
- `CONTRIBUTING.md (guia de contribuição)` --conceptually_related_to--> `PR Validation Checklist`  [INFERRED]
  CONTRIBUTING.md → .github/pull_request_template.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **O ciclo de um artigo (pipeline stages)** — assets_pipeline_map_pauta, assets_pipeline_map_producao, assets_pipeline_map_controle, assets_pipeline_map_seu_blog [EXTRACTED 1.00]
- **Autoblog Pipeline: Input, Processing, Output** — assets_autoblog_hero_input_panels, assets_autoblog_hero_processing_hub, assets_autoblog_hero_output_documents [EXTRACTED 1.00]
- **Cadeia de migrations Supabase 001–008 (tabelas e RLS)** — setup_supabase_migration_chain, setup_articles_table, setup_blog_run_log_table, setup_editorial_calendar_table, setup_blog_comments_table, setup_blog_metrics_table, setup_blog_broken_links_table [EXTRACTED 1.00]
- **Content Pipeline Flow (Pauta → Produção → Controle → Seu Blog)** — assets_pipeline_walkthrough_pauta, assets_pipeline_walkthrough_producao, assets_pipeline_walkthrough_controle, assets_pipeline_walkthrough_seu_blog [EXTRACTED 1.00]
- **Control Stage Publication Gates** — assets_pipeline_walkthrough_controle, assets_pipeline_walkthrough_daily_claim, assets_pipeline_walkthrough_rls_status [EXTRACTED 1.00]
- **Endpoints protegidos por CRON_SECRET (Bearer)** — setup_daily_generate_endpoint, setup_comments_moderate_endpoint, setup_guest_posts_endpoint, setup_cron_secret_auth [EXTRACTED 1.00]
- **Plano evolutivo em ondas (guias Neil Patel e RD Station)** — changelog_wave_a_foundations, changelog_wave_b_seo_content, changelog_wave_c_conversion, changelog_wave_d_authority [EXTRACTED 1.00]
- **Validação do banco (Controle mechanisms)** — assets_pipeline_map_claim_diario, assets_pipeline_map_rls, assets_pipeline_map_status_publicado [INFERRED 0.85]
- **Blog Brand Mark** — docs_favicon_favicon, docs_favicon_mb_monogram, docs_favicon_brand_palette [INFERRED 0.85]

## Communities (44 total, 12 thin omitted)

### Community 0 - "AUTOBLOG_PROFILE"
Cohesion: 0.08
Nodes (26): POST(), inter, metadata, supabaseHost, viewport, revalidate, AI_CRAWLERS, dynamic (+18 more)

### Community 1 - "generate/route.ts"
Cohesion: 0.11
Nodes (30): dynamic, GET(), maxDuration, buildEditorialBriefSection(), EditorialBrief, getClient(), getNextPlannedEntry(), markPublished() (+22 more)

### Community 2 - "distribution.ts"
Cohesion: 0.08
Nodes (37): GET(), maxDuration, POST(), buildDistributionArticle(), buildEmailDigestPayload(), buildSocialPost(), distributeArticle(), DISTRIBUTION_CHANNELS (+29 more)

### Community 3 - "Release 1.0.0 (2026-08-19)"
Cohesion: 0.07
Nodes (34): Bug Report Template (PT-BR), Pull Request Template, PR Validation Checklist, CI Workflow (npm ci, audit, lint, build), validate-product-site.mjs, A/B de CTA (rotação determinística por slug+semana), Guia Neil Patel (blogpost), Guia RD Station (+26 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (35): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography (+27 more)

### Community 5 - "blog/[slug]/page.tsx"
Cohesion: 0.11
Nodes (23): ArticlePage(), generateMetadata(), Props, revalidate, ArticleMetrics(), onScroll(), send(), CommentForm() (+15 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 7 - "dependencies"
Cohesion: 0.09
Nodes (23): github-slugger, googleapis, next, dependencies, github-slugger, googleapis, next, openai (+15 more)

### Community 8 - "comments.ts"
Cohesion: 0.19
Nodes (17): GET(), isAuthorized(), POST(), POST(), Comments(), Comment, CommentInput, CommentValidation (+9 more)

### Community 9 - "Controle (validation gate)"
Cohesion: 0.20
Nodes (15): My_Blog_Makes_Neil_Proud Pipeline Map, Claim diário (deduplicação de posts), Contexto editorial (tom e links internos), Controle (validation gate), Controle total do usuário (domínio, banco, credenciais, frequência, publicação), Geração opcional de texto, Keywords, Next.js (+7 more)

### Community 10 - "ArticleBody.tsx"
Cohesion: 0.21
Nodes (10): ArticleBody(), ArticleBodyProps, components, HastElement, isVideoOnlyParagraph(), cleanInline(), extractToc(), TocItem (+2 more)

### Community 11 - "deepseek.ts"
Cohesion: 0.07
Nodes (40): ArticleContent, ArticleOutline, askDeepseek(), blogTextProvider(), buildFeedbackSection(), buildInternalLinksSection(), buildUserPrompt(), generateArticle() (+32 more)

### Community 12 - "metrics.ts"
Cohesion: 0.33
Nodes (11): GET(), POST(), BOT_PATTERNS, getArticleMetrics(), getClient(), insertMetric(), isLikelyBot(), isValidMetricEvent() (+3 more)

### Community 13 - "EndCta.tsx"
Cohesion: 0.26
Nodes (9): CtaButton(), CtaButtonProps, EndCta(), EndCtaProps, buildShareUrls(), CtaVariant, hasPrimaryCta(), resolveCtaVariant() (+1 more)

### Community 14 - "Controle (Control Stage)"
Cohesion: 0.33
Nodes (10): Pipeline Walkthrough (4-Stage Content Engine), Keywords, Tone & Internal Links (Agenda Spec), Controle (Control Stage), Daily Claim, Next.js (Blog Target), Pauta (Agenda Stage), Produção (Content Production Stage), RLS & Published Status (Publication Gate) (+2 more)

### Community 15 - "validate.ts"
Cohesion: 0.31
Nodes (8): normalize(), fill(), makeValidInput(), rules(), validateArticle(), ValidationInput, ValidationIssue, ValidationResult

### Community 16 - "supabase-blog.ts"
Cohesion: 0.14
Nodes (22): BlogPage(), metadata, revalidate, CategoryPage(), Props, revalidate, sitemap(), ArticleCard() (+14 more)

### Community 18 - "vercel.json"
Cohesion: 0.29
Nodes (6): crons, functions, src/app/api/blog/generate/route.ts, ignoreCommand, maxDuration, memory

### Community 19 - "Autoblog Hero Illustration"
Cohesion: 0.70
Nodes (5): Autoblog Hero Illustration, Autoblog Analytics Line Chart, Autoblog Content Input Panels, Autoblog Published Output (Documents), Autoblog Processing Hub (Laptop)

### Community 20 - "sota-claim.js"
Cohesion: 0.40
Nodes (3): claimLab, claimTabs, claimViews

### Community 21 - "validate-product-site.mjs"
Cohesion: 0.40
Nodes (4): docs, ids, refs, root

### Community 22 - "Favicon (My Blog Makes Neil Proud)"
Cohesion: 0.67
Nodes (3): Blog Brand Palette (dark green #17201d + lime #d9ff57), Favicon (My Blog Makes Neil Proud), MB Monogram

## Knowledge Gaps
- **165 isolated node(s):** `copyButton`, `claimLab`, `claimTabs`, `claimViews`, `nextConfig` (+160 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AUTOBLOG_PROFILE` connect `AUTOBLOG_PROFILE` to `generate/route.ts`, `distribution.ts`, `Release 1.0.0 (2026-08-19)`, `blog/[slug]/page.tsx`, `deepseek.ts`, `EndCta.tsx`, `supabase-blog.ts`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `SETUP.md (guia de instalação)` connect `Release 1.0.0 (2026-08-19)` to `AUTOBLOG_PROFILE`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `Tabela editorial_calendar` connect `Release 1.0.0 (2026-08-19)` to `AUTOBLOG_PROFILE`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `copyButton`, `claimLab`, `claimTabs` to the rest of the system?**
  _165 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AUTOBLOG_PROFILE` be split into smaller, more focused modules?**
  _Cohesion score 0.07862679955703211 - nodes in this community are weakly interconnected._
- **Should `generate/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1064102564102564 - nodes in this community are weakly interconnected._
- **Should `distribution.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._