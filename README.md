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
- **assetts/css/Site.js** then interprets the text that content.js receives and renders that into the layout of the website. You edit site.js to change the layout, add interactive elements etc. 
- **assets/css/site.css** adjusts the style of the website: the palette, the font, the spacing between elements. 
- Add any images used throughout the website to **assets/img**. Label the image file with an appropriate title. 
- To open the website locally, use **index.html**. The .html file itself is just a wrapper for content.js and site.js– it doesn't really contain anything to edit. 

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```
