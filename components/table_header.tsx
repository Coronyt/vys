export default function TableHeader(props: any) {
    return (
      <div>
        {props.header_groups.map((header_group: any) => {
            return <div className="table_row" key={header_group.id}>
                {header_group.headers.map((header: any) => {
                return <div className="table_cell" key={header.id}>
                    {`${header.column.columnDef.header}`}
                </div>
            })}</div>
        })}
      </div>
    );
  }