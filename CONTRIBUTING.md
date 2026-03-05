# Contribute to the documentation

Thank you for contributing to the Mint user guide. This guide covers the workflow and writing standards for this repo.

## How to contribute

### Option 1: Edit directly on GitHub

1. Navigate to the page you want to edit
2. Click the "Edit this file" button (the pencil icon)
3. Make your changes and submit a pull request

### Option 2: Local development

1. Fork and clone this repository
2. Install the Mintlify CLI: `npm i -g mint`
3. Create a branch for your changes
4. Make changes
5. Navigate to the docs directory and run `mint dev`
6. Preview your changes at `http://localhost:3000`
7. Commit your changes and submit a pull request

Run `mint broken-links` before you open a pull request.

## Writing guidelines

- **Use active voice**: "Run the command" not "The command should be run"
- **Address the reader directly**: Use "you" instead of "the user"
- **Keep sentences concise**: Aim for one idea per sentence
- **Lead with the goal**: Start instructions with what the user wants to accomplish
- **Use consistent terminology**: Prefer `World`, `3D Model`, `Preview`, `Credits`, `Favorites`, `Profile`, `Account`, and `Live Room`
- **Use sentence case headings**: Match the guide's page and section style
- **Bold UI labels**: Write **Create**, **Profile**, and **Go Live**
- **Preserve access labels**: Keep `**Access:** ...` lines when a page or section has a specific visibility rule
- **Include examples**: Show, don't just tell
