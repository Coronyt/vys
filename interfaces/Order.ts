import { Resource } from "./Resource"

export interface Order {
    name: string,
    desc: string,
    res: Resource,
    start: Date,
    end: Date
}