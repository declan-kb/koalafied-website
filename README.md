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
3. In `assets/js/site.js`, write a small `renderYourSection()` function that combines the existing blocks (`introRow`, `blockCardGrid`, `blockEventCarousel`, `blockImageCarousel`, `blockBulletPoints`, `blockSponsorTiers`) inside `renderSection('yourid', ...)`. Copy `renderJoin()` as a template.
4. Add `renderYourSection()` to the `main.innerHTML` chain in `boot()`.

**New standalone page** (like Resources, Robots):
1. Copy `resources.html`, rename it, and swap the `id="resources-page"` for your own id.
2. In `content.js`, add a data object for the page's content, and add it to `PAGE_ROUTES` at the top of `assets/js/site.js` (maps the nav id to the new `.html` file).
3. In `assets/js/site.js`, write a `renderYourPage()` function (see `renderResources()` for a template).
4. In `boot()`, grab the container by id and set `yourPage.innerHTML = renderYourPage()`, following the existing `resourcesPage`/`robotsPage` pattern.

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```
