import DescEditCell from "./cells/desc_edit";

export default function TableHeader(props: any) {

    const header_groups = props.table.getHeaderGroups();

    return (
      <div>
        {header_groups.map((header_group: any) => {
            return <div className="table_row pt-4" key={header_group.id}>
                {header_group.headers.map((header: any) => {
                // Check if the table currently displaying an order description
                if (header.id != "desc") {
                  return <div className={`${(header.id == "name") ? "table_cell border-t-1 border-l-1 rounded-tl-lg" : "table_cell border-t-1"}` +
                  `${((header.id == "status") ? " rounded-tr-lg" : "")}`} key={header.id}>
                      <div className="flex justify-center">
                        <div className="tracking-wider">
                          {`${header.column.columnDef.header}`}
                        </div>
                      </div>
                  </div>
                }
                // If an order description is open, instance the special description cell
                else if (props.descVisible) {
                  return <div className={`${(header.id == "name") ? "table_cell border-t-1 border-l-1 rounded-tl-lg" : "table_cell border-t-1"}` +
                  `${((header.id == "status") ? " rounded-tr-lg" : "")}`} key={header.id}>
                      <div className="flex justify-center">
                        <div className="tracking-wider">
                          {`${header.column.columnDef.header}`}
                        </div>
                      </div>
                      <DescEditCell table={props.table} descVisible={props.descVisible} setDescVisible={props.setDescVisible} />
                  </div>
                }
            })}</div>
        })}
      </div>
    );
  }