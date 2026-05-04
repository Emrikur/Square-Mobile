import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({children}: {children:React.ReactNode}) => {

  const { token } = useAuth();
  if(!token){
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}

export default ProtectedRoute;
