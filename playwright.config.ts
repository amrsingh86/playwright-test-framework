import { defineConfig, devices } from '@playwright/test';
import { runtimeConfig } from './config/runtimeConfig';


export default defineConfig({
    testDir: './tests',

    fullyParallel: true,

    use: {
        baseURL: runtimeConfig.uiBaseURL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],

    reporter: [
        ['html'],
        ['list']
    ]
});