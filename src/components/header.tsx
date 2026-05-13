// import { use } from 'react';
import "../assets/styles/header.css";
import { CircleUser,House } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { username } = useAuth();
  const navigate = useNavigate();
  function toUserPage() {
    navigate(`/${username}`);
  }
  function toDashboard() {
    navigate(`/dashboard`);
  }
  return (
    <>
      <header className="header">
        <div className="mobile-logo-header">
          <a href="/dashboard">
            <img
              src="src/assets/images/Sleek_Time_Singularity_logo.png"
              alt="Logo"
            />
          </a>
        </div>
        <div className="userHub">
          <House onClick={toDashboard} width={35} height={35}/>
          <CircleUser onClick={toUserPage} width={35} height={35} />
        </div>
      </header>
    </>
  );
}
