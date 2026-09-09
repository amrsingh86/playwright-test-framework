import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryPage } from "./InventoryPage";

export class LoginPage extends BasePage {
    private readonly usernameInput = this.page.locator('#user-name');
    private readonly passwordInput = this.page.locator('#password');
    private readonly loginButton = this.page.locator('#login-button');

    constructor(page: Page) {
        super(page);
    }

    async login(username: string, password: string): Promise<InventoryPage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        return new InventoryPage(this.page);
    }
}
