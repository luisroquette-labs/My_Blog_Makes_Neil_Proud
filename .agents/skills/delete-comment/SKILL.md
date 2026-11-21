---
name: delete-comment
description: Audit comments, remove redundant or stale explanations, record decisions, and reduce the remaining comment allowance.
---

# Delete comments

1. Read each in-scope comment with the surrounding code. Classify it as tautology, stale, excuse, or decision record. Keep required legal and tool directives.
2. Delete tautologies and stale comments. For an excuse, delete the comment and file a specific issue for the underlying implementation. Move decisions to `docs/adr/` with context and consequences.
3. Run `npm run lint:comments` to see the current per-file allowance in `scripts/comment-baseline.json`. Lower the allowance for every file whose comments were removed. New files start at zero.
4. Run `node --test scripts/check-comments.check.mjs` and targeted project tests. Review the diff and report comment lines removed, remaining comments, issue and ADR links, and the estimated lines left to remove.
