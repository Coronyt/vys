export default function FilterSearch() {

    const switch_filter_type = (e: any) => {
        // TODO - Should correspond with local state
        if (e.target.value == "filter_by_name") {
            console.log("Switched to filter_by_name");
        }
        if (e.target.value == "filter_by_res") {
            console.log("Switched to filter_by_res");
        }
    }

    // TODO - Connect text input to onChange func
        // Every time the given text input changes ...
            // Create a new filter and hand up to Table
                // Should be contingent on filter type state
            // There should be a func in OrderTable to handle from there

  return (
    <div className="flex">
        <input type="text" className="filter_search" placeholder="Filter by keyword ..."/>
        <div className="block pt-1 pl-3">
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