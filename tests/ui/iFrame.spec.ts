import { test, expect } from '@playwright/test';
import { FramePage } from '../../pages/FramePage';

test('Verify iFrame content', async ({ page }) => {
    const framePage = new FramePage(page);
    await framePage.navigate();
    await framePage.clickFrameLink();
    await framePage.verifyTextAreaContent('Your content goes here.');
});