import DeleteOrderCell from "./del_order";
import { useState } from "react";

export default function OrderStatusCell(props: any) {
    
    // console.log(props.cell.getValue());

    const [status, setStatus] = useState(props.cell.getValue());

    return (
        <div>
            {/* Status cell */}
            <div className="flex justify-center bg-amber-800 rounded-sm">
                {props.cell.getValue() === 0 && "Pending"}
                {props.cell.getValue() === 1 && "Scheduled"}
                {props.cell.getValue() === 2 && "Active"}
                {props.cell.getValue() === 3 && "Completed"}
            </div>
            {/* Delete order */}
            <div className="relative left-60 -top-7 w-10">
                <DeleteOrderCell table={props.table} row={props.row} cell={props.cell} />
            </div>
        </div>
    );
  }