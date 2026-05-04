import '../assets/styles/errorPages.css'
import logo from '../assets/images/Aderian_Square-Moon_blue_rgb.svg';

export default function Error404() {
  return (
    <div className="error-message-container">
      <img src={logo} alt="Logo" />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the moonbase you are looking for has been oblitirated in space.</p>
      <div><p>Time travel back to <a href="/login">login</a></p></div>
    </div>
  );
}
