'use client';

import { Status, update_status } from "@/interfaces/Order";
import { getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import FilterSwitch from "./filter_switch";
import { Order } from "@/interfaces/Order";
import TableEntries from "./table_entries";
import TableHeader from "./table_header";
import { useOrderContext } from "@/context/order_context";

export default function Table() {

  const [error, setError] = useState("");

  const [columnFilters, setColumnFilters] = useState([
    {
      id: "status",
      value: ""
    }
  ]);

  const cycle_filter = (): string => {
    if (columnFilters[0].value == "") {
      setColumnFilters([{ id: "status", value: "0" }]);
      return "Pending orders";
    }
    if (columnFilters[0].value == "0") {
      setColumnFilters([{ id: "status", value: "1" }]);
      return "Scheduled orders";
    }
    if (columnFilters[0].value == "1") {
      setColumnFilters([{ id: "status", value: "2" }]);
      return "Active orders";
    }
    if (columnFilters[0].value == "2") {
      setColumnFilters([{ id: "status", value: "3" }]);
      return "Completed orders";
    }
    if (columnFilters[0].value == "3") {
      setColumnFilters([{ id: "status", value: "" }]);
      return "No filter applied";
    }
    return "";
  }

  const columns = [
    {
        accessorKey: 'name',
        header: 'Order'
    },
    // {
    //   accessorKey: 'desc',
    //   header: 'Description'
    // },
    {
      accessorKey: 'res',
      header: 'Resource'
    },
    {
      accessorKey: 'start',
      header: 'Starting'
    },
    {
      accessorKey: 'end',
      header: 'Ending'
    },
    {
      accessorKey: 'status',
      header: 'Status',
      accessorFn: (row: any) => {
        return `${row.status}`;
      }
    }
  ]

  const { orders, setOrders } = useOrderContext();
  
  useEffect(() => {
    let statuses: Status[] = [];
    orders.forEach((order) => {
      statuses.push(update_status(order));
    });
    let i: number = 0;
    let updated: Order[] = Array.from(orders);
    updated.forEach((u_order) => {
      u_order.status = statuses[i];
      i++;
    });
    setOrders(updated);
  }, []);

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      columnFilters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      // TODO - Add comments to this code
      update: (row_index: number, column_id: string, value: any) => {
        setOrders(
          prev => prev.map(
            (row, index) =>
              index === row_index ? {
                ...prev[row_index],
                [column_id]: value
              }: row
          )
        );
      }
    }
  });

  return (
    <div>
      <h2 className="page_title" data-testid="page_title">View all orders</h2>
      <div className="flex justify-between">
        {!error &&
          <div className="error text-xl pt-0.5">
            Test error message
          </div>
        }
        <FilterSwitch cycle={cycle_filter} />
      </div>
      <TableHeader table={table}></TableHeader>
      <TableEntries table={table} setError={setError}></TableEntries>
    </div>
  );
}