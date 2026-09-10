import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test('Verify cart page after adding an item to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addBackPackToCart();

    const cartPage = await inventoryPage.goToCart();

    await cartPage.verifyCartPage();
    await cartPage.verifyBackpackInCart();
});