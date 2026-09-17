# Team Koalafied: Main Site

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

- Most edits should only involve **content.js**– this handles almost all of the text on the website. This is fairly simple to do, just copy the existing syntax.
- **assetts/css/Site.js** then interprets the text that content.js receives and renders that into the layout of the website. You edit site.js to change the layout, add interactive elements etc. See "Adding a new section or page" below for details.
- **assets/css/site.css** adjusts the style of the website: the palette, the font, the spacing between elements. 
- Add any images used throughout the website to **assets/img**. Label the image file with an appropriate title. 
- To open the website locally, use **index.html**. The .html file itself is just a wrapper for content.js and site.js– it doesn't really contain anything to edit. 

## Adding a new section or page

**New section on the homepage** (like About, Sponsors, Join, Gallery):
1. In `content.js`, add a block for it, e.g.:
   ```js
   achievements: {
     thesis: "A few highlights from our seven seasons.",
     photo: { src: "assets/img/achievements.jpg", alt: "Team holding an award" },
     cards: [
       { title: "2x Excellence in Engineering", desc: "2025 and 2026 Southern Cross Regional." },
       { title: "FIRST Championship", desc: "Qualified in 2025, competed in Houston." }
     ]
   }
   ```
2. In `content.js`'s `nav` array, add `{ id: "yourid", label: "Your Label" }` so it shows up in the header.
3. In `assets/js/site.js`, write a small `renderYourSection()` function that combines the existing blocks (`introRow`, `blockIconList`, `blockResults`, `blockPhotoGrid`, `blockPhotoStage`, `blockBulletPoints`) inside `renderSection('yourid', ...)`. Copy `renderJoin()` as a template. If your section needs something none of these cover (like Sponsors' tier grouping), write it directly in your render function rather than forcing it into a reusable block.
4. Add `renderYourSection()` to the `main.innerHTML` chain in `boot()`.

**New standalone page** (like Resources, Robots):
1. Copy `resources.html`, rename it, and swap the `id="resources-page"` for your own id.
2. In `content.js`, add a data object for the page's content, and add it to `PAGE_ROUTES` at the top of `assets/js/site.js` (maps the nav id to the new `.html` file).
3. In `assets/js/site.js`, write a `renderYourPage()` function (see `renderResources()` for a template).
4. In `boot()`, grab the container by id and set `yourPage.innerHTML = renderYourPage()`, following the existing `resourcesPage`/`robotsPage` pattern.

## Alliance partner avatars

The Robots page shows each alliance partner's FIRST avatar next to its name. Partners are written in `content.js` as the team number, then the name, e.g. `"6510 Pymble Pride"`.

**This is automatic.** Whenever `content.js` changes on `main`, a GitHub Action downloads any new avatars from The Blue Alliance and commits them. Partners with no avatar in any season show their initials instead.

One-time setup: in the GitHub repo go to **Settings → Secrets and variables → Actions → New repository secret**, name it `TBA_KEY`, and paste a Read API key from https://www.thebluealliance.com/account.

To run it by hand (Node 18 or newer): `TBA_KEY=your_read_key node scripts/fetch-team-avatars.mjs`, then commit `assets/img/avatars/` and `assets/js/team-avatars.js`. It can also be started from the repo's **Actions** tab ("Update alliance avatars" → Run workflow).

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```
