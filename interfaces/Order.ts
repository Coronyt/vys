import { DateTime } from "./DateTime"

export interface Order {
    name: string,
    desc: string,
    res: string,
    start: DateTime,
    end: DateTime
}