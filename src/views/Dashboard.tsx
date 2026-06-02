import "../assets/styles/dashboard.css";
import QuickLogModal from "../components/QuickLogModal";
import LayoutWrapper from "../components/LayoutWrapper";
import { useAuth } from "../hooks/useAuth";
import TimeRegisterGraph from "../components/TimeRegisterGraph";
import { CirclePlus, X } from "lucide-react";
import { useEffect } from "react";

export default function Dashboard() {
  const { username } = useAuth();

  // const [modalOpen, setModalOpen] = useState(false);

  //Scroll to top on view refresh
  //###############################

  function ScrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    ScrollUp();
  }, []);

  return (
    <LayoutWrapper>
      <section className="dashboard-section-wrapper">
        <dialog // Fick nos om command/commandfor via Kevin Powell på instagram, väldigt smidigt sätt att hantera modaler på!
          id="log-modal"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              padding: "0",
              cursor: "none",
              display: "flex",
            }}
            className="close-modal"
            {...({
              command: "close",
              commandfor: "log-modal",
            } as React.HTMLAttributes<HTMLButtonElement>)}
          >
            <X
              style={{ marginLeft: "auto" }}
              /* onClick={() => setModalOpen(() => !modalOpen)} */
              width={32}
              height={32}
            />
          </button>
          <div className="modal-form-container">
            <p style={{ width: "90%" }}>
              Log your hours quickly by selecting a company, entering the date
              and number of hours worked. For more detailed reporting, visit the
              full report page.
            </p>
            <QuickLogModal />
          </div>
        </dialog>


        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-hero">
          <div className="welcome-message">
          <p>Good day, {username}</p>
          <button
            style={{
              background: "transparent",
              border: "none",
              padding: "0",
              cursor: "none",
              display: "flex",
            }}
            type="button"
            {...({
              command: "show-modal",
              commandfor: "log-modal",
            } as React.HTMLAttributes<HTMLButtonElement>)}
          >
            <CirclePlus
              /* onClick={() => setModalOpen(() => !modalOpen)} */ width={42}
              height={42}
            />
          </button>
          </div>
          <div className="log-entry-label">
            <p>Log-entry</p>
          </div>
        </div>
        <section>
          <TimeRegisterGraph />
        </section>
      </section>
    </LayoutWrapper>
  );
}
