import "../assets/styles/reportModal.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {CirclePlus} from "lucide-react"

export default function QuickLogModal() {
interface GraphType {
    id: string;
    name: string;
  }
  const {token} = useAuth()
const [dbResponse, setDbResponse] = useState<GraphType[]>([]);

  useEffect(() => {
    async function fetchCompanies() {
      const checkCompanies = await axios({
        method: "get",
        url: `http://localhost:5000/modal/companies`,
        headers: { Authorization: `Bearer ${token}` }
      });

      // console.log("THE RESPONSE.JSON: ", checkGraph.data);

      //  setFilterData(checkGraph.data.response)

      const response = checkCompanies.data;
      setDbResponse(response);
    }
    // console.log(token, email)

    fetchCompanies();
  }, []);


  return (
    <>
      <form className="modal-form" action="">
        <select className="modal-company-select" name="" id="">
          {dbResponse ? dbResponse.map((company) => <option key={company.id}>{company.name}</option>): null}
        </select>
        <input className="report-modal-input"  type="date" />
        <div className="report-modal-hours">
          <div className="hours">
            <label htmlFor="hours">Hours</label>
            <input style={{marginTop:"5px"}} name="hours" className="report-modal-input" type="text" /> {/* Hours */}
          </div>
          <div className="hour-rate">
            <label style={{marginRight:"2.5rem"}} htmlFor="hourRate">Hour Rate</label>
            <input style={{marginTop:"5px"}} name="hourRate" className="report-modal-input" type="text" /> {/* Hourly rate */}
          </div>
        </div>
        <div style={{width:"80%"}}>
          <label style={{marginRight:"auto"}} htmlFor="description">Description (Optional)</label>
          <textarea name="description" id="modal-textarea"></textarea> {/* description */}
        </div>
        <button className="default-Btn" type="submit"><CirclePlus/><p>Log hrs</p> </button>
      </form>
    </>
  );
}
