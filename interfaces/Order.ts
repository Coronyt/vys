import { DateTime } from "./DateTime"
import { Resource } from "./Resource"

export interface Order {
    name: string,
    desc: string,
    res: Resource,
    start: DateTime,
    end: DateTime
}