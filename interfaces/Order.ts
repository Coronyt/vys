import { DateTime, build_date, build_time } from "./DateTime"

import { z } from "zod";

const zdate = z.string().date();
const ztime = z.string().time();

export const update_status = (order: Order): Status => {
    const curr_date = new Date();
    try {
        zdate.parse(build_date(order.start));
        ztime.parse(build_time(order.start));
        zdate.parse(build_date(order.end));
        ztime.parse(build_time(order.end));
        const start_date = new Date(build_date(order.start) + " " + build_time(order.start));
        const end_date = new Date(build_date(order.end) + " " + build_time(order.end));
        if (curr_date >= start_date) {
            if (curr_date < end_date) {
                return Status.ACTIVE;
            } else {
                return Status.COMPLETED;
            }
        } else {
            return Status.SCHEDULED;
        }
    } catch (error) {
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