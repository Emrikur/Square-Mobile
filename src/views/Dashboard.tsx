import Header from "../components/header";
import Footer from "../components/footerNav";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  const { token, userName } = location.state;

   console.log(location);
  console.log("Here is your token: " + token);
  console.log("Here is your username: " + userName);
  return (
    <>
    <Header userName={userName} />
      <div>
        <h1>Dashboard</h1>
      </div>
      <Footer />

    </>
  );
}
