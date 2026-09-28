import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { runtimeConfig } from '../config/runtimeConfig';

export class WindowsPage extends BasePage {
    private readonly clickHereLink = this.page.getByRole('link', { name: 'Click Here' });

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto(`${runtimeConfig.practiceBaseURL}/windows`);
    }

    async openNewWindow(): Promise<Page> {

        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
             this.clickHereLink.click()
        ]);

        return newPage;
    }   
}