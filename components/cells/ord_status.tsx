import DeleteOrderCell from "./del_order";
import { useState } from "react";

export default function OrderStatusCell(props: any) {

    const [status, setStatus] = useState(props.cell.getValue());

    return (
        <div>
            {/* Status cell */}
            <div className={`flex justify-center rounded-sm
                ${status == "0" ? "bg-rose-600/50" : ""}
                ${status == "1" ? "bg-blue-600/50" : ""}
                ${status == "2" ? "bg-lime-600/50" : ""}
                ${status == "3" ? "bg-zinc-600/25" : ""}
            `}>
                {status === "0" && "Pending"}
                {status === "1" && "Scheduled"}
                {status === "2" && "Active"}
                {status === "3" && "Completed"}
            </div>
            {/* Delete order */}
            <div className="relative left-60 -top-7 w-10">
                <DeleteOrderCell table={props.table} row={props.row} cell={props.cell} />
            </div>
        </div>
    );
  }