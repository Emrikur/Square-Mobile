import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  //Gets the stored session token and makes sure the null value is not a string ("null")
  const getStoredToken = () => {
    const token = sessionStorage.getItem("token");
    return token && token !== "null" ? token : null;
  }
  //Get stored session username and makes sure the null value is not a string ("null")
  const getStoredEmail = () => {
    const email = sessionStorage.getItem("email");
    return email && email !== "null" ? email : null;
  }
  //Get stored session users full name and makes sure the null value is not a string ("null")
  const getStoredUsername = () => {
    const username = sessionStorage.getItem("full_name");
    return username && username !== "null" ? username : null;
  }


  const [token, setToken] = useState<string | null>(getStoredToken());
  const [email, setEmail] = useState<string | null>(getStoredEmail());
  const [username, setUsername] = useState<string | null>(getStoredUsername());



  const login = (newToken: string, mail: string, full_name:string) => {

    if (newToken && mail) {
    setToken(newToken);

    if(!mail){
      return null;
    }
      setEmail(mail);
      setUsername(full_name);
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("email", mail);
      sessionStorage.setItem("full_name", full_name);
    } else {
      console.error("Token or username is missing during login.");
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("full_name");
    sessionStorage.clear();
  };


  return (
    <AuthContext.Provider value={{ token, email, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
