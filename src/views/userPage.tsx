import { useAuth } from "../hooks/useAuth";
import Header from "../components/header";
import FooterNav from "../components/footerNav";
export default function UserPage() {
  const { username } = useAuth();

  return (
    <>
      <Header />
     <div style={{textAlign:"center"}}>
        <h1 >My page</h1>
        <h3 style={{margin:"0 auto",borderBottom:"solid black 1.5px", width:"fit-content", padding:"2px 10px"}}>{username}</h3>
      </div>
      <FooterNav />
    </>
  );
}
