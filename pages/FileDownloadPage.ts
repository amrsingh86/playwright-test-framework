
import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { BasePage } from './BasePage';
import { runtimeConfig } from '../config/runtimeConfig';

export class FileDownloadPage extends BasePage {

    // Locator for the file download link
    private readonly downloadLink =
        this.page.getByRole('link', {
            name: 'playwright-test.txt',
            exact: true
        });

    constructor(page: Page) {
        super(page);
    }

    // Navigate to the file download page
    async navigate(): Promise<void> {
        await this.page.goto(
            `${runtimeConfig.practiceBaseURL}/download`
        );
    }

    // Download the file, save it locally and return its path
    async downloadFile(): Promise<string> {

        // Start listening before clicking so the download event is not missed
        const downloadPromise =
            this.page.waitForEvent('download');

        // Click the file link to trigger the download
        await this.downloadLink.click();

        // Wait for Playwright to capture the download event
        const download = await downloadPromise;

        // Verify that the download completed successfully
        const failure = await download.failure();

        if (failure) {
            throw new Error(`Download failed: ${failure}`);
        }

        // Define the directory where downloaded files will be saved
        const downloadDirectory = path.resolve(
            'test-results',
            'downloads'
        );

        // Create the directory if it does not already exist
        await fs.mkdir(downloadDirectory, {
            recursive: true
        });

        // Construct the full file path using the suggested filename
        const filePath = path.join(
            downloadDirectory,
            download.suggestedFilename()
        );

        // Save the downloaded file to the specified location
        await download.saveAs(filePath);

        // Return the saved file path for validation in the test
        return filePath;
    }
}