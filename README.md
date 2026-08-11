# Budget Control Status Viewer — Part 2

This package implements the JavaScript application for the GitHub Pages status viewer.

## Source workbook

The sample `data/database.json` was generated from:

- Workbook: `2026 Budget Control(2).xlsx`
- Worksheet: `Transactions`
- Excel table: `Table1` (`A1:H32`)
- Sample records included: 31

The production workflow will later replace `data/database.json` automatically from Power Automate.

## Features

- Responsive transaction table
- Instant search
- Department filter
- Status filter
- Account Code filter
- Rows-per-page selector
- Pagination
- Column sorting
- Summary cards
- PHP currency formatting
- Loading and error states
- Last database generation timestamp
- No external JavaScript libraries required

## Files

- `index.html` — page structure and controls
- `css/style.css` — responsive styling
- `js/app.js` — data loading, filtering, searching, sorting and pagination
- `data/database.json` — sample database generated from the uploaded Transactions sheet

## GitHub deployment

1. Upload the contents of this folder to the root of your GitHub repository.
2. Commit to `main`.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.
7. Open the GitHub Pages URL.

## Important

Do not put the Box Excel workbook itself in the public GitHub repository. Only publish the fields intended for the status viewer.

## Next part

Part 3 should build the Power Automate flow that reads the `Transactions` Excel table and updates `data/database.json` through the GitHub API.
