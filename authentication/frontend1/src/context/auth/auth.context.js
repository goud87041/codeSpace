import { createContext, useState, useEffect } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = (data) => {
    // data = { user, token, refreshToken, expiresAt }
    setAuth({
      ...data,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
    localStorage.setItem("token", data.token);
    if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
  };

  const logout = () => {
    setAuth({ ...initialState, isLoading: false });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: validate/decode token, fetch user, or just trust it and set state
      setAuth((prev) => ({ ...prev, token, isAuthenticated: true, isLoading: false }));
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};