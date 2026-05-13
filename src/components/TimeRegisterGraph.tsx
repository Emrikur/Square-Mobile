import { useEffect, useState } from "react";
import "../assets/styles/graphs.css";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { formatGraphData } from "../lib/functions";
import type { Filter } from "../lib/types";
import { Bar } from "react-chartjs-2";
import { formatEventDateTime } from "../lib/functions";
import { formatWeekTime } from "../lib/functions";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function TimeRegisterGraph() {
  interface GraphType {
    id: string;
    company_name: string;
    work_date: string;
    hours_worked: string;
    filter:Filter
  }

  const { token } = useAuth();
  const [filter, setGraphFilter] = useState<Filter>("week");
  // const [filterData, setFilterData] = useState<Array<string>>([])
  const [responseData, setResponseData] = useState<GraphType[]>([]);
  const [currentWeek, setCurrentWeek] = useState<GraphType[]>([])

  useEffect(() => {
    async function getGraph() {
      const checkGraph = await axios({
        method: "get",
        url: `http://localhost:5000/dashboard/graph/${filter}`,
        headers: { Authorization: `Bearer ${token}` },
        data: { filterData: filter },
      });

      // console.log("THE RESPONSE.JSON: ", checkGraph.data);

      //  setFilterData(checkGraph.data.response)
      const response = checkGraph.data.data;
      // console.log("This is the respons in modal", response)
      setResponseData(response);
    }
    // console.log(token, email)
    // console.log(filter)

    getGraph();
  }, [filter]);

  useEffect(() => {
  async function fetchWeekTotal() {
    const response = await axios({
      method: "get",
      url: `http://localhost:5000/dashboard/graph/week`,
      headers: { Authorization: `Bearer ${token}` }
    });


    setCurrentWeek(response.data.data);
  }

  fetchWeekTotal();
}, []);

const sortedData = [...responseData].sort(
    (a, b) => new Date(a.work_date).getTime() - new Date(b.work_date).getTime()
  );

const currentHours = currentWeek.reduce((sum, entry) => sum + Number(entry.hours_worked), 0)
const weekTarget = 40;
const currentDate = Date()
const circumference = 2 * Math.PI * 60
const percentage = Math.min(currentHours / weekTarget, 1)
const offset = circumference * (1 - percentage)
const excessHours = (currentHours - weekTarget) * 1.5
console.log(`Current flex: ${excessHours}hrs`,)
  return (
    <>
      <div className="graph-section-wrapper">
        <div className="week-hour-summary" >

          <div className="week-summary-data">
          <h4 style={{margin:"0", fontWeight:"500"}}>This week</h4>
          <p>{formatWeekTime(currentDate)}</p>

          {currentHours ?<p className="week-sum">{currentHours} <span style={{fontWeight:"500", fontSize:"16px"}}>hrs</span></p>  :null }
          <p>out of 40 hrs</p>
          </div>
          <div className="week-summary-chart">
            <svg width="125" height="125" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#477beb" strokeWidth="16" opacity=".9" />
              <circle cx="80" cy="80" r="60" fill="none" stroke={currentHours >= weekTarget ? "#34B567" : "#e5e7eb"} strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 80 80)"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
              <text x="80" y="86" textAnchor="middle" fontSize="22" fontWeight="500" fill="currentColor">
                {Math.round(percentage * 100)}%
              </text>
            </svg>
          </div>
        </div>

        <p className="reg-hour-title">Registered Hours</p>
        <div className="timegraph-wrapper">
          <p
            className={
              filter === "week"
                ? "graph-week-selected"
                : "graph-week-unselected"
            }
            onClick={() => setGraphFilter("week")}
          >
            Week
          </p>
          <p
            className={
              filter === "month"
                ? "graph-month-selected"
                : "graph-month-unselected"
            }
            onClick={() => setGraphFilter("month")}
          >
            Month
          </p>
          <p
            className={
              filter === "year"
                ? "graph-year-selected"
                : "graph-year-unselected"
            }
            onClick={() => setGraphFilter("year")}
          >
            Year
          </p>
        </div>
        {/* Graphs */}
        <div>
          {responseData && responseData.length > 0 ? (
            <div>
              <div>
                <Bar style={{width:"90vw", height:"auto"}} data={formatGraphData(responseData, filter)} />
              </div>
              <div className="graph-table-container">
                <table
                className="graph_data"
                >
                  <thead>
                    <tr className="graph-data-headers">
                      <th>Date</th>
                      <th>Company</th>
                      <th>hours</th>
                    </tr>
                  </thead>


                  <tbody>
                    {responseData && sortedData.map((p) => (
                      <tr key={p.id}
                      >

                        <td>{formatEventDateTime(p.work_date)}</td>
                        <td>{p.company_name}</td>
                        <td>{p.hours_worked}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          ) : (

              <p className="missing-graph-data">No hours logged at these dates, report at <a href="/time-report">Time-report</a></p>


          )}
        </div>
      </div>
    </>
  );
}
