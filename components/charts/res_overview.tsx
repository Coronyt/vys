'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

import { useOrderContext } from "@/context/order_context";
import { useResContext } from "@/context/res_context";

export default function ResourceOverview() {

    interface ChartData {
        name: string,
        id: string,
        value: number,
    }

    let data: ChartData[] = []

    const [chartData, setChartData] = useState(data);
    
    const { orders, setOrders } = useOrderContext();
    const { resources, setResources } = useResContext();

    useEffect(() => {
        data = []; // Reset staging array
        resources.forEach((res) => {
            data.push({
                name: res.name,
                id: res.id,
                value: 0
            });
        });
        orders.forEach((order) => {
            for (let i = 0; i < data.length; i++) {
                if (order.res == data[i].id) {
                    data[i].value++;
                }
            }
        });
        setChartData(data);
      }, []);
    
    const colors = [
      "#142952",
      "#1f3d7a",
      "#2952a3",
      "#3366cc",
      "#5c85d6"
    ]

    return (
      <div>
        <ResponsiveContainer width={400} height={250}>
          <PieChart width={400} height={250}>
            <Tooltip />
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[`${index % colors.length}`]} />))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
            <h2 className="text-lg -mt-2 mb-4">Resource usage across lifetime orders</h2>
        </div>
      </div>
    );
  }