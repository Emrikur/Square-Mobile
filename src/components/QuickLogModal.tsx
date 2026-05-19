import "../assets/styles/reportModal.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {CirclePlus} from "lucide-react"
import type { FormData } from "../lib/types";
export default function QuickLogModal() {


interface GraphType {
    id: string;
    name: string;
  }




  const {token} = useAuth()
const [dbResponse, setDbResponse] = useState<GraphType[]>([]);
// const [formData, setFormData] = useState<FormData[]>([]);
const [formResponse, setFormResponse] = useState<FormData | null>(null);

async function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){


  try {
    e.preventDefault();
    const form = e.currentTarget
    console.log("hours value ",form.hours.value)
    console.log("hourRate value ",form.hourRate.value)
    console.log("company value ",form.company.value)
    console.log("description value ",form.description.value)
    console.log("date value ",form.date.value)

      // console.log( form.username.value, form.password.value);
      const addEntry = await axios({
        method: "post",
        url: "http://localhost:5000/timeEntry/create",
        headers: { Authorization: `Bearer ${token}` },
        data: {

          id: form.company.value,
          date: form.date.value,
          hours: form.hours.value,
          hourRate:form.hourRate.value,
          description:form.description.value
        },
      });

      if (addEntry.data.success) {
        const response = addEntry.data;
        console.log("Response message ",response.message)
        setFormResponse(response)
        setTimeout(() => {
          setFormResponse(null)
        }, 3000);


        // console.log("The message: ",response.message)



      } else {
        const response = addEntry.data.data;
        console.log("Response message ",response.message)
        setFormResponse(response)
        setTimeout(() => {
          setFormResponse(null)
        }, 3000);
        // const response = addEntry.data;
        // setErr(response.message);
      }
    } catch (error) {
      console.error(error);
      // setErr("An error occurred during login");
    }

}


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
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <select style={{fontSize:"17px"}} className="modal-company-select" name="company">
          {dbResponse ? dbResponse.map((company) => <option value={company.id} key={company.id}>{company.name}</option>): null}
        </select>
        <input className="report-modal-input" name="date"  type="date" />
        <div className="report-modal-hours">
          <div className="hours">
            <label htmlFor="hours">Hours</label>
            <input style={{marginTop:"5px"}} name="hours" className="report-modal-input" type="text" /> {/* Hours */}
          </div>
          <div className="hour-rate">
            <label htmlFor="hourRate">Hour Rate</label>
            <input name="hourRate" className="report-modal-input" type="text" /> {/* Hourly rate */}
          </div>
        </div>
        <div style={{width:"100%"}}>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="modal-textarea"></textarea> {/* description */}
        </div>

        {formResponse ? <p className={formResponse.success ? "success-message" : "failed-message"}>{formResponse.message}</p> : <button className="default-Btn" type="submit"><CirclePlus/><p>Log hrs</p> </button>}

      </form>
    </>
  );
}
