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

    // console.log(props.row.index);
    // console.log(props.table.getCoreRowModel().rows.length - 1);
    // console.log(props.row.index == props.table.getCoreRowModel().rows.length - 1);

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={text}
                onChange={(e) => {setText(e.target.value)}}
                onBlur={blur}
                className="w-80"
            />
        </div>
    );
  }