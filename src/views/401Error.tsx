import '../assets/styles/errorPages.css'
import logo from "../assets/images/favIcon_Time_Singularity_logo_white.png";
export default function Error401() {
  return (
    <div className="error-message-container">
     <img src={logo} alt="Logo" />
      <h1>401 - Unauthorized</h1>
      <p>Sorry, you are not authorized to access this moon base.</p>
    <div><p>Time travel back to <a href="/login">login</a></p></div>
    </div>

  );
}
