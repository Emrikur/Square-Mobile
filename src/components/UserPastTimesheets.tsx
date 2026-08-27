import { useEffect, useState } from "react"
import "../assets/styles/UserPastTimesheets.css"
import {fetchTimesheets, formatEventDateTime} from "../lib/functions"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import type { /* EntryTypes, MonthTypes,  */TimesheetTypes } from "../lib/types";

export default function UserPastTimesheets(){
const {token, email} = useAuth()
const isGuest = email === "guest@ts.com"
const [refresh, setRefresh] = useState(false)
const navigate = useNavigate()
const [timesheets, setTimesheets] = useState<TimesheetTypes[]>([]);
const [filterToggle,setFilterToggle] = useState("")

const array = [{id:1, name:"Olof", email:"Olof.cool@iths.se"},{id:2, name:"Fritjof", email:"Fritjof.cool@iths.se"}]
function test(){
  console.log(filterToggle)
}
  useEffect(() => {
if(!token){
  navigate("/")
  return;
}
    fetchTimesheets(token).then((res) => {
      setTimesheets(res)
    })


  },[refresh,token])
  return (
  <>
<div >{/* Modal */}</div>
<div className="timesheet-container">
<h2>Timesheets overview</h2>
<div>
  <div className="filterToggles" ><div onClick={() => setFilterToggle("")}>All</div><div onClick={() => setFilterToggle("approved")}>Approved</div><div onClick={() => setFilterToggle("pending")}>Pending</div><div onClick={() => setFilterToggle("rejected")}>Rejected</div></div>
  <div className="timesheet-card-labels" ><p id="month">Month</p><p id="status">Status</p><p id="sub-at">Submitted at</p></div>
  <div className="timesheet-wrapper">
    {timesheets.filter((f) => !filterToggle || f.status === filterToggle).map((e) =>
  <div className="timesheet-card" key={e.id}>
    <p>{formatEventDateTime(e.month, {year:"numeric", month:"long"})}</p>
    <p className={e.status === "pending"
                            ? "timesheet-status-pending"
                            : e.status === "approved"
                              ? "timesheet-status-approved"
                              : "timesheet-status-rejected"
                        }>{e.status}</p>
    <p>{formatEventDateTime(e.submitted_at, {month:"2-digit", day:"2-digit", year:"numeric"})}</p>
  </div>

  )}
  </div>

</div>
</div>

  </>
  )
}
