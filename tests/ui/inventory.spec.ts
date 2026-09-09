import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test('Verify inventory page after successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyInventoryPage();
    await inventoryPage.addBackPackToCart();
    await inventoryPage.verifyCartItemCount(1);
});