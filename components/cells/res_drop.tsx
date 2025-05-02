import { useEffect, useState } from "react";

import { Resource } from "@/interfaces/Resource";
import { useResContext } from "@/context/res_context";

export default function ResDropCell(props: any) {

    const { resources, setResources } = useResContext();

    const [local_res, setLocalRes] = useState(Array.from(resources));

    useEffect(() => {
        // Loop index
        let i: number = 0;
        // Create deep copy of resource array
        local_res.forEach((res: Resource) => {
            // If we have found the matching resource
            if (res.id == props.cell.getValue()) {
                // Splice it out from the local res array and prepend it back
                    // This way the dropdown element will display the Order's currently corresponding Resource
                setLocalRes(local_res.splice(i, 1).concat(local_res));
            }
            i++;
        });
    }, []);

    return (
        <div className="flex justify-center">
            <select
            name="res_input"
            id="res_input"
            className="w-56"
            onChange={(e) => {
                props.table.options.meta.update(
                    props.row.index,
                    props.cell.column.id,
                    e.target.value
                );
            }}
            >
            <optgroup>
                {local_res.map((res, index) => {return <option key={index} value={res.id}>{res.name}</option>})}
            </optgroup>
            </select>
        </div>
    );
  }