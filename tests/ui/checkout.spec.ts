import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test('Verify checkout page after proceeding from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addBackPackToCart();
    await inventoryPage.verifyCartItemCount(1);

    const cartPage = await inventoryPage.goToCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyBackpackInCart();

    const checkoutPage = await cartPage.proceedToCheckout();
    await checkoutPage.verifyCheckoutPage();
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderConfirmation();
});