"use client"
import { ReactNode, createContext, useContext, useState } from "react"

export const newContext = createContext<any>(null);

function ContextProvider({ children }: { children: ReactNode }) {
    const [isLoading, setLoading] = useState<boolean>(false);

    return (
        <newContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </newContext.Provider>
    )
};
export const CartState = () => {
    return useContext(newContext);
};


export default ContextProvider