# WeekNab GitHub Pages

This directory contains the source files for the WeekNab project website, which is hosted using GitHub Pages.

## Structure

- `index.html` - The main landing page HTML
- `styles.css` - CSS styles for the website
- `index.js` - JavaScript for animations and interactions
- `images/` - SVG images for the website

## Development

To make changes to the GitHub Pages website:

1. Edit the files in this directory
2. Commit and push your changes to the main branch
3. GitHub Actions will automatically deploy the site to GitHub Pages

## Local Testing

To test the website locally:

```bash
# Navigate to the github-pages directory
cd github-pages

# Start a simple HTTP server (if you have Python installed)
python -m http.server 8000

# Or use any other local server of your choice
```

Then open your browser to `http://localhost:8000`

## Customization

- The GitHub repository URL in `index.html` is set to `https://github.com/sirgaladad/WeekNab`
- Update the website content as needed
- Add additional sections or pages as your project grows

## Deployment

The website is automatically deployed to GitHub Pages using the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

When you push changes to the main branch, the workflow will:

1. Build the Vue.js application
2. Copy the GitHub Pages files to the build directory
3. Deploy the contents to the `gh-pages` branch

The site will be available at `https://sirgaladad.github.io/WeekNab/` 