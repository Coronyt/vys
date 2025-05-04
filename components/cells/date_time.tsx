import { DateTime, build_date, build_date_display } from "@/interfaces/DateTime";

import { useState } from "react";

export default function DateTimeCell(props: any) {

    // console.log(props.cell.getValue());
    // console.log(build_date(props.cell.getValue()));
    // const [dateText, setDateText] = useState(props.cell.getValue());

    return (
        <div className="flex justify-center">
            {/* <input type="date" /> */}
            {/* <input type="time" /> */}
            <input
                type="text"
                value={build_date_display(props.cell.getValue())}
                onChange={() => {}}
                onBlur={() => {}}
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