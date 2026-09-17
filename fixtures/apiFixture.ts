import { test as base } from '@playwright/test';
import { BookingAPI } from '../api/BookingAPI';
import { runtimeConfig } from '../config/runtimeConfig';

type ApiFixtures = {
    bookingAPI: BookingAPI;
};

export const test = base.extend<ApiFixtures>({
    bookingAPI: async ({ request }, use) => {

        const bookingAPI = new BookingAPI(
            request,
            runtimeConfig.apiBaseURL
        );

        await use(bookingAPI);
    }
});

export { expect } from '@playwright/test';