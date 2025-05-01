import TextEditCell from "./cells/text_edit";

export default function TableEntries(props: any) {
  return (
    <div>
        {props.table.getRowModel().rows.map((row: any) => {
          return <div className="table_row" key={row.id}>
            {row.getVisibleCells().map((cell: any) => {
              return <div className="table_cell" key={cell.id}>
                {cell.column.id == "name" && <TextEditCell table={props.table} row={row} cell={cell} />}
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