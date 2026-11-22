# ADR 0002: End-of-article action

## Context

An article needs a clear next action even when its owner has not configured a primary CTA. The site also tests alternative CTA copy while rendering the article on the server and caching it with ISR.

## Decision

Use the configured primary CTA when present. Otherwise offer sharing, plus a newsletter link when configured. Select an A/B CTA variant deterministically from the article slug and seven-day window measured from the Unix epoch. Send the selected variant with the click event. Calculate the week during server rendering; ISR keeps that selection fixed until the page is revalidated, so the client does not need a clock or a hydration-sensitive selection.

## Consequences

A cached article can continue showing the previous window's variant until ISR revalidation. Share links remain available when no primary CTA exists. Changes to variant selection or cache timing must account for consistent rendered markup and click attribution.
