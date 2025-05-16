import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type SampleContextProviderProps = {
    children: ReactNode;
};

type SampleContextProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const SampleContext = createContext<SampleContextProps | undefined>(undefined);

export function useSampleContext() {
    return useContext(SampleContext);
}

export function SampleContextProvider({ children }: SampleContextProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return <SampleContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</SampleContext.Provider>;
}
