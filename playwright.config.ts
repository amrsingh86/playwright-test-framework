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
            testMatch: '**/tests/ui/**/*.spec.ts',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            testMatch: '**/tests/ui/**/*.spec.ts',
            use: { ...devices['Desktop Firefox']
            }
        },
        {
            name: 'webkit',
            testMatch: '**/tests/ui/**/*.spec.ts',
            use: { ...devices['Desktop Safari']
            }
        },
        {
            name: 'api',
            testMatch: '**/tests/api/**/*.spec.ts',
            use: {
            baseURL: runtimeConfig.apiBaseURL
            }
        }
    ],

    reporter: [
        ['html'],
        ['list']
    ]
});