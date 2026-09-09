import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test ('Successful login', async ( {page} ) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    await inventoryPage.verifyInventoryPageUrl();
    await inventoryPage.verifyInventoryPage();
})