
# Playwright TypeScript Automation Framework

A scalable test automation framework built using Playwright and TypeScript, demonstrating UI automation, REST API testing, data-driven testing, reusable Page Object Model architecture, and CI/CD integration.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- REST API Testing
- JSON and Excel test data

## Key Features

- Page Object Model (POM) architecture
- BasePage for reusable functionality
- Custom Playwright fixtures
- UI automation for login, inventory, cart, and checkout
- REST API CRUD automation
- API request chaining and negative testing
- JSON-driven and Excel-driven testing
- Random test data generation
- Reusable logging utility
- Smoke and regression test tagging
- Cross-browser testing with Chromium, Firefox, and WebKit
- Screenshots, videos, traces, and HTML reporting
- GitHub Actions CI/CD integration

## Applications Under Test

### UI Testing
SauceDemo: https://www.saucedemo.com

### API Testing
Restful Booker: https://restful-booker.herokuapp.com

### Advanced Playwright Scenarios
The Internet: https://the-internet.herokuapp.com

## Framework Structure

```text
playwright-test-framework/
├── .github/workflows/
│   └── playwright.yml
├── api/
│   └── BookingAPI.ts
├── config/
│   ├── environments.ts
│   └── runtimeConfig.ts
├── fixtures/
│   ├── testFixture.ts
│   └── apiFixture.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── scripts/
│   └── createLoginExcel.ts
├── test-data/
│   ├── users.json
│   ├── TestData.ts
│   └── excel/loginData.xlsx
├── tests/
│   ├── ui/
│   └── api/
├── utils/
│   ├── JsonReader.ts
│   ├── ExcelReader.ts
│   ├── RandomData.ts
│   └── Logger.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/amrsingh86/playwright-test-framework.git
cd playwright-test-framework
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression tests:

```bash
npx playwright test --grep @regression
```

Run API tests:

```bash
npx playwright test --grep @api
```

Run Chromium smoke tests:

```bash
npx playwright test --grep @smoke --project=chromium
```

Run Firefox tests:

```bash
npx playwright test --project=firefox
```

Run WebKit tests:

```bash
npx playwright test --project=webkit
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## Test Reporting

The framework supports:

- HTML reports
- Screenshots on failure
- Videos retained on failure
- Playwright Trace Viewer
- Configurable retries

Open the HTML report:

```bash
npx playwright show-report
```

## CI/CD Integration

GitHub Actions automatically executes the smoke suite when code is pushed to the main branch or a pull request targets main.

The pipeline:

1. Checks out the repository
2. Configures Node.js
3. Installs project dependencies
4. Installs Chromium
5. Validates TypeScript
6. Executes smoke tests
7. Uploads HTML reports and test artifacts

Workflow configuration:

`.github/workflows/playwright.yml`

## Framework Design Principles

- Separation of test logic from page interactions
- Reusable components and fixtures
- Centralized test data
- Maintainable test architecture
- Independent UI and API automation
- Selective execution using test tags
- Automated validation through CI/CD

## Author

Amrinder Singh

QA Automation Engineer

GitHub: https://github.com/amrsingh86