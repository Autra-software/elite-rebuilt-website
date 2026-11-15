# Elite Rebuilt Inspections website

Next.js 16 (App Router), React 19, Tailwind CSS 4. Live site: https://www.eliterebuilt.com
Inspection request form posts to Formspree.

## Working rules
- Always plan before coding. Present the plan and wait for the user's explicit approval before changing any code.
- The user reviews and approves every change. Never push, merge or open a pull request without explicit approval.
- Work on a feature branch, never directly on `main`. One commit per logical step.
- Attribution: credit Meridian Software Labs LLC as co-author in commits, PRs and files. Do not add Claude attribution lines.
- Files are checked out with Windows (CRLF) line endings. Never commit line-ending-only changes.

## Skills (`.claude/skills/`)
- `frontend-design`: primary skill for UI and visual design work.
- `design-taste-frontend`: only when a bolder, high-polish style is requested. Its Stop hook runs a headless Chrome/Edge check (needs Node 22+).
- `graphify`: knowledge graph of the codebase. Trigger: `/graphify`. When the user types `/graphify`, use the installed graphify skill before doing anything else.

## graphify knowledge graph

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
