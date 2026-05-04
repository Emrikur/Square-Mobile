import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
  const [userName, setUserName] = useState<string | null>(sessionStorage.getItem("userName"));



  const login = (newToken: string, newUserName: string) => {
    if (newToken && newUserName) {
    setToken(newToken);
      setUserName(newUserName);
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("userName", newUserName);
    } else {
      console.error("Token or username is missing during login.");
    }
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.clear();
  };


  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
