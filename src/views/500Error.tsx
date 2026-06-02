import '../assets/styles/errorPages.css'
import logo from "../assets/images/favIcon_Time_Singularity_logo_white.png";
export default function Error500() {
  return (
    <div className="error-message-container">
     <img src={logo} alt="Logo" />
      <h1>500 - Error</h1>
      <p>An error accured.</p>
    <div><p>Back to <a href="/login">login</a></p></div>
    </div>

  );
}
