import {test, expect} from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../pages/LoginPage';
import { TestData } from '../../test-data/TestData';
import { JsonReader } from '../../utils/JsonReader';

// Read login credentials from JSON file
const testData = JsonReader.read<TestData>(
    path.resolve('test-data/users.json')
);

test ('Verify Successful login', { tag: ['@smoke', '@regression', '@ui'] }, 
    async ( {page} ) => {
    
    //Initialize the LoginPage object
    const loginPage = new LoginPage(page);
    
    //Naviagte to SauceDemo
    await page.goto('/');

    // Login using credentials from JSON test data
    const inventoryPage = await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
    );

    // Verify successful login and inventory page
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    await inventoryPage.verifyInventoryPageUrl();
    await inventoryPage.verifyInventoryPage();
})