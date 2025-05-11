import { expect, test } from '@playwright/test';

// Creating many orders and filtering the table by status
test('filter_table', async ({ page }) => {
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
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the first Scheduled order
    await page.getByTestId("name_input").fill("Scheduled order 1");
    await page.getByTestId("start_date_input").fill("2028-11-11");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("end_date_input").fill("2029-11-11");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Scheduled order
    await page.getByTestId("name_input").fill("Scheduled order 2");
    await page.getByTestId("start_date_input").fill("2026-06-01");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("end_date_input").fill("2026-06-02");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the first Active order
    await page.getByTestId("name_input").fill("Active order 1");
    await page.getByTestId("start_date_input").fill("2025-04-30");
    await page.getByTestId("start_time_input").fill("08:00");
    await page.getByTestId("end_date_input").fill("2025-05-31");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Active order
    await page.getByTestId("name_input").fill("Active order 2");
    await page.getByTestId("start_date_input").fill("2024-01-01");
    await page.getByTestId("start_time_input").fill("08:00");
    await page.getByTestId("end_date_input").fill("2027-01-01");
    await page.getByTestId("end_time_input").fill("10:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the first Completed order
    await page.getByTestId("name_input").fill("Completed order 1");
    await page.getByTestId("start_date_input").fill("2024-01-01");
    await page.getByTestId("start_time_input").fill("08:00");
    await page.getByTestId("end_date_input").fill("2025-01-01");
    await page.getByTestId("end_time_input").fill("10:00");
    await page.getByTestId("submit").click();
    await page.getByTestId("create_btn").click();
    // Create the second Completed order
    await page.getByTestId("name_input").fill("Completed order 2");
    await page.getByTestId("start_date_input").fill("2025-04-01");
    await page.getByTestId("start_time_input").fill("12:00");
    await page.getByTestId("end_date_input").fill("2025-05-01");
    await page.getByTestId("end_time_input").fill("12:00");
    await page.getByTestId("submit").click();
    // Submission redirects to order inspector
    await expect(page.getByTestId("page_title")).toHaveText(/View all orders/);
    // Verify all orders exist with correct status
    await expect(page.getByTestId("status_cell_0")).toHaveText(/Pending/);
    await expect(page.getByTestId("status_cell_1")).toHaveText(/Pending/);
    await expect(page.getByTestId("status_cell_2")).toHaveText(/Scheduled/);
    await expect(page.getByTestId("status_cell_3")).toHaveText(/Scheduled/);
    await expect(page.getByTestId("status_cell_4")).toHaveText(/Active/);
    await expect(page.getByTestId("status_cell_5")).toHaveText(/Active/);
    await expect(page.getByTestId("status_cell_6")).toHaveText(/Completed/);
    await expect(page.getByTestId("status_cell_7")).toHaveText(/Completed/);
    // Filter table by "Pending" status
    await page.getByTestId("filter_switch").click();
    // Verify all visible table entries are of status "Pending"
    await expect(page.getByTestId("status_cell_0")).toBeVisible();
    await expect(page.getByTestId("status_cell_1")).toBeVisible();
    await expect(page.getByTestId("status_cell_2")).toBeHidden();
    await expect(page.getByTestId("status_cell_3")).toBeHidden();
    await expect(page.getByTestId("status_cell_4")).toBeHidden();
    await expect(page.getByTestId("status_cell_5")).toBeHidden();
    await expect(page.getByTestId("status_cell_6")).toBeHidden();
    await expect(page.getByTestId("status_cell_7")).toBeHidden();
    // Filter table by "Scheduled" status
    await page.getByTestId("filter_switch").click();
    // Verify all visible table entries are of status "Scheduled"
    await expect(page.getByTestId("status_cell_0")).toBeHidden();
    await expect(page.getByTestId("status_cell_1")).toBeHidden();
    await expect(page.getByTestId("status_cell_2")).toBeVisible();
    await expect(page.getByTestId("status_cell_3")).toBeVisible();
    await expect(page.getByTestId("status_cell_4")).toBeHidden();
    await expect(page.getByTestId("status_cell_5")).toBeHidden();
    await expect(page.getByTestId("status_cell_6")).toBeHidden();
    await expect(page.getByTestId("status_cell_7")).toBeHidden();
    // Filter table by "Active" status
    await page.getByTestId("filter_switch").click();
    // Verify all visible table entries are of status "Active"
    await expect(page.getByTestId("status_cell_0")).toBeHidden();
    await expect(page.getByTestId("status_cell_1")).toBeHidden();
    await expect(page.getByTestId("status_cell_2")).toBeHidden();
    await expect(page.getByTestId("status_cell_3")).toBeHidden();
    await expect(page.getByTestId("status_cell_4")).toBeVisible();
    await expect(page.getByTestId("status_cell_5")).toBeVisible();
    await expect(page.getByTestId("status_cell_6")).toBeHidden();
    await expect(page.getByTestId("status_cell_7")).toBeHidden();
    // Filter table by "Completed" status
    await page.getByTestId("filter_switch").click();
    // Verify all visible table entries are of status "Completed"
    await expect(page.getByTestId("status_cell_0")).toBeHidden();
    await expect(page.getByTestId("status_cell_1")).toBeHidden();
    await expect(page.getByTestId("status_cell_2")).toBeHidden();
    await expect(page.getByTestId("status_cell_3")).toBeHidden();
    await expect(page.getByTestId("status_cell_4")).toBeHidden();
    await expect(page.getByTestId("status_cell_5")).toBeHidden();
    await expect(page.getByTestId("status_cell_6")).toBeVisible();
    await expect(page.getByTestId("status_cell_7")).toBeVisible();
    // No filter applied to table
    await page.getByTestId("filter_switch").click();
    // Verify all orders are visible again
    await expect(page.getByTestId("status_cell_0")).toBeVisible();
    await expect(page.getByTestId("status_cell_1")).toBeVisible();
    await expect(page.getByTestId("status_cell_2")).toBeVisible();
    await expect(page.getByTestId("status_cell_3")).toBeVisible();
    await expect(page.getByTestId("status_cell_4")).toBeVisible();
    await expect(page.getByTestId("status_cell_5")).toBeVisible();
    await expect(page.getByTestId("status_cell_6")).toBeVisible();
    await expect(page.getByTestId("status_cell_7")).toBeVisible();
});