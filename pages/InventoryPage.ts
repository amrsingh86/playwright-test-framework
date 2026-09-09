import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
    private readonly pageTitle = this.page.locator('.title');
    private readonly backPack = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    private readonly cartIcon = this.page.locator('.shopping_cart_link');

    constructor(page: Page) {
        super(page);
    }

    async verifyInventoryPage(): Promise<void> {
        await this.pageTitle.waitFor();
    }

    async verifyInventoryPageUrl(): Promise<void> {
        await this.page.waitForURL('/inventory.html');
    }

    async addBackPackToCart(): Promise<void> {
        await this.backPack.click();
    }

    async verifyCartItemCount(expectedCount: number): Promise<void> {
        await expect(this.cartIcon).toHaveText(expectedCount.toString());
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }
}