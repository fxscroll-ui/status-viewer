# Budget Control Status Viewer

A public GitHub Pages web application for viewing, searching, filtering, analyzing, and tracking budget control transactions from the `Transactions` Excel table.

The project was developed in **five parts**, covering the initial setup, web application, automation, dashboard enhancements, and final deployment/testing/documentation.

## Project Development — Parts 1–5

### Part 1 — Project Planning, Data Source & Initial Setup

The project was established as a lightweight public status-viewing system using a web front end and a JSON data layer.

Key work completed:

- Defined the Budget Control Status Viewer requirements and workflow.
- Identified the `Transactions` worksheet as the source of published transaction data.
- Structured the transaction data for web display through `data/database.json`.
- Established the GitHub repository and GitHub Pages deployment approach.
- Kept the source Excel workbook private and limited the public repository to fields intended for the status viewer.

### Part 2 — Web Application Development

The JavaScript-based status viewer was developed with a responsive interface and client-side data processing.

Key features completed:

- Responsive transaction table.
- Instant search.
- Responsibility Center filter.
- Status filter.
- Account Code filter.
- Rows-per-page selector.
- Pagination.
- Column sorting.
- Summary/KPI cards.
- Currency formatting.
- Loading and error states.
- Database generation timestamp.
- No application framework required.

The application is organized into:

- `index.html` — page structure, navigation, dashboard, transactions, statistics, charts, and transaction modal.
- `css/style.css` — responsive styling and layout.
- `js/app.js` — data loading, filtering, searching, sorting, pagination, statistics, charts, QR handling, and transaction actions.
- `data/database.json` — published transaction data.

### Part 3 — Automated Data Update Workflow

The project was connected to a Power Automate Desktop workflow so that the published transaction database can be refreshed from the Excel source without manually rebuilding the website.

The workflow is designed to:

1. Read the `Transactions` Excel table.
2. Process the transaction records.
3. Generate the JSON database used by the website.
4. Update `data/database.json` in the GitHub repository.
5. Allow GitHub Pages to publish the updated data automatically.

This separates the private source workbook from the public status viewer while keeping the published transaction data current.

### Part 4 — Dashboard, Statistics, Charts & Transaction Tools

The viewer was expanded from a basic transaction table into a complete status dashboard and analysis tool.

#### Dashboard

- Total Transactions KPI.
- Estimated Total KPI.
- Transactions With DV Numbers KPI.
- Pending / Review KPI.
- Attention Required section.
- Released Transactions section.
- Published database update timestamp.

#### Statistics

- Total number of transactions.
- Total number of Released transactions.
- Total number of transactions without DV numbers.
- Total estimated amount.
- Total amounts and transaction counts by Responsibility Center.
- Total amounts and transaction counts by Account Code.
- Responsive two-column statistics layout.

#### Charts

- Status Distribution.
- Transactions by Responsibility Center.
- Estimated Amount by Responsibility Center.

#### Transaction Details & QR

- View individual transaction details.
- Generate a QR code for a transaction's public page.
- Print the transaction details.
- Print the QR code separately.
- Use the transaction's View action to access its QR-enabled details.

#### Released Transactions

The dashboard was updated to show **all released transactions** rather than limiting the section to only the five most recent released records.

#### Status Display

The `Released` status text is displayed using the approved green text color `#266210` while retaining the existing status background styling.

### Part 5 — Deployment, Testing & Documentation

The final part focused on making the system operational and documenting how it is maintained.

Completed work:

- GitHub Pages deployment configured and verified.
- Production transaction data successfully published through the automation workflow.
- Website updates verified after database refreshes.
- Dashboard values verified against the published transaction data.
- Search functionality tested.
- Responsibility Center, Status, and Account Code filters tested.
- Pagination and rows-per-page controls tested.
- Statistics calculations and layouts tested.
- Charts verified.
- Transaction View and QR functionality tested.
- Printing behavior tested for both transaction details and QR output.
- Final documentation and user guidance established.

## Current Application Features

- Public GitHub Pages status viewer.
- Dashboard with transaction KPIs.
- Released Transactions display.
- Search and multiple filters.
- Sortable transaction table.
- Pagination and rows-per-page controls.
- Detailed transaction modal.
- QR-enabled transaction access.
- Transaction and QR printing.
- Statistics by Responsibility Center and Account Code.
- Status and responsibility-center charts.
- Automatic JSON database updates through the Power Automate Desktop workflow.
- Loading, error, and empty-result states.
- Responsive layout for desktop and smaller screens.

## Source Workbook

The sample `data/database.json` was originally generated from:

- Workbook: `2026 Budget Control(2).xlsx`
- Worksheet: `Transactions`
- Excel table: `Table1` (`A1:H32`)
- Sample records included: 31

The production workflow replaces `data/database.json` with the latest published transaction data.

## Repository Structure

```text
status-viewer/
├── css/
│   └── style.css
├── data/
│   └── database.json
├── docs/
│   └── Part 2 development notes
├── js/
│   └── app.js
├── index.html
├── LICENSE
└── README.md
```

## GitHub Pages Deployment

1. Upload or maintain the application files in the root of the GitHub repository.
2. Commit changes to `main`.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save the configuration.
7. Open the published GitHub Pages URL.

## Important Data Protection Note

Do **not** put the private Excel workbook itself in the public GitHub repository. Only publish the transaction fields that are intended to be available through the public status viewer.

## Maintenance Workflow

The intended production flow is:

```text
Private Excel Workbook
        ↓
Power Automate Desktop
        ↓
Published transaction JSON
        ↓
GitHub Repository
        ↓
GitHub Pages
        ↓
Public Budget Control Status Viewer
```

When the source transaction data changes, the automation updates the published JSON database. The website then displays the updated information without requiring the HTML application itself to be rebuilt.

## Project Status

**Parts 1–5 completed.**

The Budget Control Status Viewer is deployed, the automated data-update workflow is operational, and the main dashboard, transaction search/filtering, statistics, charts, QR functionality, printing, testing, and documentation have been completed.
