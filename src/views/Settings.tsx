import '../assets/styles/settings.css'
import LayoutWrapper from "../components/LayoutWrapper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";
import CreateHashPassword from "../components/CreateHashPassword";


export default function Settings() {
  const navigate = useNavigate();


  const { username, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <LayoutWrapper>
      <section style={{minHeight:"70vh"}}>
      <div style={{textAlign:"center"}}>
        <h1 >Settings</h1>
        <h3 style={{margin:"0 auto",borderBottom:"solid black 1.5px", width:"fit-content", padding:"2px 10px"}}>{username}</h3>
      </div>
      <div style={{marginLeft:"auto"}} className="language-toggle-container">
          {/* //TODO Lägg till så att språk på hela sidan ändras vid toggle */}
          <div className="checkbox-wrapper-10">
            <input type="checkbox" id="cb5" className="tgl tgl-flip" />
            <label
              htmlFor="cb5"
              data-tg-on="Sv"
              data-tg-off="En"
              className="tgl-btn"
            ></label>
          </div>
        </div>
        <CreateHashPassword/>
        <div>
          <a style={{textDecoration:"underline", color:"black"}} href="">Change Password</a>
        </div>
      <div onClick={handleLogout} className="default-Btn" >
        <label htmlFor="logoutbutton">Log out</label>
        {<LogOut name="logoutButton"  />}
      </div>
      </section>
    </LayoutWrapper>
  );
}
