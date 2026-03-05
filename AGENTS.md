# Documentation project instructions

## About this project

- This is Mint's end-user documentation site built on [Mintlify](https://mintlify.com)
- The audience is people using Mint to explore, create, share, and manage Worlds and 3D Models
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Terminology

- Use `World` for a walkable 3D space
- Use `3D Model` for a single downloadable object or character
- Use `Preview` for the image shown before final generation starts
- Use `Credits` for Mint's generation currency
- Use `Favorites`, `Profile`, `Account`, and `Live Room` as the canonical UI terms
- Use `sign in`, not `log in`
- Treat `Studio` and `Ops` as limited-access tools, not part of the standard user flow

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise and direct
- Use sentence case for headings
- Lead with what a page or feature is for before the steps
- Preserve `**Access:** ...` labels at the page level and wherever access differs inside a page
- Bold UI elements: Click **Create**
- Code formatting for file names, commands, paths, and code references
- Keep examples concrete and product-specific

## Content boundaries

- Prioritize the standard end-user Mint experience
- Clearly label optional/beta and limited-access features
- Keep `Ops` documentation high-level only and do not document internal admin workflows
- Document `Studio` only as a restricted workspace unless detailed access requirements are provided
- Do not invent pricing, quotas, limits, or access rules; if product details change, verify against the current in-product UI
- This site documents how to use Mint, not how to build or administer Mint
