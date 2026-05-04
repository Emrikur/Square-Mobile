import { createContext } from "react";

//Types för Token och Username samt login/logut funktionerna
interface AuthContextType {
  token: string | null;
  userName: string | null;
  login: (token: string, userName: string) => void;
  logout: () => void;
}

//Skapar en context för autentisering av types
export const AuthContext = createContext<AuthContextType | null>(null);
