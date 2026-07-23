'use client';
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
};

const LoaderContext = createContext(initialState);

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = (msg = "Loading...") => {
        setIsLoading(true);
        toast.success(msg)
    };

    const stopLoading = (msg = "try again ") => {
        setIsLoading(false);
        toast.error(msg)
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
