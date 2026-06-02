import '../assets/styles/errorPages.css'
import logo from "../assets/images/favIcon_Time_Singularity_logo_white.png";
export default function Error403() {
  return (
    <div className="error-message-container">
     <img src={logo} alt="Logo" />
      <h1>403 - Forbidden</h1>
      <p>Sorry, you are not authorized to access this area.</p>
    <div><p>Back to <a href="/login">login</a></p></div>
    </div>

  );
}
