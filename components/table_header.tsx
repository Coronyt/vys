export default function TableHeader(props: any) {

    const header_groups = props.table.getHeaderGroups();

    return (
      <div>
        {header_groups.map((header_group: any) => {
            return <div className="table_row pt-4" key={header_group.id}>
                {header_group.headers.map((header: any) => {
                return <div className={`${(header.id == "name") ? "table_cell border-t-1 border-l-1 rounded-tl-lg" : "table_cell border-t-1"}` +
                 `${((header.id == "status") ? " rounded-tr-lg" : "")}`} key={header.id}>
                    <div className="flex justify-center">
                      <div className="tracking-wider">
                        {`${header.column.columnDef.header}`}
                      </div>
                    </div>
                </div>
            })}</div>
        })}
      </div>
    );
  }