// import { use } from 'react';
import "../assets/styles/header.css";
import { House } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/images/navbar-square-logo.png"

export default function Header() {
  const { username, avatar } = useAuth();
  const navigate = useNavigate();
  function toUserPage() {
    navigate(`/${username}`);
  }

  const currentAvatar = `/avatars/${avatar}.png`
  function toDashboard() {
    navigate(`/dashboard`);
  }
  return (
    <>
      <header className="header">
        <div className="mobile-logo-header">
          <a href="/dashboard">
            {/* <img
              src={logo}
              alt="Logo"
            /> */}
            <h1 id="logo-company-header">Time Singularity</h1>
          </a>
        </div>
        <div className="userHub">
          <House  height={35} width={35} onClick={toDashboard}/>
          <img id="user-avatar" onClick={toUserPage} src={currentAvatar} alt="an image-link to the user page of a oil painted bear, sitting." />
        </div>
      </header>
    </>
  );
}
