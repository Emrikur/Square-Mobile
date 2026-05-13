import Header from "../components/header";
import "../assets/styles/dashboard.css"
import QuickLogModal from "../components/QuickLogModal"
import Footer from "../components/footerNav";
import { useAuth } from "../hooks/useAuth";
import TimeRegisterGraph from "../components/TimeRegisterGraph";
import { CirclePlus, X } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const {username} = useAuth()

const [modalOpen, setModalOpen] = useState(false)


  return (
    <>
    <Header />

    {modalOpen && (
      <div onClick={() => setModalOpen(false)} // invisible full-screen backdrop
        style={{ position: "fixed", inset: 0, background: "transparent", paddingTop:"4.8rem", zIndex:"10" }}
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
  </div>) }





      <section style={{backgroundColor:"#F5F5F5"}}>
        <div style={{margin:"0 10px",display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <h1>Dashboard</h1>
          <CirclePlus onClick={() => setModalOpen(() => !modalOpen)} width={32} height={32}/>
        </div>
        <div className="dashboard-hero">
          <p>Good day, {username}</p>

        </div>
        <section>
          <TimeRegisterGraph/>
        </section>
      </section>


      <Footer />

    </>
  );
}
