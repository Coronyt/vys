'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

import { useOrderContext } from "@/context/order_context";

export default function OrderOverview() {

    interface ChartData {
        name: string,
        value: number
    }

    let data: ChartData[] = []

    const colors = [
      "#730424",
      "#0e2d7d",
      "#2c5404"
    ]

    const [chartData, setChartData] = useState(data);
    const { orders, setOrders } = useOrderContext();

    const init_data = () => {
      data = [
        {
          name: "Pending",
          value: 0
        },
        {
          name: "Scheduled",
          value: 0
        },
        {
          name: "Active",
          value: 0
        }
      ]
    }

    useEffect(() => {
      init_data();
      orders.forEach((order) => {
        if (order.status == 0) {data[0].value++}
        if (order.status == 1) {data[1].value++}
        if (order.status == 2) {data[2].value++}
      });
      setChartData(data);
    }, []);

    return (
      <div>
        <ResponsiveContainer width={400} height={250}>
          <PieChart width={400} height={250}>
            <Tooltip />
            {/* <Legend formatter={(value, entry, index) => (<span className="text-white">{value}</span>)} /> */}
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index]} />))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
            <h2 className="text-lg -mt-2 mb-4">Non-completed orders by status</h2>
        </div>
      </div>
    );
  }