import { test, expect } from '@playwright/test';
import { WindowsPage } from '../../pages/WindowsPage';
import { runtimeConfig } from '../../config/runtimeConfig';

test('Handle new browser tab', async ({ page }) => {
    const windowsPage = new WindowsPage(page);
    await windowsPage.navigate();

    const newPage = await windowsPage.openNewWindow();

    await expect(newPage.locator('h3')).toHaveText('New Window');
    await expect(newPage).toHaveURL(`${runtimeConfig.practiceBaseURL}/windows/new`);
});