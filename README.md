# Team Koalafied — Main Site

The team's general-purpose website (replacing the old Google Sites page),
themed to match the season technical binder at
[`eh`](https://github.com/declan-kb/eh) / `2026.teamkoalafied.com`.

Deployed separately from `eh` — this is the evergreen team site (root
domain), `eh` is the per-season binder (`2026.` subdomain). Shared theming
lives in [koalafied-design-system](https://github.com/declan-kb/koalafied-design-system).

## Structure

Same content/render split as the binder site:

- **`content.js`** — the only file most edits touch. Team info, hero copy,
  About/Programs/Gallery/Sponsors/Join/Contact content, all plain data.
- **`assets/js/site.js`** — reads `window.SITE_CONTENT` and builds the page.
  Only touch this to add a new *kind* of section, not to edit copy.
- **`assets/css/site.css`** — same design tokens as `binder.css` (palette,
  type, spacing). Change `--accent` etc. in `:root` to re-theme.
- **`index.html`** — thin shell; loads fonts, `content.js`, `site.js`.

## To do before going live

- [x] Replace placeholder gallery images with real photos (pulled from
      `../eh/new website stuff/`) — worth adding more over time
- [x] Copy the full sponsor list from `../eh/content.js`
- [ ] Point `CNAME` (currently `teamkoalafied.com`) at this repo in GitHub
      Pages settings, and update the domain's DNS
- [ ] Swap the placeholder contact email in `content.js`
- [ ] Review copy in every section of `content.js` — it's scaffold text, not
      final

## Local preview

No build step — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```
