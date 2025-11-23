# vys
React app for production scheduling and visualization

- Create production orders, assign resources, and establish production timelines
- Manage your created orders via a table view with fully editible cells and filters for order status
- Dashboard provides an overview of all production orders and a visual breakdown of important metrics

## Build `vys`
### Prerequisites
- Make sure you have the latest LTS (v22) version of [Node.js](https://nodejs.org/en/download)
- You will also need [Playwright](https://playwright.dev/docs/intro) if you want to run tests yourself

### Installation steps
- Download the contents of the `vys` repo into a local directory
- Open the directory in PowerShell or a terminal app of your choice
- Run `npm i` to install all dependencies
- Run `npm run build` to build `vys`
- Run `npm start` to serve the app

## Implementation
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
