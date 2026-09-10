import { test } from '../../fixtures/testFixture';
import path from 'path';
import { JsonReader } from '../../utils/JsonReader';

const testData = JsonReader.read(
    path.join(__dirname, '../../test-data/users.json')
);

test('Verify checkout page after proceeding from cart', async ({ inventoryPage }) => {
    await inventoryPage.verifyInventoryPage();
    await inventoryPage.addBackPackToCart();
    await inventoryPage.verifyCartItemCount(1);

    const cartPage = await inventoryPage.goToCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyBackpackInCart();

    const checkoutPage = await cartPage.proceedToCheckout();
    await checkoutPage.verifyCheckoutPage();
    await checkoutPage.fillCheckoutInformation(    
        testData.checkoutUser.firstName,
        testData.checkoutUser.lastName,
        testData.checkoutUser.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderConfirmation();
});