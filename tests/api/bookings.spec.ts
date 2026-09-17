import {test, expect} from '@playwright/test';
import { BookingAPI } from '../../api/BookingAPI';
import { CreateBookingRequest } from '../../test-data/TestData';

test('Get all bookings', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);
    const response = await bookingAPI.getBookings();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThan(0);
});

test('Get booking by ID', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);
    const response = await bookingAPI.getBookingById(5);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('totalprice');
    expect(responseBody).toHaveProperty('depositpaid');
    expect(responseBody).toHaveProperty('bookingdates');
});

test('Create and retrieve new booking', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);
    const bookingData: CreateBookingRequest = {
        firstname: 'Jack',
        lastname: 'Doey',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-09-20',
            checkout: '2026-09-25'
        },
        additionalneeds: 'Breakfast'
    };

    //Create a new booking
    const createResponse = await bookingAPI.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const createResponseBody = await createResponse.json();
    expect(createResponseBody).toHaveProperty('bookingid');
    const bookingId = createResponseBody.bookingid;

    //Retrieve the newly created booking by ID
    const getResponse = await bookingAPI.getBookingById(bookingId);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    
    expect(getResponseBody.firstname).toBe(bookingData.firstname);
    expect(getResponseBody.lastname).toBe(bookingData.lastname);
    expect(getResponseBody.totalprice).toBe(bookingData.totalprice);
    expect(getResponseBody.depositpaid).toBe(bookingData.depositpaid);
});

test('Update existing booking', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    //Create booking 
    const bookingData: CreateBookingRequest = {
        firstname: 'Jack',
        lastname: 'Doe',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-10-01',
            checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
    };

    const createResponse = await bookingAPI.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    const authResponse = await bookingAPI.createAuthToken('admin', 'password123');
    expect (authResponse.status()).toBe(200); 
    const authResponseBody = await authResponse.json();
    const authToken = authResponseBody.token;
    //Update the newly created booking
    const updatedBookingData: CreateBookingRequest = {
        ...bookingData,
        firstname: 'Jackson',
        totalprice: 250,
        depositpaid: true
    };

    const updateResponse = await bookingAPI.updateBooking(bookingId, updatedBookingData, authToken);
    expect(updateResponse.status()).toBe(200);
    const updateResponseBody = await updateResponse.json();

    //Validate PUT respnse
    expect(updateResponseBody.firstname).toBe(updatedBookingData.firstname);
    expect(updateResponseBody.totalprice).toBe(updatedBookingData.totalprice);
    expect(updateResponseBody.depositpaid).toBe(updatedBookingData.depositpaid);
});

test('Delete existing booking', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    //Create booking 
    const bookingData: CreateBookingRequest = {
        firstname: 'Jack',
        lastname: 'Doe',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-10-01',
            checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
    };

    const createResponse = await bookingAPI.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    const authResponse = await bookingAPI.createAuthToken('admin', 'password123');
    expect (authResponse.status()).toBe(200); 
    const authResponseBody = await authResponse.json();
    const authToken = authResponseBody.token;

    //Delete the newly created booking
    const deleteResponse = await bookingAPI.deleteBooking(bookingId, authToken);
    expect(deleteResponse.status()).toBe(201);

    //Validate that the booking has been deleted by trying to retrieve it
    const getDeletedBookingResponse = await bookingAPI.getBookingById(bookingId);
    expect(getDeletedBookingResponse.status()).toBe(404);
});

test('Return 404 for non-existent booking', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);
    const response = await bookingAPI.getBookingById(99999); // Assuming 99999 is a non-existent booking ID
    expect(response.status()).toBe(404);
});

test('Return 403 for unauthorized update attempt', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    //Create booking 
    const bookingData: CreateBookingRequest = {
        firstname: 'Jack',
        lastname: 'Doe',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-10-01',
            checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
    };

    const createResponse = await bookingAPI.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    // Attempt to update the booking without authentication
    const updatedBookingData: CreateBookingRequest = {
        ...bookingData,
        firstname: 'Jackson',
        totalprice: 250,
        depositpaid: true
    };

    const updateResponse = await bookingAPI.updateBooking(bookingId, updatedBookingData, '');
    expect(updateResponse.status()).toBe(403);
});

test('Return 403 for unauthorized delete attempt', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    //Create booking 
    const bookingData: CreateBookingRequest = {
        firstname: 'Jack',
        lastname: 'Doe',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-10-01',
            checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
    };

    const createResponse = await bookingAPI.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    // Attempt to delete the booking without authentication
    const deleteResponse = await bookingAPI.deleteBooking(bookingId, '');
    expect(deleteResponse.status()).toBe(403);
});

test('Reject booking creation with invalid data', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    // Invalid booking data (missing required fields)
    const invalidBookingData = {
        firstname: 'Jack',
        // lastname is missing
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-10-01',
            checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
    };

    const createResponse = await bookingAPI.createBooking(invalidBookingData as CreateBookingRequest);
    expect(createResponse.status()).toBe(500);
});