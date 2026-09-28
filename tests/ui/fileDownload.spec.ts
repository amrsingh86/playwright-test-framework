
import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { FileDownloadPage } from '../../pages/FileDownloadPage';

test('Download and verify file', async ({ page }) => {

    const fileDownloadPage = new FileDownloadPage(page);

    //Navigate to download page
    await fileDownloadPage.navigate();

    //Download the file and get the downloaded file path
    const downloadedFilePath = await fileDownloadPage.downloadFile();

    // Verify the downloaded filename
    expect(path.basename(downloadedFilePath)).toBe('playwright-test.txt');

    // Retrieve file info from local
    //fs.stat() throws error if file doe snot exist
    const fileStats = await fs.stat(downloadedFilePath);

    // Verify that the file exists and is a regular file
    expect(fileStats.isFile()).toBe(true);

    // Verify that the file is not empty
    expect(fileStats.size).toBeGreaterThan(0);

    console.log('Downloaded file:', downloadedFilePath);
    console.log('File size:', fileStats.size, 'bytes');
});