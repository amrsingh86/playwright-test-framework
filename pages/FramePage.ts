import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { runtimeConfig } from "../config/runtimeConfig";

export class FramePage extends BasePage {
    private readonly frameLink = this.page.getByRole('link', { name: 'iFrame' });
    private readonly frameLocator = this.page.frameLocator('#mce_0_ifr');
    private readonly textArea = this.frameLocator.locator('#tinymce');

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto(`${runtimeConfig.practiceBaseURL}/frames`);
    }

    async clickFrameLink(): Promise<void> {
        await this.frameLink.click();
    }

    async verifyTextAreaContent(expectedContent: string): Promise<void> {
        const actualContent = await this.textArea.textContent();
        expect(actualContent?.trim()).toBe(expectedContent);
    }
}