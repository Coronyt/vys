export default function TableHeader(props: any) {

    const header_groups = props.table.getHeaderGroups();

    return (
      <div>
        {header_groups.map((header_group: any) => {
            return <div className="table_row pt-8" key={header_group.id}>
                {header_group.headers.map((header: any) => {
                return <div className="table_cell" key={header.id}>
                    {`${header.column.columnDef.header}`}
                </div>
            })}</div>
        })}
      </div>
    );
  }