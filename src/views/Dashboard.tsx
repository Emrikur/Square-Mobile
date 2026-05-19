import "../assets/styles/dashboard.css"
import QuickLogModal from "../components/QuickLogModal"
import LayoutWrapper from "../components/LayoutWrapper";
import { useAuth } from "../hooks/useAuth";
import TimeRegisterGraph from "../components/TimeRegisterGraph";
import { CirclePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const {username} = useAuth()

const [modalOpen, setModalOpen] = useState(false)


//Scroll to top on view refresh
//###############################

function ScrollUp(){
  window.scrollTo({top:0, behavior:"smooth"})
}

useEffect(() => {
  ScrollUp()
},[])

  return (
    <LayoutWrapper>

      <section style={{marginTop:"13rem", backgroundColor:"#F5F5F5"}}>
      {modalOpen && (
        <div onClick={() => setModalOpen(false)}
          style={{ position: "fixed", inset: 0, background: "transparent", zIndex:"10", top:130, overflowY:"scroll" }}
        >
          <div onClick={(e) => e.stopPropagation()} // your actual modal
            style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem" }}
          >
            <dialog className="quick-create-modal" style={{display:"flex", flexDirection:"column"}}>
              <X className="close-modal" onClick={() => setModalOpen(() => !modalOpen)} width={32} height={32}/>
              <div className="modal-form-container">
                <p style={{width:"80%"}}>Log your hours quickly by selecting a company, entering the date and number of hours worked. For more detailed reporting, visit the full report page.</p>
                  <QuickLogModal/>
              </div>

            </dialog>
          </div>
        </div>
      )}
        <div style={{margin:"0 10px",display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-hero">
          <p>Good day, {username}</p>
          <CirclePlus onClick={() => setModalOpen(() => !modalOpen)} width={42} height={42}/>
        </div>
        <section>
          <TimeRegisterGraph/>
        </section>
      </section>
    </LayoutWrapper>
  );
}
