import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {CheckoutPage} from "./CheckoutPage";

export class CartPage extends BasePage {
    private readonly pageTitle = this.page.locator('.title');
    private readonly cartItems = this.page.locator('[data-test="inventory-item-name"]');
    private readonly checkoutButton = this.page.locator('[data-test="checkout"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyCartPage(): Promise<void> {
        await expect(this.page).toHaveURL('/cart.html');
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    async verifyBackpackInCart(): Promise<void> {
        await expect(this.cartItems).toContainText('Sauce Labs Backpack');
    }

    async proceedToCheckout(): Promise<CheckoutPage> {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }
}
