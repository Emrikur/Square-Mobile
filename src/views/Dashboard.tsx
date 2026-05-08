import Header from "../components/header";
import Footer from "../components/footerNav";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const {username} = useAuth()

  return (
    <>
    <Header />
      <section style={{textAlign:"center"}}>
        <h1 >Dashboard</h1>
        <h3 style={{margin:"0 auto",borderBottom:"solid black 1.5px", width:"fit-content", padding:"2px 10px"}}>{username}</h3>
      </section>
      <Footer />

    </>
  );
}
