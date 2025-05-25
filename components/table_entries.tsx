import { Order, match_orders } from "@/interfaces/Order";

import DateTimeCell from "./cells/date_time";
import OrderStatusCell from "./cells/ord_status";
import ResDropCell from "./cells/res_drop";
import TextEditCell from "./cells/text_edit";

export default function TableEntries(props: any) {
  return (
    <div>
        {props.table.getRowModel().rows.map((row: any) => {
          // Must generate fully unique (not contingent on index) key for each row or state will not update correctly
          return <div className="table_row" key={crypto.randomUUID()}>
            {row.getVisibleCells().map((cell: any) => {
              if (cell.column.id != "desc") {
                // Rebuild Order from current row
                const cell_order: Order = {
                    name: row.getVisibleCells()[0].getValue(),
                    desc: row.getVisibleCells()[1].getValue(),
                    res: row.getVisibleCells()[2].getValue(),
                    start: row.getVisibleCells()[3].getValue(),
                    end: row.getVisibleCells()[4].getValue(),
                    status: row.getVisibleCells()[5].getValue()
                }
                return <div className={`${(cell.column.id == "name") ? `${ props.descVisible ? `${match_orders(cell_order, props.openOrder) ? "open_cell" : "table_cell"}` : "table_cell"} border-l-1` : "table_cell"}` +
                  `${(row.index == props.table.getCoreRowModel().rows.length - 1) && (cell.column.id == "name") ?
                  " rounded-bl-lg" : `${(row.index == props.table.getCoreRowModel().rows.length - 1) &&
                  (cell.column.id == "status") ? " rounded-br-lg" : ""}`}`} key={cell.id}>
                  {cell.column.id == "name" && <TextEditCell table={props.table} row={row} cell={cell} setError={props.setError}
                    descVisible={props.descVisible} setDescVisible={props.setDescVisible}
                    openOrder={props.openOrder} setOpenOrder={props.setOpenOrder} cell_order={cell_order} />}
                  {cell.column.id == "res" && <ResDropCell table={props.table} row={row} cell={cell} setError={props.setError} />}
                  {cell.column.id == "start" && <DateTimeCell table={props.table} row={row} cell={cell} setError={props.setError} />}
                  {cell.column.id == "end" && <DateTimeCell table={props.table} row={row} cell={cell} setError={props.setError} />}
                  {cell.column.id == "status" && <OrderStatusCell table={props.table} row={row} cell={cell} setError={props.setError} />}
                </div>
              }
              // Will instance dummy divs with cell dimensions to use as element spacers
              else if (props.descVisible) {
                return <div className="border-r-1 p-3 w-60 h-12 hover:cursor-default"></div>
              }
            })}
          </div>
        })}
    </div>
  );
}