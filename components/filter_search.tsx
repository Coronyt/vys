'use client';

import { useState } from "react";

export default function FilterSearch(props: any) {

    const [filterType, setFilterType] = useState("filter_by_name");
    const [filterText, setFilterText] = useState("");

    const switch_filter_type = (e: any) => {
        if (e.target.value == "filter_by_name") {
            console.log("Switched to filter_by_name");
            setFilterType("filter_by_name");
        }
        if (e.target.value == "filter_by_res") {
            console.log("Switched to filter_by_res");
            setFilterType("filter_by_res");
        }
    }

    const on_text_change = (e: any) => {
        setFilterText(e.target.value);
        props.apply(e.target.value);
    }

  return (
    <div className="flex">
        <input type="text" className="filter_search" placeholder="Filter by keyword ..." onChange={on_text_change} />
        <div className="block pt-0.5 pl-3">
            <div className="flex">
                <input type="radio" name="filter_type" value="filter_by_name" id="filter_by_name" className="block" onChange={switch_filter_type} defaultChecked />
                <label htmlFor="filter_by_name" className="filter_label">Filter by name</label>
            </div>
            <div className="flex">
                <input type="radio" name="filter_type" value="filter_by_res" id="filter_by_res" className="block" onChange={switch_filter_type} />
                <label htmlFor="filter_by_res" className="filter_label">Filter by resource</label>
            </div>
        </div>
    </div>
  );
}