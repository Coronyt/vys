import { DateTime, build_date, build_time } from "./DateTime"

import { z } from "zod";

const zdate = z.string().date();
const ztime = z.string().time();

export const update_status_all = () => {
    // orders.forEach((order) => {
    //     console.log("updating status of ", order);
    //     update_status(order);
    //     console.log("new status of ", order);
    // });
}

export const update_status = (order: Order): Status => {
    const curr_date = new Date();
    // console.log("order passed: ", order);
    try {
        // console.log(build_date(order.start));
        zdate.parse(build_date(order.start));
        ztime.parse(build_time(order.start));
        zdate.parse(build_date(order.end));
        ztime.parse(build_time(order.end));
        // order.status = Status.SCHEDULED;
        const start_date = new Date(build_date(order.start) + " " + build_time(order.start));
        const end_date = new Date(build_date(order.end) + " " + build_time(order.end));
        // console.log(start_date);
        // console.log(end_date);
        if (curr_date >= start_date) {
            if (curr_date < end_date) {
                // order.status = Status.ACTIVE;
                return Status.ACTIVE;
            } else {
                // order.status = Status.COMPLETED;
                return Status.COMPLETED;
            }
        } else {
            // order.status = Status.SCHEDULED;
            return Status.SCHEDULED;
        }
    } catch (error) {
        // order.status = Status.PENDING;
        // console.log(error);
        return Status.PENDING;
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