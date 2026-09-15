export interface TestData {
    validUser: {
        username: string;
        password: string;
    };

    checkoutUser: {
        firstName: string;
        lastName: string;
        postalCode: string;
    };
}

export interface BookingDates {
    checkin: string;
    checkout: string;
}

export interface CreateBookingRequest {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}