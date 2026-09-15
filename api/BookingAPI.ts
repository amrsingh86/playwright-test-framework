import { APIRequestContext } from "@playwright/test";
import { CreateBookingRequest } from "../test-data/TestData";

export class BookingAPI {
    private readonly baseURL = 'https://restful-booker.herokuapp.com';
    constructor (private readonly request: APIRequestContext) {} 

    async getBookings() {
        return await this.request.get(`${this.baseURL}/booking`);
    }

    async getBookingById(bookingId: number) {
        return await this.request.get(`${this.baseURL}/booking/${bookingId}`);
    }

    async createBooking(bookingData: CreateBookingRequest) {
        return await this.request.post(`${this.baseURL}/booking`, {
            data: bookingData,
        });
    }
    
    async createAuthToken(username: string, password: string) {
        return await this.request.post(`${this.baseURL}/auth`, {
            data: { username, password },
        });
    }

    async updateBooking(
        bookingId: number, 
        bookingData: CreateBookingRequest,
        authToken: string
    ) {
        return await this.request.put(`${this.baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${authToken}`,
            },

            data: bookingData,
            });
    }

    async deleteBooking(bookingId: number, authToken: string) {
        return await this.request.delete(`${this.baseURL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${authToken}`,
            },
        });
    }
}