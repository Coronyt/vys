'use client';

import { Status, update_status, update_status_all } from "@/interfaces/Order";
import { getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import FilterSwitch from "./filter_switch";
import { Order } from "@/interfaces/Order";
import TableEntries from "./table_entries";
import TableHeader from "./table_header";
import { useOrderContext } from "@/context/order_context";

export default function Table() {

  const [filters, setFilters] = useState([
    // {
    //   id: "status",
    //   value: Status.PENDING
    // }
  ]);

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
        header: 'Status'
      }
    ]

    const { orders, setOrders } = useOrderContext();
    
    useEffect(() => {
      // update_status_all();
      // console.log(orders);
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
      // console.log(updated);
      setOrders(updated);
    }, []);

    const table = useReactTable({
      data: orders,
      columns,
      state: {
        columnFilters: filters
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
        <h2 className="page_title">View all orders</h2>
        <FilterSwitch></FilterSwitch>
        <TableHeader table={table}></TableHeader>
        <TableEntries table={table}></TableEntries>
      </div>
    );
  }