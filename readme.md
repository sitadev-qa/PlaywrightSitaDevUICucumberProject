# OrangeHRM user creation with Playwright and Cucumber

This project contains end-to-end scenarios for creating an enabled administrator user and a nationality in the OrangeHRM demo. Page interactions are kept in page objects; the Cucumber steps describe the flows.

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

## GitHub Actions

The `Feature tests` workflow runs all Cucumber features on every push and daily at 8:00 PM India Standard Time (14:30 UTC). It installs Chromium, runs `npm test -- --format progress`, and posts the workflow result to Microsoft Teams when configured.

To enable Teams notifications, create a GitHub Actions repository secret named `TEAMS_WEBHOOK_URL` containing the webhook URL for the channel. Until the secret is set, the workflow runs the tests normally and notes in the run summary that the notification was skipped.

## Allure report

```powershell
npm run test:allure
npm run report:open
```

Cucumber writes results to `allure-results`; the report is generated in `allure-report`.

## Project layout

- `features/` — Cucumber feature files for user and nationality management
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


Multiple Env
------------

QA
Stage
Production

CI - CD
-------

CI - CD -> Push our code (main) -> Sanity Run -> YML File -> Sanity is PASSED.