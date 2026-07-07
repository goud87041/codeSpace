import { createContext } from "react";

const initialState = {
    user : null , 
    isLoading : false , 
    isAuthenticated : false , 
    isUser : false , 
    
}

export const AuthContext = createContext({
    user : null , 
    
})