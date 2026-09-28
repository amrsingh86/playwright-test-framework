import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { runtimeConfig } from "../config/runtimeConfig";

export class FileUploadPage extends BasePage {
    private readonly chooseFileInput = this.page.locator('#file-upload');
    private readonly uploadButton = this.page.locator('#file-submit');
    private readonly uploadedFilesText = this.page.locator('#uploaded-files');

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto(`${runtimeConfig.practiceBaseURL}/upload`);
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.chooseFileInput.setInputFiles(filePath);
        await this.uploadButton.click();
    }

    async verifyUploadedFile(expectedFileName: string): Promise<void> {
        await expect(this.uploadedFilesText).toHaveText(expectedFileName);
    }
}