import { createContext, useState } from "react";

const initialState = {
    isLoading : false , 
}

const LoaderContext = createContext(initialState);

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(initialState);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    )
    
};

export const useLoader = () => {
    return useContext(LoaderContext);
};