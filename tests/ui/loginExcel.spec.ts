
import { test, expect } from '@playwright/test';
import path from 'path';

import { LoginPage } from '../../pages/LoginPage';
import { ExcelReader } from '../../utils/ExcelReader';

// Define the structure of each row in the Excel worksheet
interface LoginData {
    username: string;
    password: string;
    expectedResult: 'success' | 'locked' | 'invalid';
}

// Define the location of the Excel test data file
const excelPath = path.resolve(
    'test-data/excel/loginData.xlsx'
);

// Read login test data from the specified Excel worksheet
// Each row is converted into a TypeScript object
const loginData = ExcelReader.readExcel<LoginData>(
    excelPath,
    'LoginData'
);

// Data-driven testing: Generate a separate test for each Excel row
for (const data of loginData) {

    test(`Excel Login - ${data.username}`, async ({ page }) => {

        // Initialize the Login Page Object
        const loginPage = new LoginPage(page);

        // Navigate to the SauceDemo login page
        await page.goto('/');

        // Perform login using credentials retrieved from Excel
        // Reuse the Page Object instead of duplicating locators
        await loginPage.login(data.username, data.password);

        // Validate login behavior based on the expected result in Excel
        switch (data.expectedResult) {

            case 'success':
                // Verify successful login redirects to inventory page
                await expect(page).toHaveURL(/inventory.html/);
                break;

            case 'locked':
                // Verify locked-out users receive the correct error
                await expect(
                    page.locator('[data-test="error"]')
                ).toContainText('locked out');
                break;

            case 'invalid':
                // Verify invalid credentials display an error message
                await expect(
                    page.locator('[data-test="error"]')
                ).toContainText(
                    'Username and password do not match'
                );
                break;

            default:
                // Fail the test if Excel contains an unsupported result
                throw new Error(
                    `Unsupported result: ${data.expectedResult}`
                );
        }
    });
}