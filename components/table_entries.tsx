import DateTimeCell from "./cells/date_time";
import OrderStatusCell from "./cells/ord_status";
import ResDropCell from "./cells/res_drop";
import TextEditCell from "./cells/text_edit";

export default function TableEntries(props: any) {
  return (
    <div>
        {props.table.getRowModel().rows.map((row: any) => {
          // console.log(row.getVisibleCells());
          // Must generate fully unique (not contingent on index) key for each row or state will not update correctly
          return <div className="table_row" key={crypto.randomUUID()}>
            {row.getVisibleCells().map((cell: any) => {
              // console.log(row);
              // See if i can get ref to each order per row and hand that to datetimecells
              return <div className={(cell.column.id == "name") ? "table_cell border-l-1" : "table_cell"} key={cell.id}>
                {cell.column.id == "name" && <TextEditCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "res" && <ResDropCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "start" && <DateTimeCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "end" && <DateTimeCell table={props.table} row={row} cell={cell} />}
                {cell.column.id == "status" && <OrderStatusCell table={props.table} row={row} cell={cell} />}
              </div>
            })}
          </div>
        })}
    </div>
  );
}