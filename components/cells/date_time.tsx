import { build_date_display, build_time_display, display_to_formal_date, display_to_formal_time, formal_date_to_datetime, formal_time_to_datetime } from "@/interfaces/DateTime";

import { useState } from "react";
import { z } from "zod";

export default function DateTimeCell(props: any) {

    const zdate = z.string().date();
    const ztime = z.string().time();

    const original_date = build_date_display(props.cell.getValue());
    const [dateText, setDateText] = useState(build_date_display(props.cell.getValue()));

    const original_time = build_time_display(props.cell.getValue());
    const [timeText, setTimeText] = useState(build_time_display(props.cell.getValue()));

    const blur_date = () => {
        // Validate input string w/ Zod after converting format
        const formal = display_to_formal_date(dateText);
        try {
            zdate.parse(formal);
            // After successful validation, update the value in the table
            props.table.options.meta.update(
                props.row.index,
                props.cell.column.id,
                formal_date_to_datetime(formal, props.cell.getValue())
            );
        } catch (error) {
            // Otherwise reset the cell display value and do not update the table
            setDateText(original_date);
        }
    }

    const blur_time = () => {
        // Validate input string w/ Zod after converting format
        const formal = display_to_formal_time(timeText);
        try {
            ztime.parse(formal);
            // console.log(formal);
            // After successful validation, update the value in the table
            props.table.options.meta.update(
                props.row.index,
                props.cell.column.id,
                formal_time_to_datetime(formal, props.cell.getValue())
            );
        } catch (error) {
            // Otherwise reset the cell display value and do not update the table
            setTimeText(original_time);
        }
    }

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={dateText}
                onChange={(e) => {setDateText(e.target.value)}}
                onBlur={blur_date}
                className="w-24 text-center"
            />
            <div className="w-2" />
            <input
                type="text"
                value={timeText}
                onChange={(e) => {setTimeText(e.target.value)}}
                onBlur={blur_time}
                className="w-24 text-center"
            />
        </div>
    );
  }