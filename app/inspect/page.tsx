'use client'; // FOR TESTING PURPOSES ONLY

import Table from "@/components/order_table";
import { useOrderContext } from "@/context/order_context";

export default function Inspect() {

  const { orders, setOrders } = useOrderContext();

  return (
    <div className="page">
      {/* TODO - Implement TanStack Table component for Orders */}
      <h2>Inspect all orders</h2> <br /> <hr /> <br />
      {/* FOR TESTING PURPOSES ONLY */}
      {orders.map((element, index) => 
        <p key={index}>
          {element.name} <br />
          {element.desc} <br />
          {element.res.name} <br />
          {element.start.month + "-" + element.start.day + "-" + element.start.year} <br />
          {element.end.month + "-" + element.end.day + "-" + element.end.year} <br /> <br />
        </p>
      )}
      <Table></Table>
    </div>
  );
}