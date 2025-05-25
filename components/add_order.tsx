'use client';

import { DateTime } from "@/interfaces/DateTime";
import { Order } from "@/interfaces/Order";
import { Status } from "@/interfaces/Order";
import { useOrderContext } from "@/context/order_context";
import { useResContext } from "@/context/res_context";

export default function AddOrder(props: any) {

    const { orders, setOrders } = useOrderContext();
    const { resources, setResources } = useResContext();

    const add_order = () => {
        // ___
        const start_date_time: DateTime = {
            month: NaN,
            day: NaN,
            year: 0,
            hour: 0,
            minute: NaN
        }
        const end_date_time: DateTime = {
            month: NaN,
            day: NaN,
            year: 0,
            hour: 0,
            minute: NaN
        }
        const new_order: Order = {
            name: "New order",
            desc: "New order description",
            res: resources[0].id,
            start: start_date_time,
            end: end_date_time,
            status: Status.PENDING
        }
        // Get current orders
        const curr = Array.from(orders);
        // Append to array
        curr.push(new_order);
        // Hand to context
        setOrders(curr);
    }

    return (
        <div className="add_order" onClick={add_order}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
    );
}