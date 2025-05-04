import DeleteOrderCell from "./del_order";

export default function OrderStatusCell(props: any) {

    return (
        <div>
            {/* Status cell */}
            <div className="flex justify-center">
                status_cell
            </div>
            {/* Delete order */}
            <div className="relative left-60 -top-7 w-10">
                <DeleteOrderCell table={props.table} row={props.row} cell={props.cell} />
            </div>
        </div>
    );
  }