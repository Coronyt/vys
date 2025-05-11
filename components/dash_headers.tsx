'use client';

import { useOrderContext } from "@/context/order_context";
import { useResContext } from "@/context/res_context";

export default function DashHeaders() {

  const { orders, setOrders } = useOrderContext();
  const { resources, setResources } = useResContext();

  const get_lifetime = (): number => {
    let i: number = 0;
    orders.forEach(() => {i++});
    return i;
  }

  const get_active = (): number => {
    let i: number = 0;
    orders.forEach((order) => {
        if (order.status == 2) {i++}
    });
    return i;
  }

  const get_res_perc = (): number => {
    let active: string[] = [];
    orders.forEach((order) => {
        if (order.status == 2) {
            if (!active.includes(order.res)) {
                active.push(order.res);
            }
        }
    });
    return (active.length / resources.length) * 100;
  }

  return (
    <div className="pb-4">
      <h2 className="text-xl">Currently tracking {get_lifetime()} lifetime order{(get_lifetime() > 1) || (get_lifetime() == 0) ? "s" : ""}</h2>
      <h2 className="text-xl">There {(get_active() > 1) || (get_active() == 0) ? "are" : "is"} currently {get_active()} active order{(get_active() > 1) || (get_active() == 0) ? "s" : ""} using {get_res_perc()}% of available resources</h2>
    </div>
  );
}