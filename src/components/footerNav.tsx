import { Link } from "react-router-dom";
import "../assets/styles/footerNav.css";
import { CalendarClock, ChartColumnDecreasing, ClipboardClock, GalleryHorizontalEnd } from "lucide-react";
export default function FooterNav() {

  const linkSelected = window.location.pathname;


  return (
    <footer className="footerNav">
      <div>
        <Link className={linkSelected === "/time-report" ? "nav-link selected" : "nav-link"} to="/time-report"><CalendarClock />Time Report</Link>
      </div>
      <div>
        <Link className={linkSelected === "/history" ? "nav-link selected" : "nav-link"} to="/history"><GalleryHorizontalEnd />History</Link>
      </div>
      <div>
        <Link className={linkSelected === "/statistics" ? "nav-link selected" : "nav-link"} to="/statistics"><ChartColumnDecreasing />Statistics</Link>
      </div>
      <div>
        <Link className={linkSelected === "/timesheets" ? "nav-link selected" : "nav-link"} to="/timesheets"><ClipboardClock />Timesheets</Link>
      </div>
    </footer>
  );
}
