export default function TableEntries(props: any) {
  return (
    <div>
        {props.table.getRowModel().rows.map((row: any) => {
          return <div className="table_row">
            {row.getVisibleCells().map((cell: any) => {
              return <div className="table_cell">
                {cell.column.id == "name" && `${cell.getValue()}`}
                {cell.column.id == "desc" && `${cell.getValue()}`}
                {cell.column.id == "res" && `${cell.getValue().name}`}
                {cell.column.id == "start" && `${cell.getValue().year}`}
                {cell.column.id == "end" && `${cell.getValue().year}`}
              </div>
            })}
          </div>
        })}
    </div>
  );
}