import { flexRender } from "@tanstack/react-table";

export default function TableEntry(props: any) {
    return (
      <div>
        {props.rows.map((row: any) => {
            return <div className="table_row" key={row.id}>
                {row.getVisibleCells().map((cell: any) => {
                return <div className="table_cell" key={cell.id}>
                    {
                      flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )
                    }
                </div>
            })}</div>
        })}
      </div>
    );
  }