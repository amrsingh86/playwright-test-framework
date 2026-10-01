import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { runtimeConfig } from '../config/runtimeConfig';
import { text } from 'stream/consumers';

export class JavaScriptAlertsPage extends BasePage {
    private readonly jsAlertButton = this.page.getByRole('button', { name: 'Click for JS Alert' });
    private readonly jsConfirmButton = this.page.getByRole('button', { name: 'Click for JS Confirm' });
    private readonly jsPromptButton = this.page.getByRole('button', { name: 'Click for JS Prompt' });
    private readonly resultText = this.page.locator('#result');

    constructor(page: Page) {
        super(page);
    }

    // Navigate to the JavaScript alerts practice page
    async navigate(): Promise<void> {
        await this.page.goto(`${runtimeConfig.practiceBaseURL}/javascript_alerts`);
    }

    // Accept a standard JavaScript alert
    async clickJSAlert(): Promise<string> {
        let dialogMessage: string = '';
        // Capture the dialog message before accepting the alert
        this.page.once('dialog', async (dialog) => {
            dialogMessage = dialog.message();
            await dialog.accept();
        });
        await this.jsAlertButton.click();
        return dialogMessage;
    }

    // Accept or dismiss the confirmation dialog
    async clickJSConfirm(accept: boolean): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
    
        // Trigger the dialog without waiting for the click to complete first
        const clickPromise = this.jsConfirmButton.click();
            const dialog = await dialogPromise;
    
        // Capture the dialog message before closing it
        const dialogMessage = dialog.message();
    
        if (accept) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    
        // Ensure the click operation has completed after handling the dialog
        await clickPromise;
        return dialogMessage;
    }

    // Enter text into the prompt and accept it
    async clickJSPrompt(text: string): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
        
        // Trigger the dialog without waiting for the click to complete first
        const clickPromise = this.jsPromptButton.click();
        const dialog = await dialogPromise;

        // Capture the dialog message before closing it
        const dialogMessage = dialog.message();
        await dialog.accept(text);

        // Ensure the click operation has completed after handling the dialog
        await clickPromise;
        return dialogMessage;
    }

    async verifyResultText(expectedText: string): Promise<void> {
        await expect(this.resultText).toHaveText(expectedText);
    }
}