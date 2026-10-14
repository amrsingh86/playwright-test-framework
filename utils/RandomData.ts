
export class RandomData {

    // Generate a random first name
    static firstName(): string {
        return `TestUser${Math.floor(Math.random() * 100000)}`;
    }

    // Generate a unique email
    static email(): string {
        return `testuser${crypto.randomUUID()}@example.com`;
    }

    // Generate a random phone number
    static phoneNumber(): string {
        return `416${Math.floor(1000000 + Math.random() * 9000000)}`;
    }

    // Generate a random integer within a range
    static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate random booking data for Restful Booker API
    static bookingData() {
        return {
            firstname: this.firstName(),
            lastname: `Tester${this.randomNumber(100, 999)}`,
            totalprice: this.randomNumber(100, 500),
            depositpaid: true,
            bookingdates: {
                checkin: '2026-11-01',
                checkout: '2026-11-05'
            },
            additionalneeds: 'Breakfast'
        };
    }
}
