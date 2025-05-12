'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { build_date } from "@/interfaces/DateTime";
import { useOrderContext } from "@/context/order_context";

export default function YearlyOverview() {

    interface ChartData {
        name: string,
        pending: number,
        scheduled: number,
        active: number,
        completed: number
    }

    let data: ChartData[] = []

    const [chartData, setChartData] = useState(data);
    const { orders, setOrders } = useOrderContext();

    const init_data = () => {
        data = [
            {name: "Jan", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Feb", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Mar", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Apr", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "May", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Jun", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Jul", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Aug", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Sep", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Oct", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Nov", pending: 0, scheduled: 0, active: 0, completed: 0},
            {name: "Dec", pending: 0, scheduled: 0, active: 0, completed: 0}
        ]
    }

    useEffect(() => {
        init_data();
        orders.forEach((order) => {
            let start = new Date(build_date(order.start));
            let mon = start.getMonth();
            if (!Number.isNaN(mon) && (start.getFullYear() == 2025)) { // Current year hard-coded for now
                if (order.status == 0) {data[mon].pending++;}
                if (order.status == 1) {data[mon].scheduled++;}
                if (order.status == 2) {data[mon].active++;}
                if (order.status == 3) {data[mon].completed++;}
            }
        });
        setChartData(data);
    }, []);

  return (
    <div>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip formatter={(value, entry, index) => (<span className="text-black">{value}</span>)} wrapperStyle={{color: 'black'}} />
                <Bar stackId="a" dataKey="completed" fill="#0a0f23" data-testid="bar_completed" />
                <Bar stackId="a" dataKey="active" fill="#2c5404" data-testid="bar_active" />
                <Bar stackId="a" dataKey="scheduled" fill="#0e2d7d" data-testid="bar_scheduled" />
                <Bar stackId="a" dataKey="pending" fill="#730424" data-testid="bar_pending" />
            </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
            <h2 className="text-lg mt-2">Order overview (organized by start date and status)</h2>
        </div>
    </div>
  );
}