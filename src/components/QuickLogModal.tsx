import "../assets/styles/reportModal.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {CirclePlus, ClockPlus} from "lucide-react"
import type { FormData } from "../lib/types";
import { toast } from 'react-toastify';

const boostingPhrase = [  "Great work today!",
  "Every hour counts!",
  "You're crushing it!",
  "Keep it up!",
  "Another day, another win!",
  "You're on fire!",
  "Hard work pays off!",
  "You got this!",
  "Making moves!",
  "Stay focused!",
  "One step at a time!",
  "Progress is progress!",
  "You're unstoppable!",
  "Keep grinding!",
  "Almost there!",
  "Doing great!",
  "Every minute matters!",
  "You're a star!",
  "Keep pushing!",
  "Consistency is key!",
  "You make it look easy!",
  "Another day done right!",
  "Champion mindset!",
  "Proud of your effort!"]
const pepTalk =boostingPhrase[Math.floor(Math.random() * boostingPhrase.length)];


export default function QuickLogModal() {


  interface GraphType {
    id: string;
    name: string;
    is_active: boolean;
  }




  const {token} = useAuth()
  const [dbResponse, setDbResponse] = useState<GraphType[]>([]);
  // const [formData, setFormData] = useState<FormData[]>([]);
  const [formResponse, setFormResponse] = useState<FormData | null>(null);
  const [wordCounter, setWordCounter] = useState<number>(0);






async function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){


  try {
    e.preventDefault();

    const form = e.currentTarget

    if(form.description.value.length > 150){
      toast.error("Description can't exceed 150 characters")
      return
    }



    // console.log("hours value ",form.hours.value)
    // console.log("company value ",form.company.value)
    // console.log("description value ",form.description.value)
    // console.log("date value ",form.date.value)

    if(!form.hours.value ||!form.company.value || !form.description.value || !form.date.value){

      toast.error("Missing credentials")
    }else{


      if(Number(form.hours.value) > 24){
        toast.error("Hours can't exceed the amount of hours in a day")
      }else{


        if(Number(form.hours.value) === 24){
        toast.info("Tip: You should consider changing your working schedule")
      }
 // console.log( form.username.value, form.password.value, form.hours.value, form.description.value);

      const addEntry = await toast.promise( axios({
        method: "post",
        url: "http://localhost:5000/timeEntry/create",
        headers: { Authorization: `Bearer ${token}` },
        data: {

          id: form.company.value,
          date: form.date.value,
          hours: form.hours.value,
          description:form.description.value
        },
      }), {
        pending:"Saving entry...",
        success:"Entry Saved!",
        error:"Something went wrong"
      },
    {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
    })

      if (addEntry.data.success === true) {
        const response = addEntry.data;
        // console.log("Response message ",response.message)
        setFormResponse(response)

        setTimeout(() => {
          setFormResponse(null)
        }, 3000);

        form.reset();
        setWordCounter(0)
        // console.log("The message: ",response.message)



      } else {
        const response = addEntry.data;
        // console.log("Response message ",response.message)
        setFormResponse(response)
        toast(response.message)
        setTimeout(() => {
          setFormResponse(null)
        }, 3000);
      }
      }
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

      // console.log("THE RESPONSE.JSON: ", checkCompanies.data);

      //  setFilterData(checkGraph.data.response)

      const response = checkCompanies.data;



      // console.log("response: ", response);
      setDbResponse(response);
    }
    // console.log(token, email)

    fetchCompanies();
    // console.log("DB response: ", dbResponse)
  }, []);



  return (
    <>
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <select className="modal-company-select" name="company">
          {/* Company with a inactive status is not shown in the company list */}
          {dbResponse ? dbResponse.filter((company) => company.is_active).map((company) => <option className="form-option" value={company.id} key={company.id}>{company.name}</option>): null}
        </select>

          <input onClick={(e) => e.currentTarget.showPicker()} className="input-date" name="date"  type="date" />

          <p className="peptalk">*{pepTalk}*</p>
          <div className="hours">
            <input name="hours" placeholder="Hours" className="hours-input" type="text" />
            <ClockPlus className="hours-icon" size={20}/>
          </div>


        <div className="description-wrapper">
          <label htmlFor="description">Description</label>
          <textarea onChange={(e) => setWordCounter(e.currentTarget.value.length)} name="description" id="textarea"/>
          <p className={wordCounter > 150 ? "word-count-exceeded" : "word-count"}>{wordCounter}/150</p>
        </div>

        {formResponse ? <p className={formResponse.success ? "success-message" : "failed-message"}>{formResponse.message}</p> : <button className="entry-submit-btn" style={{marginTop:"1rem"}} type="submit"><CirclePlus/><p>Log hrs</p> </button>}

      </form>
    </>
  );
}
