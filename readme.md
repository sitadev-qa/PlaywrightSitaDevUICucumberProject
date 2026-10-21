# OrangeHRM user creation with Playwright and Cucumber

This project contains one end-to-end scenario: log in to the OrangeHRM demo, open **Admin → User Management**, create an enabled administrator user, and verify it appears in the user list. Page interactions are kept in page objects; the Cucumber steps describe the flow.

## Prerequisites

- Node.js 20 or later
- Java 8 or later (required by the Allure command-line report generator)

## Install

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
```

The demo credentials are shown on the OrangeHRM demo login page. Override them in `.env` if needed. `ORANGEHRM_BASE_URL` should be the site root, not the `/auth/login` URL. Do not commit `.env`.

## Run the scenario

```powershell
npm test
```

To run with a visible Chromium window:

```powershell
$env:HEADLESS = 'false'
npm test
Remove-Item Env:HEADLESS
```

The username created by the scenario is generated uniquely for each run. The associated employee is the demo account's **Peter Mac Anderson**.

## Allure report

```powershell
npm run test:allure
npm run report:open
```

Cucumber writes results to `allure-results`; the report is generated in `allure-report`.

## Project layout

- `features/admin-user-management.feature` — the single feature and scenario
- `features/pages/` — Playwright page objects
- `features/step_definitions/` — Cucumber step implementations
- `features/support/` — per-scenario browser lifecycle and World
- `cucumber.js` — Cucumber and Allure reporter configuration


Demo

10 Test Data

Feature:

Scenario Outline:

GIVEN I will be working as a <username>
WHEN I netered the <password>
THEN I will validate the <user>

Example:

| username  | password | user 
| admin     | admin123 | demo
| admin1    | admin123 | demo
| admin2    | admin123 | demo
| admin3    | admin123 | demo


Background
-----------