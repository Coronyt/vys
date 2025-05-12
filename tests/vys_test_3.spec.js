import { expect, test } from '@playwright/test';

// Creating many orders and verifying Dashboard data display
test('dash_display_1', async ({ page }) => {
    // Navigate to website
    await page.goto('http://localhost:3000/');
    // Click on "create order" icon
    await page.getByTestId("create_btn").click();
    // Check title, verify correct page
    await expect(page.getByTestId("page_title")).toHaveText(/Create a new order/);
    // Create the first Pending order
    await page.getByTestId("name_input").fill("Pending order 1");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Pending order
    await page.getByTestId("name_input").fill("Pending order 2");
    await page.getByTestId("start_date_input").fill("2025-08-01");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the first Scheduled order
    await page.getByTestId("name_input").fill("Scheduled order 1");
    await page.getByTestId("res_input").selectOption("Nakamichi Dragon 1");
    await page.getByTestId("start_date_input").fill("2026-11-11");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("end_date_input").fill("2027-11-11");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Scheduled order
    await page.getByTestId("name_input").fill("Scheduled order 2");
    await page.getByTestId("res_input").selectOption("Nakamichi Dragon 1");
    await page.getByTestId("start_date_input").fill("2025-07-01");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("end_date_input").fill("2025-07-02");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the first Active order
    await page.getByTestId("name_input").fill("Active order 1");
    await page.getByTestId("res_input").selectOption("Onkyo TA-RW505 1");
    await page.getByTestId("start_date_input").fill("2025-04-30");
    await page.getByTestId("start_time_input").fill("08:00");
    await page.getByTestId("end_date_input").fill("2025-05-31");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Active order
    await page.getByTestId("name_input").fill("Active order 2");
    await page.getByTestId("res_input").selectOption("Nakamichi Dragon 1");
    await page.getByTestId("start_date_input").fill("2024-01-01");
    await page.getByTestId("start_time_input").fill("08:00");
    await page.getByTestId("end_date_input").fill("2027-01-01");
    await page.getByTestId("end_time_input").fill("10:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the first Completed order
    await page.getByTestId("name_input").fill("Completed order 1");
    await page.getByTestId("res_input").selectOption("Pheenix Alpha AD12 1");
    await page.getByTestId("start_date_input").fill("2025-01-01");
    await page.getByTestId("start_time_input").fill("08:00");
    await page.getByTestId("end_date_input").fill("2025-01-04");
    await page.getByTestId("end_time_input").fill("10:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Completed order
    await page.getByTestId("name_input").fill("Completed order 2");
    await page.getByTestId("res_input").selectOption("Pheenix Alpha AD12 1");
    await page.getByTestId("start_date_input").fill("2025-04-01");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("end_date_input").fill("2025-05-01");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    // Verify all orders exist with correct status
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Pending/);
    await expect(page.getByTestId("status_cell_1")).toHaveText(/Pending/);
    await expect(page.getByTestId("status_cell_2")).toHaveText(/Scheduled/);
    await expect(page.getByTestId("status_cell_3")).toHaveText(/Scheduled/);
    await expect(page.getByTestId("status_cell_4")).toHaveText(/Active/);
    await expect(page.getByTestId("status_cell_5")).toHaveText(/Active/);
    await expect(page.getByTestId("status_cell_6")).toHaveText(/Completed/);
    await expect(page.getByTestId("status_cell_7")).toHaveText(/Completed/);
    // Navigate to Dashboard
    await page.getByTestId("dash_btn").click();
    await expect(page.getByTestId("page_title")).toHaveText(/Dashboard/);
    // Verify number of orders
    await expect(page.getByText("Currently tracking 8 lifetime orders")).toBeVisible();
    // Verify number of active orders
    await expect(page.getByText("There are currently 2 active orders")).toBeVisible();
    // Verify resource usage percentage
    await expect(page.getByText("using 40% of available resources")).toBeVisible();
    // Hover over red area of order overview pie chart
    await page.getByTestId("oo_piecell_0").hover();
    // Verify contents of tooltip
    await expect(page.getByText("Pending : 2")).toBeVisible();
    // Hover over blue area of order overview pie chart
    await page.getByTestId("oo_piecell_1").hover();
    // Verify contents of tooltip
    await expect(page.getByText("Scheduled : 2")).toBeVisible();
    // Hover over green area of order overview pie chart
    await page.getByTestId("oo_piecell_2").hover();
    // Verify contents of tooltip
    await expect(page.getByText("Active : 2")).toBeVisible();
    // Verify each section of resource pie chart
    await page.getByTestId("ru_piecell_0").hover();
    await expect(page.getByText("Pheenix Alpha AD12 1 : 4")).toBeVisible();
    await page.getByTestId("ru_piecell_2").hover();
    await expect(page.getByText("Nakamichi Dragon 1 : 3")).toBeVisible();
    await page.getByTestId("ru_piecell_3").hover();
    await expect(page.getByText("Onkyo TA-RW505 1 : 1")).toBeVisible();
    // Checking orders for the month of July 2025
    await page.getByTestId("bar_pending").hover();
    await expect(page.getByText("Pending : 1")).toBeVisible();
    await expect(page.getByText("Scheduled : 0")).toBeVisible();
    await expect(page.getByText("Active : 0")).toBeVisible();
    await expect(page.getByText("Completed : 0")).toBeVisible();
    // Checking orders for the month of June 2025
    await page.getByTestId("bar_scheduled").hover();
    await expect(page.getByText("Pending : 0")).toBeVisible();
    await expect(page.getByText("Scheduled : 1")).toBeVisible();
    await expect(page.getByText("Active : 0")).toBeVisible();
    await expect(page.getByText("Completed : 0")).toBeVisible();
    // Checking orders for the month of April 2025
    await page.getByTestId("bar_active").hover();
    await expect(page.getByText("Pending : 0")).toBeVisible();
    await expect(page.getByText("Scheduled : 0")).toBeVisible();
    await expect(page.getByText("Active : 1")).toBeVisible();
    await expect(page.getByText("Completed : 0")).toBeVisible();
    // Checking orders for the month of March 2025
    await page.getByTestId("bar_completed").hover();
    await expect(page.getByText("Pending : 0")).toBeVisible();
    await expect(page.getByText("Scheduled : 0")).toBeVisible();
    await expect(page.getByText("Active : 0")).toBeVisible();
    await expect(page.getByText("Completed : 1")).toBeVisible();
});