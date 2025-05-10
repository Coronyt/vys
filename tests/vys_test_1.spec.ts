import { expect, test } from '@playwright/test';

// Basic order creation w/ valid data
test('order_create_1', async ({ page }) => {
    // Navigate to website
    await page.goto('http://localhost:3000/');
    // Click on "create order" icon
    await page.getByTestId("create_btn").click();
    // Check title, verify correct page
    await expect(page.getByTestId("page_title")).toHaveText(/Create a new order/);
    // Fill in form inputs with valid data
    await page.getByTestId("name_input").fill("This is a test order");
    await page.getByTestId("res_input").selectOption("Nakamichi Dragon 1");
    await page.getByTestId("start_date_input").fill("2028-11-11");
    await page.getByTestId("start_time_input").fill("11:00");
    await page.getByTestId("submit").click();
    // Submission redirects to order inspector
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    // Verify there is a new table entry
    await expect(page.getByTestId("name_cell_0")).toHaveValue(/This is a test order/);
    await expect(page.getByTestId("res_cell_0")).toHaveValue(/deck1/); // Nakamichi Dragon 1
    await expect(page.getByTestId("start_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("start_time_cell_0")).toHaveValue(/11:00 AM/);
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Pending/);
});

// Order creation with invalid start/end date/times
test('order_create_2', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Attempt to create order with invalid start date
        // TODO
    // Verify error message
        // TODO
    // Attempt to create order with invalid start time
        // TODO
    // Verify error message
        // TODO
    // Attempt to create order with invalid end date
        // TODO
    // Verify error message
        // TODO
    // Attempt to create order with invalid end time
        // TODO
    // Verify error message
        // TODO
    // Passing valid data
        // TODO
    // Redirect to inspector
        // TODO
    // Verify new entry exists in table
        // TODO
});

// Attempting order creation with chronologically impossible dates
test('order_create_3', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Fill in with valid start date and time
        // TODO
    // Fill in with impossible end date (before start)
        // TODO
    // Attempt to submit form with invalid dates
        // TODO
    // Verify error message
        // TODO
    // Fill in valid end date
        // TODO
    // Change to impossible start date (before end)
        // TODO
    // Attempt to submit form with invalid dates
        // TODO
    // Verify error message
        // TODO
});


// Creating a default order w/ no data and adding data afterwards via the Table
test('order_create_4', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Create a new order with no information
        // TODO
    // Redirect to order inspector
        // TODO
    // Verify a new entry exists
        // TODO
    // Verify status "Pending"
        // TODO
    // Fill in table entry with valid data
        // TODO
    // Change name to "This is a test order"
        // TODO
    // Change resource to Nakamichi Dragon
        // TODO
    // Add valid start date/time
        // TODO
    // Add valid end date/time
        // TODO
    // Verify status "Scheduled"
        // TODO
    // Navigate to Dashboard
        // TODO
    // Navigate back to Table
        // TODO
    // Verify all changes were saved
        // TODO
});

// Creating a default order and passing invalid or impossible start/end date/times via the Table
test('order_create_5', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Create a new order with no information
        // TODO
    // Redirect to order inspector
        // TODO
    // Verify a new entry exists
        // TODO
    // Verify status "Pending"
        // TODO
    // Attempt to add invalid start date
        // TODO
    // Verify error message
        // TODO
    // Attempt to add invalid start time
        // TODO
    // Verify error message
        // TODO
    // Attempt to add invalid end date
        // TODO
    // Verify error message
        // TODO
    // Attempt to add invalid end time
        // TODO
    // Verify error message
        // TODO
    // Add valid start date/time
        // TODO
    // Attempt to add impossible end date/time (before start)
        // TODO
    // Verify error message
        // TODO
    // Add valid end date/time
        // TODO
    // Attempt to change start date/time to impossible (after end)
        // TODO
    // Verify error message
        // TODO
    // Verify status "Scheduled"
        // TODO
});