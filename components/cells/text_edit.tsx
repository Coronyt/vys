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
        <div className="flex justify-center">
            <input
                type="text"
                value={text}
                onChange={(e) => {setText(e.target.value)}}
                onBlur={blur}
                className=""
            />
        </div>
    );
  }