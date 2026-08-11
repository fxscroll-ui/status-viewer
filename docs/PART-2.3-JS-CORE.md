# Part 2.3 — JavaScript Core

`js/app.js`:
1. Fetches `data/database.json`.
2. Reads either `payload.transactions` or a direct array.
3. Populates the table.
4. Calculates summary statistics.
5. Displays the database generation timestamp.
6. Handles loading and error states.

The cache-busting query string prevents an old browser cache from hiding a newly published database.
