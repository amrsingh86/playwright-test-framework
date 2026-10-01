import { test, expect } from '@playwright/test';
import { JavaScriptAlertsPage } from '../../pages/JavaScriptAlertsPage';

test.describe('JavaScript Alerts', () => {
    test('Accept JavaScript alert', async ({ page }) => {
        const jsAlertsPage = new JavaScriptAlertsPage(page);
        await jsAlertsPage.navigate();
        const dialogMessage = await jsAlertsPage.clickJSAlert();

        // Validate the message displayed inside the JavaScript alert
        expect(dialogMessage).toBe('I am a JS Alert');

        // Validate the result displayed after accepting the alert
        await jsAlertsPage.verifyResultText('You successfully clicked an alert');
    });
    
    test('Handle JavaScript confirm - accept', async ({ page }) => {
        const jsAlertsPage = new JavaScriptAlertsPage(page);
        await jsAlertsPage.navigate();
        const dialogMessage = await jsAlertsPage.clickJSConfirm(true);

        // Validate the message displayed inside the JavaScript confirm
        expect(dialogMessage).toBe('I am a JS Confirm');

        // Validate the result displayed after accepting the confirm dialog
        await jsAlertsPage.verifyResultText('You clicked: Ok');
    });
    
    test('Handle JavaScript confirm - dismiss', async ({ page }) => {
        const jsAlertsPage = new JavaScriptAlertsPage(page);
        await jsAlertsPage.navigate();
        const dialogMessage = await jsAlertsPage.clickJSConfirm(false);

        // Validate the message displayed inside the JavaScript 
        expect(dialogMessage).toBe('I am a JS Confirm');
        
        // Validate the result displayed after canceling the confirm dialog
        await jsAlertsPage.verifyResultText('You clicked: Cancel');
    });

    test('Enter text into JavaScript prompt', async ({ page }) => {
        const jsAlertsPage = new JavaScriptAlertsPage(page);
        await jsAlertsPage.navigate();
        const inputText = 'Playwright Test';
        const dialogMessage = await jsAlertsPage.clickJSPrompt(inputText);
        
        // Validate the message displayed inside the JavaScript prompt
        expect(dialogMessage).toBe('I am a JS prompt');
        
        // Validate the result displayed after entering text into the prompt
        await jsAlertsPage.verifyResultText(`You entered: ${inputText}`);
    });
});