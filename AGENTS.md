# AI Agent Collaboration Guide

## Mission Objective
Build and maintain a GitHub Pages site that shows all ESA member-state space agency headquarters in both table and interactive map form.

## Roles
- Data Agent: Maintains `data/esa_agencies.json` and verifies all 22 ESA member states are included.
- Frontend Agent: Maintains layout, accessibility, responsive behavior, and visual consistency.
- Mapping Agent: Maintains Leaflet map behavior, marker rendering, and popup correctness.
- QA Agent: Verifies checklist compliance before deployment.

## Definition of Done
- GitHub Pages site loads without console errors.
- Table contains 22 rows (all ESA member states in this mission scope).
- Each row includes: member state, agency name, city, country, full address, latitude, longitude.
- Map displays one marker per visible row.
- Search/filter keeps table and map synchronized.
- Design remains readable on desktop and mobile.

## File Ownership
- `index.html`: semantic structure and accessibility labels.
- `assets/css/styles.css`: theme, spacing, responsive behavior.
- `assets/js/app.js`: data loading, table rendering, filtering, map interactions.
- `data/esa_agencies.json`: authoritative headquarters dataset.
- `.github/workflows/deploy-pages.yml`: deployment automation.

## QA Quick Checks
1. Open site and confirm status badge shows `22 of 22 ESA members visible`.
2. Search by `Paris`, confirm table filters and map markers update together.
3. Clear search, click 3 random map markers, verify popup values match table.
4. Resize to mobile width and verify readability.
