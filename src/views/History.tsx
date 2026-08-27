import LayoutWrapper from "../components/LayoutWrapper";
import UserPastTimesheets from "../components/UserPastTimesheets";
import "../assets/styles/history.css"

export default function History() {
  return (
    <LayoutWrapper>
      <section className="history-wrapper" style={{minHeight:"70vh"}}>
        <h1>History</h1>
        <UserPastTimesheets/>
      </section>
    </LayoutWrapper>
  );
}
