import {expect, Page, test} from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
    private readonly pageTitle = this.page.locator('.title');
    private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
    private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
    private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
    private readonly continueButton = this.page.locator('[data-test="continue"]');
    private readonly finishButton = this.page.locator('[data-test="finish"]');
    private readonly confirmationMessage = this.page.locator('.complete-header');

    constructor(page: Page) {
        super(page);
    }

    async verifyCheckoutPage(): Promise<void> {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
        await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderConfirmation(): Promise<void> {
        await expect(this.page).toHaveURL('/checkout-complete.html');
        await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
    }
}