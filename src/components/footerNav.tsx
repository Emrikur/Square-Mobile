import { Link } from "react-router-dom";
import "../assets/styles/footerNav.css";
import { CalendarClock, ChartColumnDecreasing, GalleryHorizontalEnd, Settings } from "lucide-react";
export default function FooterNav() {
  return (
    <footer className="footerNav">
      <div>
        <Link className="nav-link" to="/time-report"><CalendarClock />Time Report</Link>
      </div>
      <div>
        <Link className="nav-link" to="/history"><GalleryHorizontalEnd />History</Link>
      </div>
      <div>
        <Link className="nav-link" to="/statistics"><ChartColumnDecreasing />Statistics</Link>
      </div>
      <div>
        <Link className="nav-link" to="/settings"><Settings />Settings</Link>
      </div>
    </footer>
  );
}
