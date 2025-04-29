'use client';

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useOrderContext } from "@/context/order_context";

export default function Table() {

    const columns = [
        {
            accessorKey: 'name',
            header: 'name_header',
            cell: (props: any) => {
                <p>{props.getValue}</p>
            }
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
        <h2>order_table</h2> <br /> <hr /> <br />
        {table.getHeaderGroups().map((header_group) => {
          return <div>{header_group.headers.map((header) => {
            return <p>{`${header.column.columnDef.header}`}</p>
          })}</div>
        })}
      </div>
    );
  }