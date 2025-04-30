'use client';

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import TableEntries from "./table_entries";
import TableHeader from "./table_header";
import { useOrderContext } from "@/context/order_context";

export default function Table() {

    const columns = [
      {
          accessorKey: 'name',
          header: 'Order'
      },
      {
        accessorKey: 'desc',
        header: 'Description'
      },
      {
        accessorKey: 'res',
        header: 'Resource'
      },
      {
        accessorKey: 'start',
        header: 'Start date/time'
      },
      {
        accessorKey: 'end',
        header: 'End date/time'
      }
    ]

    const { orders, setOrders } = useOrderContext();

    const table = useReactTable({
      data: orders,
      columns,
      getCoreRowModel: getCoreRowModel()
    });

    return (
      <div>
        <h2 className="text-4xl pb-6">View all orders</h2> <hr />
        <TableHeader table={table}></TableHeader>
        <TableEntries table={table}></TableEntries>
      </div>
    );
  }