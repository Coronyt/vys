'use client'; // FOR TESTING PURPOSES ONLY

import { useEffect } from "react";
import { useOrderContext } from "@/context/order_context";

export default function Inspect() {

  const { orders, setOrders } = useOrderContext();

  useEffect(() => {
    const test_date = {
      month: 11,
      day: 11,
      year: 1918,
      hour: 11,
      minute: 0
    }
    const order1 = {
      name: "Test order 1",
      desc: "Test description",
      res: {name: "res1", id: "2814", in_use: false},
      start: test_date,
      end: test_date
    }
    const order2 = {
      name: "Test order 2",
      desc: "Test description",
      res: {name: "res2", id: "2814", in_use: false},
      start: test_date,
      end: test_date
    }
    const order3 = {
      name: "Test order 3",
      desc: "Test description",
      res: {name: "res3", id: "2814", in_use: false},
      start: test_date,
      end: test_date
    }
    // setOrders([order1, order2, order3]);
  }, []);

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
    </div>
  );
}