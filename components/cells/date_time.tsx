import { build_date_display, display_to_formal, formal_to_datetime } from "@/interfaces/DateTime";

import { useState } from "react";
import { z } from "zod";

export default function DateTimeCell(props: any) {

    const zdate = z.string().date();

    const original_date = build_date_display(props.cell.getValue());
    const [dateText, setDateText] = useState(build_date_display(props.cell.getValue()));

    const blur = () => {
        // Validate input string w/ Zod after converting format
        const formal = display_to_formal(dateText);
        try {
            zdate.parse(formal);
            // After successful validation, update the value in the table
            props.table.options.meta.update(
                props.row.index,
                props.cell.column.id,
                formal_to_datetime(formal, props.cell.getValue())
            );
        } catch (error) {
            // Otherwise reset the cell display value and do not update the table
            setDateText(original_date);
        }
    }

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={dateText}
                onChange={(e) => {setDateText(e.target.value)}}
                onBlur={blur}
                className="w-24 text-center"
            />
            <div className="w-2" />
            <input
                type="text"
                value={"12:00 PM"}
                onChange={() => {}}
                onBlur={() => {}}
                className="w-24 text-center"
            />
        </div>
    );
  }