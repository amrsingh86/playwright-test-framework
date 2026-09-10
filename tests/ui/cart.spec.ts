import { test } from '../../fixtures/testFixture';

test('Verify cart page after adding an item to the cart', async ({ inventoryPage }) => {
    await inventoryPage.verifyInventoryPage();
    await inventoryPage.addBackPackToCart();
    await inventoryPage.verifyCartItemCount(1);

    const cartPage = await inventoryPage.goToCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyBackpackInCart();
});