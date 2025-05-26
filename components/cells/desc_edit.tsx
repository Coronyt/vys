export default function DescEditCell(props: any) {

  return (
    // Cell height will scale with number of visible rows in Table
    <div>
        <div className="border-b-1 p-3 mt-2.5 -ml-3 -mr-3 h-" style={{ height: props.table.getRowModel().rows.length * 48 + 1 }}>
            {props.openOrder.desc}
        </div>
    </div>
  );
}