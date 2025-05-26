import DescEditIcon from "./desc_icon";
import { useState } from "react";

export default function TextEditCell(props: any) {

    const [text, setText] = useState(props.cell.getValue());

    const blur = () => {
        props.table.options.meta.update(
            props.row.index,
            props.cell.column.id,
            text
        );
    }

    return (
        <div className="flex">
            <div className="desc_icon">
                <DescEditIcon descVisible={props.descVisible} setDescVisible={props.setDescVisible}
                    openOrder={props.openOrder} setOpenOrder={props.setOpenOrder} cell_order={props.cell_order} />
            </div>
            <div className="flex justify-center">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {setText(e.target.value)}}
                    onBlur={blur}
                    className="w-54"
                    data-testid={`name_cell_${props.row.index}`}
                />
            </div>
        </div>
    );
  }