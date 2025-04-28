'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { Order } from '@/interfaces/Order';

interface OrderContextProperties {
    orders: Order[],
    setOrders: Dispatch<SetStateAction<Order[]>>
}

const OrderContext = createContext<OrderContextProperties>({
    orders: [],
    setOrders: (): Order[] => []
});

export const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    return (
        <OrderContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrderContext = () => useContext(OrderContext);