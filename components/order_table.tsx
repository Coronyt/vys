'use client';

import { Status, update_status } from "@/interfaces/Order";
import { getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import FilterSearch from "./filter_search";
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
      setColumnFilters([{ id: "status", value: "0" }].concat(columnFilters.length == 2 ? [columnFilters[1]] : []));
      return "Displaying pending orders";
    }
    if (columnFilters[0].value == "0") {
      setColumnFilters([{ id: "status", value: "1" }].concat(columnFilters.length == 2 ? [columnFilters[1]] : []));
      return "Displaying scheduled orders";
    }
    if (columnFilters[0].value == "1") {
      setColumnFilters([{ id: "status", value: "2" }].concat(columnFilters.length == 2 ? [columnFilters[1]] : []));
      return "Displaying active orders";
    }
    if (columnFilters[0].value == "2") {
      setColumnFilters([{ id: "status", value: "3" }].concat(columnFilters.length == 2 ? [columnFilters[1]] : []));
      return "Displaying completed orders";
    }
    if (columnFilters[0].value == "3") {
      setColumnFilters([{ id: "status", value: "" }].concat(columnFilters.length == 2 ? [columnFilters[1]] : []));
      return "No status filter applied";
    }
    return "";
  }

  const apply_text_filter = (text_filter: string) => {
    // If we are removing the text filter
    if (text_filter == "") {
      if (columnFilters.length == 2) {
        // Remove the filter object from the array
        setColumnFilters([columnFilters[0]]);
      }
    }
    // If there is already a text filter applied
    if (columnFilters.length == 2) {
      // Replace the old text filter with the new text filter
      setColumnFilters([columnFilters[0]].concat([{ id: "name", value: text_filter }]));
    }
    // If there is no text filter applied yet
    else if (columnFilters.length == 1) {
      // Append the incoming text filter
      setColumnFilters(columnFilters.concat([{ id: "name", value: text_filter }]));
    }
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
      // Cell components can invoke update() to update Order values in the table and context
      update: (row_index: number, column_id: string, value: any) => {
        // Given a row index, a column ID, and a value to set
        setOrders(
          // Set the new orders array to the result of a map
          prev => prev.map(
            // For each order in the previous orders array
            (row, index) =>
              // Is this the target index?
              index === row_index ? {
                // Spread the values from the previous entry
                ...prev[row_index],
                // But replace the target value with the new value
                [column_id]: value
              // If this is not the target index, do not mutate the row
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
        <FilterSearch apply={apply_text_filter} />
        {error &&
          <div className="error text-xl pt-2 -ml-42" data-testid="error_msg">
            {"* " + error}
          </div>
        }
        {!error && <div></div>}
        <FilterSwitch cycle={cycle_filter} />
      </div>
      <TableHeader table={table}></TableHeader>
      <TableEntries table={table} setError={setError}></TableEntries>
    </div>
  );
}