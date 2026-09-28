import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../../pages/FileUploadPage';
import path from 'path';

test('File upload test', async ({ page }) => {
    const fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.navigate();

    // Define the path to the file to be uploaded
    const filePath = path.resolve(__dirname, '../../test-data/upload-test.txt');

    // Upload the file
    await fileUploadPage.uploadFile(filePath);

    // Verify that the file was uploaded successfully
    await expect(fileUploadPage.verifyUploadedFile('upload-test.txt'));
    
});