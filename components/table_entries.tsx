import DateTimeCell from "./cells/date_time";
import OrderStatusCell from "./cells/ord_status";
import ResDropCell from "./cells/res_drop";
import TextEditCell from "./cells/text_edit";

export default function TableEntries(props: any) {
  return (
    <div>
        {props.table.getRowModel().rows.map((row: any) => {
          return <div className="table_row" key={row.id}>
            {row.getVisibleCells().map((cell: any) => {
              // if (cell.column.id == "res") {
              //   console.log(cell.getValue());
              // }
              return <div className={(cell.column.id == "name") ? "table_cell border-l-1" : "table_cell"} key={cell.id}>
                {cell.column.id == "name" && <TextEditCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "desc" && `${cell.getValue()}`}
                {cell.column.id == "res" && <ResDropCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "start" && <DateTimeCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "end" && `${cell.getValue().year}`}
                {cell.column.id == "status" && <OrderStatusCell></OrderStatusCell>}
              </div>
            })}
          </div>
        })}
    </div>
  );
}