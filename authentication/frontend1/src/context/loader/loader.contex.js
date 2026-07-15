'use client';
import { createContext, useState, useContext } from "react";

const initialState = {
    isLoading: false,
};

const LoaderContext = createContext(initialState);

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
    };

    return (
        <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    return useContext(LoaderContext);
};
