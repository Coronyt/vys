# vys
React app for production scheduling and visualization.

- Create production orders, assign resources, and establish production timelines
- Manage your created orders via a table view with fully editible cells and filters for order status
- Dashboard provides an overview of all production orders and a visual breakdown of important metrics

## Technical details
- Created orders are currently stored in React Context

    - OrderContext holds the complete list of user-created orders
    - ResContext holds the (currently pre-defined) list of production resources
    - Client components can hook into these contexts for access to orders and resources

- Order data is stored in objects conforming to the `Order` interface

    - `Order` objects consist of:

        - Short name for the order
        - Description (currently disabled)
        - Assigned resource (defined by the `Resource` interface)
        - Start date/time (defined by the `DateTime` interface)
        - End date/time (defined by the `DateTime` interface)
        - Status (defined by the `Status` enum)

- Orders are created by the user at `/create`
- All orders can be viewed and edited at `/inspect`

## Testing approach
- `vys` is unit-tested with Playwright

    - Testing scenarios include:

        - Basic order creation w/ valid data
        - Order creation with invalid start/end dates
        - Attempting order creation with chronologically impossible dates
        - Creating an order with the same start/end date but impossible start/end times
        - Creating a default order w/ no data and adding data afterwards via the Table
        - Creating many orders and filtering the Table by status
        - Creating many orders and verifying Dashboard data

- Test files are located in the `tests` directory
- To run the unit tests yourself:

    - You must have a local instance of `vys` running at port 3000
    - Type `npx playwright test --project=chromium` into the command line
    - This will run all of the unit tests in the background and host a local HTML report with the results
    - You can also run `npx playwright test --project=chromium --headed` to see each test run in the browser

## Known issues
- Playwright tests which interact with the table do not pass on Webkit-based browsers

    - The reason for this is currently not clear, further testing required

- Order description input currently disabled on order creation form

## Planned features
- Resizable table columns
- Filter table by search
- Table pagination
- Database integration
- User-defined resources
