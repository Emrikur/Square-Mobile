import { useAuth } from "../hooks/useAuth";
import "../assets/styles/userPage.css"
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import FooterNav from "../components/footerNav";
import { LogOut } from "lucide-react";

export default function UserPage() {
  const { username,role, logout } = useAuth();
  const navigate = useNavigate()

  function handleLogout() {
      logout();
      navigate("/login");
    }
  return (
    <>
      <Header />
     <section className="userpage-section">
        <div className="title-wrapper">
          <p className="user-name">{username}</p>
          <p className="user-role">{role}</p>
        </div>
      <div onClick={handleLogout} className="default-Btn" >
        <label htmlFor="logoutbutton">Log out</label>
        {<LogOut name="logoutButton"  />}
      </div>
      </section>

      <footer style={{marginTop:"auto"}}>
      <FooterNav />
      </footer>
    </>
  );
}
