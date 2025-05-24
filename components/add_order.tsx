'use client';

import { DateTime } from "@/interfaces/DateTime";
import { Order } from "@/interfaces/Order";
import { Status } from "@/interfaces/Order";
import { useOrderContext } from "@/context/order_context";
import { useResContext } from "@/context/res_context";

export default function AddOrder() {

    const { orders, setOrders } = useOrderContext();
    const { resources, setResources } = useResContext();

    const add_order = () => {
        console.log("add_order");
    }

    return (
        <div className="add_order" onClick={add_order}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
    );
}