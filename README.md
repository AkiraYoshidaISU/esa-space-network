# ESA Mission Control Atlas

Static site for GitHub Pages that provides:
- A complete headquarters table for all 22 ESA member states
- An interactive Leaflet map with synchronized agency markers

## Project Structure
- `index.html`: page layout and semantic sections
- `assets/css/styles.css`: responsive styling
- `assets/js/app.js`: data loading, filtering, map/table rendering
- `data/esa_agencies.json`: agency headquarters dataset
- `.github/workflows/deploy-pages.yml`: automatic Pages deployment on push to `main`
- `AGENTS.md`: collaboration and QA checklist

## Deploy to GitHub Pages
1. Push this folder to a GitHub repository.
2. Ensure the default branch is `main`.
3. In repository settings, enable GitHub Pages with `GitHub Actions` as source.
4. Push changes; workflow deploys automatically.

## Local Preview
Use any static server. Example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.
