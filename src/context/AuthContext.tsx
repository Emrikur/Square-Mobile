import { createContext } from "react";

//Types för Token och Username samt login/logout funktionerna
interface AuthContextType {

  token: string | null;
  email: string | null;
  username:string | null;
  role:string | null;
  login: (token: string, email: string, username:string,role:string) => void;
  logout: () => void;
}

//Skapar en context för autentisering av types
export const AuthContext = createContext<AuthContextType | null>(null);
