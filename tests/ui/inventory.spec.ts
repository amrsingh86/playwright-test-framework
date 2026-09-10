import { test } from '../../fixtures/testFixture';

test('Verify inventory page after successful login', async ({ inventoryPage }) => {
    await inventoryPage.verifyInventoryPage();
    await inventoryPage.addBackPackToCart();
    await inventoryPage.verifyCartItemCount(1);
});