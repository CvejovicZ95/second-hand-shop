import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const login = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("authUser");
  };

  const register = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = { children: PropTypes.any };
