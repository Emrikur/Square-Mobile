import Login from "../components/login";
import logo from '../assets/images/Aderian_Square-Moon_blue_rgb.svg';
import '../assets/styles/loginPage.css';
export default function LoginPage() {



  return (
    <>
<main>


        <div className="language-toggle-container">

          {/* //TODO Lägg till så att språk på hela sidan ändras vid toggle */}
        <div className="checkbox-wrapper-10">
          <input  type="checkbox" id="cb5" className="tgl tgl-flip" />
          <label htmlFor="cb5" data-tg-on="Sv" data-tg-off="En" className="tgl-btn"></label>
        </div>

        </div>
      <div className="login-wrapper">

        <img src={logo} alt="Logo" />
        <Login/>
      </div>
</main>

    </>
  );
}
