import { DateTime, build_date, build_time } from "./DateTime"

export const update_status_all = (orders: Order[]) => {
    orders.forEach((order) => {update_status(order)});
}

export const update_status = (order: Order) => {
    // console.log(new Date());
    // console.log(new Date("2025-01-01 13:00"));
    const curr_dt = new Date();
    // console.log(build_date(order.start));
    // console.log(build_time(order.start));
}

export enum Status {
    PENDING,
    SCHEDULED,
    ACTIVE,
    COMPLETED
}

export interface Order {
    name: string,
    desc: string,
    res: string,
    start: DateTime,
    end: DateTime,
    status: Status
}