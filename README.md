# Team Koalafied — Main Site

The team's general-purpose website 

## How to do simple edits
2 options:
* Edit content.js directly on the github website (no option to preview)
* Edit locally on your computer
	1. You should have github desktop installed and the repo cloned
	2. Edit the content.js file locally in a text-editor of choice (e.g. vscode or textedit)
	3. You can preview the changes by opening index.html in the root folder
	4. Once changes are complete commit and push to origin. It will take a couple minutes to deploy to the live website. 

## Structure


- **`content.js`** — the only file most edits touch. Team info, hero copy,
  About/Programs/Gallery/Sponsors/Join/Resources content, all plain data.
- **`assets/js/site.js`** — reads `window.SITE_CONTENT` and builds the page.
  Only touch this to add a new *kind* of section, not to edit copy. Also
  builds `resources.html` — nav is page-aware (see comment above `renderNav`).
- **`assets/css/site.css`** — same design tokens as `binder.css` (palette,
  type, spacing). Change `--accent` etc. in `:root` to re-theme.
- **`index.html`** / **`resources.html`** — thin shells; load fonts,
  `content.js`, `site.js`.
- **`assets/img`** – stores all the media files and images for the website


## Local preview

No build step — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```
