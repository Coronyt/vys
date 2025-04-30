'use client';

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import TableEntry from "./table_entry";
import TableHeader from "./table_header";
import { useOrderContext } from "@/context/order_context";

export default function Table() {

    const columns = [
      {
          accessorKey: 'name',
          header: 'Order',
          cell: (props: any) => {
              <p>{props.getValue()}</p>
          }
      },
      {
        accessorKey: 'desc',
        header: 'Description',
        cell: (props: any) => {
            <p>{props.getValue()}</p>
        }
      },
      {
        accessorKey: 'res',
        header: 'Resource',
        cell: (props: any) => {
            <p>{props.getValue().name}</p>
        }
      },
      {
        accessorKey: 'start',
        header: 'Start date/time',
        cell: (props: any) => {
            <p>{props.getValue().year}</p>
        }
      },
      {
        accessorKey: 'end',
        header: 'End date/time',
        cell: (props: any) => {
            <p>{props.getValue().year}</p>
        }
      }
    ]

    const { orders, setOrders } = useOrderContext();

    const table = useReactTable({
      data: orders,
      columns,
      getCoreRowModel: getCoreRowModel()
    });

    // console.log(table.getRowModel().rows[0].getVisibleCells()[0].column.id);

    return (
      <div>
        <h2>order_table</h2> <br /> <hr /> <br />
        <TableHeader header_groups={table.getHeaderGroups()}></TableHeader>
        {table.getRowModel().rows.map((row: any) => {
          return <div className="table_row">
            {row.getVisibleCells().map((cell: any) => {
              return <div className="table_cell">
                {cell.column.id == "name" && `${cell.getValue()}`}
                {cell.column.id == "desc" && `${cell.getValue()}`}
                {cell.column.id == "res" && `${cell.getValue().name}`}
                {cell.column.id == "start" && `${cell.getValue().year}`}
                {cell.column.id == "end" && `${cell.getValue().year}`}
              </div>
            })}
          </div>
        })}
      </div>
    );
  }