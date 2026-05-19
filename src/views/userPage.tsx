import { useAuth } from "../hooks/useAuth";
import "../assets/styles/userPage.css"
import LogoutBtn from "../components/LogoutBtn";
import LayoutWrapper from "../components/LayoutWrapper";
import AvatarDisplay from "../components/avatarDisplay";

export default function UserPage() {
  const { username,role } = useAuth();
  // const navigate = useNavigate()


  return (
    <LayoutWrapper>
     <section className="userpage-section">
        <div className="title-wrapper">
        <AvatarDisplay/>
          <p className="user-name">{username}</p>
          <p className="user-role">{role}</p>
        </div>


        <LogoutBtn/>

      </section>
    </LayoutWrapper>
  );
}
