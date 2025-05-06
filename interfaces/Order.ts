import { DateTime, build_date, build_time } from "./DateTime"

import { z } from "zod";

const zdate = z.string().date();
const ztime = z.string().time();

export const update_status_all = (orders: Order[]) => {
    orders.forEach((order) => {update_status(order)});
}

export const update_status = (order: Order) => {
    const curr_date = new Date();
    try {
        zdate.parse(build_date(order.start));
        ztime.parse(build_time(order.start));
        zdate.parse(build_date(order.end));
        ztime.parse(build_time(order.end));
        order.status = Status.SCHEDULED;
        const start_date = new Date(build_date(order.start) + " " + build_time(order.start));
        const end_date = new Date(build_date(order.end) + " " + build_time(order.end));
        if (curr_date > start_date) {
            if (curr_date < end_date) {
                order.status = Status.ACTIVE;
            } else {
                order.status = Status.COMPLETED;
            }
        }
    } catch (error) {
        order.status = Status.PENDING;
    }
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