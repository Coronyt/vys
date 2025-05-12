import { DateTime, build_date, build_date_display, build_time, build_time_display, display_to_formal_date, display_to_formal_time, formal_date_to_datetime, formal_time_to_datetime } from "@/interfaces/DateTime";

import { Order } from "@/interfaces/Order";
import { update_status } from "@/interfaces/Order";
import { useState } from "react";
import { z } from "zod";

export default function DateTimeCell(props: any) {

    // Converts string for display in cell
    const date_text_gen = (): string => {
        const date_display = build_date_display(props.cell.getValue());
        if (date_display == "NaN-NaN-0") {
            return "MM-DD-YYYY";
        }
        return date_display;
    }

    // Converts string for display in cell
    const time_text_gen = (): string => {
        const time_display = build_time_display(props.cell.getValue());
        if (time_display == "12:NaN AM") {
            return "HH:MM AM";
        }
        return time_display;
    }

    const zdate = z.string().date();
    const ztime = z.string().time();

    const original_date = date_text_gen(); // To be used as reset value after invalid inputs
    const [dateText, setDateText] = useState(date_text_gen());

    const original_time = time_text_gen(); // To be used as reset value after invalid inputs
    const [timeText, setTimeText] = useState(time_text_gen());

    const blur_date = () => {
        // Format string for Zod validation
        const formal = display_to_formal_date(dateText);
        try {
            zdate.parse(formal);
            // If we are editing the start date
            if (props.cell.column.id == "start") {
                let start_js_date = build_date(formal_date_to_datetime(formal, props.cell.getValue()));
                let end_js_date = build_date(props.row.getVisibleCells()[3].getValue());
                // If an end date exists in this row, make sure it comes after the start date, otherwise throw an error
                if (!Number.isNaN(new Date(end_js_date).getMonth())) {
                    if (new Date(start_js_date) > new Date(end_js_date)) {
                        throw new Error("Start date must be before end date");
                    }
                }
                // If the start date is before 1900, throw an error
                if (!Number.isNaN(new Date(start_js_date).getFullYear())) {
                    if (new Date(start_js_date).getFullYear() < 1900) {
                        throw new Error("Start year must be after 1900");
                    }
                }
            }
            // If we are editing the end date
            if (props.cell.column.id == "end") {
                let start_js_date = build_date(props.row.getVisibleCells()[2].getValue());
                let end_js_date = build_date(formal_date_to_datetime(formal, props.cell.getValue()));
                // If a start date exists in this row, make sure it comes before the end date, otherwise throw an error
                if (!Number.isNaN(new Date(end_js_date).getMonth())) {
                    if (new Date(end_js_date) < new Date(start_js_date)) {
                        throw new Error("End date must be after start date");
                    }
                }
                // If the end date is before 1900, throw an error
                if (!Number.isNaN(new Date(end_js_date).getFullYear())) {
                    if (new Date(end_js_date).getFullYear() < 1900) {
                        throw new Error("End year must be after 1900");
                    }
                }
            }
            // After successful validation, update the value in the table
            props.table.options.meta.update(
                props.row.index,
                props.cell.column.id,
                formal_date_to_datetime(formal, props.cell.getValue())
            );
            // Init DateTimes for updated date/time values
            let start_dt: DateTime = {
                month: 0,
                day: 0,
                year: 0,
                hour: 0,
                minute: 0
            }
            let end_dt: DateTime = {
                month: 0,
                day: 0,
                year: 0,
                hour: 0,
                minute: 0
            }
            // Load date and time values into new DateTimes
            if (props.cell.column.id == "start") {
                start_dt = formal_date_to_datetime(formal, props.cell.getValue());
                end_dt = props.row.getVisibleCells()[3].getValue();
            }
            if (props.cell.column.id == "end") {
                start_dt = props.row.getVisibleCells()[2].getValue();
                end_dt = formal_date_to_datetime(formal, props.cell.getValue());
            }
            // Load order values into new Order
            let updated_order: Order = {
                name: props.row.getVisibleCells()[0].getValue(),
                desc: "New order description",
                res: props.row.getVisibleCells()[1].getValue(),
                start: start_dt,
                end: end_dt,
                status: props.row.getVisibleCells()[4].getValue()
            }
            // Update the order status in the table
            props.table.options.meta.update(
                props.row.index,
                "status",
                update_status(updated_order)
            );
            props.setError("");
        } catch (err: any) {
            if (err.issues) { // ZodError
                props.setError("Date must be formatted as MM-DD-YYYY");
            } else { // Custom error
                props.setError(err.message);
            } // Reset to previous value
            setDateText(original_date);
        }
    }

    const blur_time = () => {
        // Format string for Zod validation
        const formal = display_to_formal_time(timeText);
        try {
            ztime.parse(formal);
            // If we are editing the start time
            if (props.cell.column.id == "start") {
                let start_js_date = build_date(props.row.getVisibleCells()[2].getValue());
                let end_js_date = build_date(props.row.getVisibleCells()[3].getValue());
                // Both start and end dates must exist before times will be compared
                if (!Number.isNaN(new Date(start_js_date).getMonth()) && !Number.isNaN(new Date(end_js_date).getMonth())) {
                    // If start and end dates exist and match, compare start and end times
                    if (new Date(start_js_date).valueOf() == new Date(end_js_date).valueOf()) {
                        let start_js_time = build_time(formal_time_to_datetime(formal, props.cell.getValue()));
                        let end_js_time = build_time(props.row.getVisibleCells()[3].getValue());
                        if (new Date(start_js_date + " " + start_js_time) >= new Date(end_js_date + " " + end_js_time)) {
                            throw new Error("Start time must be before end time");
                        }
                    }
                }
            }
            // If we are editing the end time
            if (props.cell.column.id == "end") {
                let start_js_date = build_date(props.row.getVisibleCells()[2].getValue());
                let end_js_date = build_date(props.row.getVisibleCells()[3].getValue());
                // Both start and end dates must exist before times will be compared
                if (!Number.isNaN(new Date(start_js_date).getMonth()) && !Number.isNaN(new Date(end_js_date).getMonth())) {
                    // If start and end dates exist and match, compare start and end times
                    if (new Date(start_js_date).valueOf() == new Date(end_js_date).valueOf()) {
                        let start_js_time = build_time(props.row.getVisibleCells()[2].getValue());
                        let end_js_time = build_time(formal_time_to_datetime(formal, props.cell.getValue()));
                        if (new Date(end_js_date + " " + end_js_time) <= new Date(start_js_date + " " + start_js_time)) {
                            throw new Error("End time must be after start time");
                        }
                    }
                }
            }
            // After successful validation, update the value in the table
            props.table.options.meta.update(
                props.row.index,
                props.cell.column.id,
                formal_time_to_datetime(formal, props.cell.getValue())
            );
            // Init DateTimes for updated date/time values
            let start_dt: DateTime = {
                month: 0,
                day: 0,
                year: 0,
                hour: 0,
                minute: 0
            }
            let end_dt: DateTime = {
                month: 0,
                day: 0,
                year: 0,
                hour: 0,
                minute: 0
            }
            // Load values into new DateTimes
            if (props.cell.column.id == "start") {
                start_dt = formal_time_to_datetime(formal, props.cell.getValue());
                end_dt = props.row.getVisibleCells()[3].getValue();
            }
            if (props.cell.column.id == "end") {
                start_dt = props.row.getVisibleCells()[2].getValue();
                end_dt = formal_time_to_datetime(formal, props.cell.getValue());
            }
            // Load order values into new Order
            let updated_order: Order = {
                name: props.row.getVisibleCells()[0].getValue(),
                desc: "New order description",
                res: props.row.getVisibleCells()[1].getValue(),
                start: start_dt,
                end: end_dt,
                status: props.row.getVisibleCells()[4].getValue()
            }
            // Update the order status in the table
            props.table.options.meta.update(
                props.row.index,
                "status",
                update_status(updated_order)
            );
            props.setError("");
        } catch (err: any) {
            if (err.issues) { // ZodError
                props.setError("Time must be formatted as HH:MM AM/PM");
            } else { // Custom error
                props.setError(err.message);
            } // Reset to previous value
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
                className="w-26 text-center"
                data-testid={props.cell.column.id == "start" ? `start_date_cell_${props.row.index}` : `end_date_cell_${props.row.index}`}
            />
            <div className="w-2" />
            <input
                type="text"
                value={timeText}
                onChange={(e) => {setTimeText(e.target.value)}}
                onBlur={blur_time}
                className="w-26 text-center"
                data-testid={props.cell.column.id == "start" ? `start_time_cell_${props.row.index}` : `end_time_cell_${props.row.index}`}
            />
        </div>
    );
  }