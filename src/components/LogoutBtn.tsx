import "../assets/styles/logoutbtn.css";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LogoutBtn(){
const navigate = useNavigate()
const { logout } = useAuth();
function handleLogout() {
      logout();
      navigate("/login");
    }
  return (
    <>
    <div className="default-Btn user-page-logout" onClick={handleLogout}>
      <label htmlFor="logoutButton">Log out</label>
      {<LogOut name="logoutButton"  />}
    </div>
    </>
  )
}
