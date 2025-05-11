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
    await page.getByTestId("end_date_input").fill("2029-11-11");
    await page.getByTestId("end_time_input").fill("11:00");
    await page.getByTestId("submit").click();
    // Submission redirects to order inspector
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    // Verify there is a new table entry
    await expect(page.getByTestId("name_cell_0")).toHaveValue(/This is a test order/);
    await expect(page.getByTestId("res_cell_0")).toHaveValue(/deck1/); // Nakamichi Dragon 1
    await expect(page.getByTestId("start_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("start_time_cell_0")).toHaveValue(/11:00 AM/);
    await expect(page.getByTestId("end_date_cell_0")).toHaveValue(/11-11-2029/);
    await expect(page.getByTestId("end_time_cell_0")).toHaveValue(/11:00 AM/);
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
});

// Order creation with invalid start/end dates
test('order_create_2', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Attempt to create order with invalid start date
    await page.getByTestId("name_input").fill("order_create_2");
    await page.getByTestId("start_date_input").fill("99999-11-11");
    await page.getByTestId("start_time_input").fill("11:00");
    await page.getByTestId("end_date_input").fill("2029-11-11");
    await page.getByTestId("end_time_input").fill("11:00");
    await page.getByTestId("submit").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText(/Invalid date/);
    // Attempt to create order with invalid end date
    await page.getByTestId("start_date_input").fill("2028-11-11");
    await page.getByTestId("end_date_input").fill("12345-01-01");
    await page.getByTestId("submit").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText(/Invalid date/);
    // Passing valid data
    await page.getByTestId("end_date_input").fill("2029-11-11");
    // Redirect to inspector
    await page.getByTestId("submit").click();
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    // Verify new entry exists in table
    await expect(page.getByTestId("name_cell_0")).toHaveValue(/order_create_2/);
    await expect(page.getByTestId("res_cell_0")).toHaveValue(/press1/); // Default
    await expect(page.getByTestId("start_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("start_time_cell_0")).toHaveValue(/11:00 AM/);
    await expect(page.getByTestId("end_date_cell_0")).toHaveValue(/11-11-2029/);
    await expect(page.getByTestId("end_time_cell_0")).toHaveValue(/11:00 AM/);
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
});

// Attempting order creation with chronologically impossible dates
test('order_create_3', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Fill in with valid start date and time
    await page.getByTestId("name_input").fill("order_create_3");
    await page.getByTestId("start_date_input").fill("2028-11-11");
    await page.getByTestId("start_time_input").fill("12:00");
    // Fill in with impossible end date (before start)
    await page.getByTestId("end_date_input").fill("2027-11-11");
    await page.getByTestId("end_time_input").fill("12:00");
    // Attempt to submit form with invalid dates
    await page.getByTestId("submit").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText(/End date must be after start date/);
    // Fill in valid end date
    await page.getByTestId("end_date_input").fill("2029-11-11");
    // Submit and verify new order
    await page.getByTestId("submit").click();
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    await expect(page.getByTestId("name_cell_0")).toHaveValue(/order_create_3/);
    await expect(page.getByTestId("res_cell_0")).toHaveValue(/press1/); // Default
    await expect(page.getByTestId("start_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("start_time_cell_0")).toHaveValue(/12:00 PM/);
    await expect(page.getByTestId("end_date_cell_0")).toHaveValue(/11-11-2029/);
    await expect(page.getByTestId("end_time_cell_0")).toHaveValue(/12:00 PM/);
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
});

// Creating an order with the same start/end date but impossible start/end times
test('order_create_4', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Fill in with valid start date and time
    await page.getByTestId("name_input").fill("order_create_4");
    await page.getByTestId("start_date_input").fill("2028-11-11");
    await page.getByTestId("start_time_input").fill("12:00");
    // Fill in with impossible end date (before start)
    await page.getByTestId("end_date_input").fill("2028-11-11");
    await page.getByTestId("end_time_input").fill("11:00");
    // Attempt to submit form with invalid dates
    await page.getByTestId("submit").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText(/End time must be after start time/);
    // Fill in valid end time
    await page.getByTestId("end_time_input").fill("13:00");
    // Submit and verify new order
    await page.getByTestId("submit").click();
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    await expect(page.getByTestId("name_cell_0")).toHaveValue(/order_create_4/);
    await expect(page.getByTestId("res_cell_0")).toHaveValue(/press1/); // Default
    await expect(page.getByTestId("start_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("start_time_cell_0")).toHaveValue(/12:00 PM/);
    await expect(page.getByTestId("end_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("end_time_cell_0")).toHaveValue(/01:00 PM/);
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
});

// Creating a default order w/ no data and adding data afterwards via the Table
test('order_create_5', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Create a new order with no information
    await page.getByTestId("submit").click();
    // Redirect to order inspector
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    // Verify status "Pending"
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Pending/);
    // Fill in table entry with valid data
    await page.getByTestId("name_cell_0").clear();
    await page.getByTestId("name_cell_0").fill("Lorem ipsum dolor sit amet");
    await page.getByTestId("page_title").click(); // Clicking away to unfocus input
    // Change resource to Nakamichi Dragon
    await page.getByTestId("res_cell_0").selectOption("Nakamichi Dragon 1");
    // Add valid start date/time
    await page.getByTestId("start_date_cell_0").clear();
    await page.getByTestId("start_date_cell_0").fill("11-11-2028");
    await page.getByTestId("start_time_cell_0").clear();
    await page.getByTestId("start_time_cell_0").fill("12:00 AM");
    // Add valid end date/time
    await page.getByTestId("end_date_cell_0").clear();
    await page.getByTestId("end_date_cell_0").fill("12-01-2028");
    await page.getByTestId("end_time_cell_0").clear();
    await page.getByTestId("end_time_cell_0").fill("5:00 PM");
    // Verify status "Scheduled"
    await page.getByTestId("page_title").click(); // Clicking away to unfocus input
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
    // Verify all changes were saved
    await page.getByTestId("dash_btn").click();
    await page.getByTestId("inspect_btn").click();
    await expect(page.getByTestId("name_cell_0")).toHaveValue(/Lorem ipsum dolor sit amet/);
    await expect(page.getByTestId("res_cell_0")).toHaveValue(/deck1/);
    await expect(page.getByTestId("start_date_cell_0")).toHaveValue(/11-11-2028/);
    await expect(page.getByTestId("start_time_cell_0")).toHaveValue(/12:00 AM/);
    await expect(page.getByTestId("end_date_cell_0")).toHaveValue(/12-01-2028/);
    await expect(page.getByTestId("end_time_cell_0")).toHaveValue(/05:00 PM/);
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
});

// Creating a default order and passing invalid or impossible start/end date/times via the Table
test('order_create_6', async ({ page }) => {
    // Navigate to order creation
    await page.goto('http://localhost:3000/create');
    // Create a new order with no information
    await page.getByTestId("submit").click();
    // Redirect to order inspector
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    // Verify status "Pending"
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Pending/);
    // Attempt to add invalid start date
    await page.getByTestId("start_date_cell_0").clear();
    await page.getByTestId("start_date_cell_0").fill("asdfasdfasdf");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("Date must be formatted as MM-DD-YYYY");
    // Attempt to add invalid start time
    await page.getByTestId("start_time_cell_0").clear();
    await page.getByTestId("start_time_cell_0").fill("wigwam");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("Time must be formatted as HH:MM AM/PM");
    // Attempt to add invalid end date
    await page.getByTestId("end_date_cell_0").clear();
    await page.getByTestId("end_date_cell_0").fill("asdfasdfasdf");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("Date must be formatted as MM-DD-YYYY");
    // Attempt to add invalid end time
    await page.getByTestId("end_time_cell_0").clear();
    await page.getByTestId("end_time_cell_0").fill("wigwam");
    await page.getByTestId("page_title").click();
    // Verify error message
     await expect(page.getByTestId("error_msg")).toHaveText("Time must be formatted as HH:MM AM/PM");
    // Add valid start date/time
    await page.getByTestId("start_date_cell_0").clear();
    await page.getByTestId("start_date_cell_0").fill("11-11-2028");
    await page.getByTestId("start_time_cell_0").clear();
    await page.getByTestId("start_time_cell_0").fill("12:00 PM");
    await page.getByTestId("page_title").click();
    // Attempt to add impossible end date/time (before start)
    await page.getByTestId("end_date_cell_0").clear();
    await page.getByTestId("end_date_cell_0").fill("11-10-2028");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("End date must be after start date");
    // Add valid end date/time
    await page.getByTestId("end_date_cell_0").clear();
    await page.getByTestId("end_date_cell_0").fill("11-12-2028");
    await page.getByTestId("end_time_cell_0").clear();
    await page.getByTestId("end_time_cell_0").fill("1:00 PM");
    await page.getByTestId("page_title").click();
    // Verify status "Scheduled"
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Scheduled/);
    // Attempt to change start date/time to impossible (after end)
    await page.getByTestId("start_date_cell_0").clear();
    await page.getByTestId("start_date_cell_0").fill("11-13-2028");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("Start date must be before end date");
    // Set start date and end date to same day
    await page.getByTestId("start_date_cell_0").clear();
    await page.getByTestId("start_date_cell_0").fill("11-12-2028");
    await page.getByTestId("page_title").click();
    // Attempt to set start time as after end time on same day
    await page.getByTestId("start_time_cell_0").clear();
    await page.getByTestId("start_time_cell_0").fill("2:00 PM");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("Start time must be before end time");
    // Attempt to set end time as before start time on same day
    await page.getByTestId("end_time_cell_0").clear();
    await page.getByTestId("end_time_cell_0").fill("11:00 AM");
    await page.getByTestId("page_title").click();
    // Verify error message
    await expect(page.getByTestId("error_msg")).toHaveText("End time must be after start time");
});