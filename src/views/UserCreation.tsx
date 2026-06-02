import CreateUser from "../components/CreateUser";
import "../assets/styles/createUser.css";
import LayoutWrapper from "../components/LayoutWrapper";

export default function UserCreation() {
  return (
    <LayoutWrapper>
      <section className="page-section" style={{minHeight:"70vh"}}>
        <h1>User Creation</h1>
        <CreateUser />
      </section>
    </LayoutWrapper>
  );
}
