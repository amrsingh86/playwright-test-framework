import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import path from 'path';
import { JsonReader } from '../utils/JsonReader';
import { TestData } from '../test-data/TestData';

type TestFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};

const testData = JsonReader.read<TestData>(
    path.join(__dirname, '../test-data/users.json')
);

export const test = base.extend<TestFixtures>({
    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        const inventoryPage = await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
        );
        await use(inventoryPage);
    }
});