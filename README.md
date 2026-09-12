# Team Koalafied — Main Site

The team's general-purpose website 

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
