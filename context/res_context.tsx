'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { Resource } from '@/interfaces/Resource';

interface ResContextProperties {
    resources: Resource[],
    setResources: Dispatch<SetStateAction<Resource[]>>
}

const ResContext = createContext<ResContextProperties>({
    resources: [],
    setResources: (): Resource[] => []
});

export const ResContextProvider = ({ children }: { children: React.ReactNode }) => {
    // ___ Defining static resource list (for testing)
    const res1: Resource = {name: "Pheenix Alpha AD12 1", id: "press1", in_use: false}
    const res2: Resource = {name: "Pheenix Alpha AD12 2", id: "press2", in_use: false}
    const res3: Resource = {name: "Nakamichi Dragon 1", id: "deck1", in_use: false}
    const res4: Resource = {name: "Onkyo TA-RW505 1", id: "deck2", in_use: false}
    const res5: Resource = {name: "Printing station 1", id: "printer1", in_use: false}
    const res_arr: Resource[] = [res1, res2, res3, res4, res5];
    // ___
    const [resources, setResources] = useState<Resource[]>(res_arr);
    return (
        <ResContext.Provider value={{ resources, setResources }}>
            {children}
        </ResContext.Provider>
    );
}

export const useResContext = () => useContext(ResContext);