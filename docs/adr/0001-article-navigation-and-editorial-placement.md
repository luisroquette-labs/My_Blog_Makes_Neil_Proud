# Article navigation and editorial placement

## Context

Article headings are rendered with `rehype-slug`. The table of contents needs the same anchors. Image placement and keyword selection also need stable rules independent of generated prose.

## Decisions

- Build table of contents anchors in application code with `github-slugger`, the same slug algorithm used by `rehype-slug`; generated text does not supply anchor IDs.
- Ignore headings inside triple-backtick code fences when building the table of contents.
- Place one or two body images before the second and fourth H2 when those headings exist, following the editorial guidance to break up long articles. Place an infographic before the final H2 and each inline CTA after its image.
- Filter Search Console `position` after receiving rows because it is a row metric, not a supported `dimensionFilterGroups` dimension. Use seed keywords when fewer than five eligible rows remain.

## Consequences

Navigation links follow the rendered heading IDs. Editorial placement stays deterministic. Search Console queries do not attempt an unsupported position filter.
