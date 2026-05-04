import '../assets/styles/header.css';
import { User } from "lucide-react";
export default function Header(params:{userName:string}) {
  return (
    <>
      <header className="header">
        <div className="mobile-logo-header">
        <img width="120" src="src\assets\images\Aderian_Square-Moon_blue_rgb.svg" alt="Logo" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "5px",
            fontSize: "0.8rem",
          }}
        >
          <p>inloggad som: {params.userName}</p>
          <User />
        </div>
      </header>
    </>
  );
}
