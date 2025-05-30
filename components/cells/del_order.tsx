import { Order } from "@/interfaces/Order";
import { useOrderContext } from "@/context/order_context";

export default function DeleteOrderCell(props: any) {

    const { orders, setOrders } = useOrderContext();

    const handle_delete_order = () => {
        // Rebuild target Order from row
        const to_delete: Order = {
            name: props.row.getVisibleCells()[0].getValue(),
            desc: "New order description", // Not checking for this value
            res: props.row.getVisibleCells()[1].getValue(),
            start: props.row.getVisibleCells()[2].getValue(),
            end: props.row.getVisibleCells()[3].getValue(),
            status: 0 // Not checking for this value
        }
        let i: number = 0;
        let mute = Array.from(orders);
        orders.forEach((order) => {
            // If we have found a matching order in the array
            if (order.name === to_delete.name && order.res === to_delete.res && order.start === to_delete.start && order.end === to_delete.end) {
                // Splice the order out from the array
                mute.splice(i, 1);
                // Save mutated array to context
                setOrders(mute);
            }
            i++;
        });
    }

    return (
        <div className="flex justify-center del_icon" onClick={handle_delete_order} data-testid={`delete_order_${props.row.index}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </div>
    );
  }