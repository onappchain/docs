# Mint user guide docs

This repository contains the Mint end-user documentation site built with Mintlify.

The published guide covers:

- Getting started with Mint
- Creating Worlds and 3D Models
- Exploring, sharing, and going live
- Managing Credits, billing, and profile settings
- Troubleshooting and product limits

## AI-assisted writing

Set up your AI coding tool to work with Mintlify:

```bash
npx skills add https://mintlify.com/docs
```

This command installs Mintlify's documentation skill for your configured AI tools. The skill includes component reference, writing standards, and workflow guidance.

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview your documentation changes locally. To install, use the following command:

```
npm i -g mint
```

Run the following command at the root of your documentation, where your `docs.json` is located:

```
mint dev
```

View your local preview at `http://localhost:3000`.

Run `mint broken-links` before you ship navigation or content changes.

## Key files

- `docs.json` for navigation, branding, and site-level configuration
- `index.mdx` for the Mint user guide landing page
- Root-level `*.mdx` files for the main guide sections
- `AGENTS.md` for project-specific writing and terminology rules

## Publishing changes

Install our GitHub app from your [dashboard](https://dashboard.mintlify.com/settings/organization/github-app) to propagate changes from your repo to your deployment. Changes are deployed to production automatically after pushing to the default branch.

## Need help?

### Troubleshooting

- If your dev environment isn't running: Run `mint update` to ensure you have the most recent version of the CLI.
- If a page loads as a 404: Make sure you are running in a folder with a valid `docs.json`.

### Resources
- [Mintlify documentation](https://mintlify.com/docs)
