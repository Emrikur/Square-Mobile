import LayoutWrapper from "../components/LayoutWrapper";
import "../assets/styles/timesheet.css";
import { CalendarRange, Clock, ListFilter, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  formatEventDateTime,
  deleteEntry,
  signoffTimesheet,
  fetchTimesheets,
  getdraftMonthNames
} from "../lib/functions";
import type { EntryTypes, MonthTypes, TimesheetTypes } from "../lib/types";
import { toast } from "react-toastify";

export default function Timesheets() {
  const { token, email } = useAuth();
  const isGuest = email === "guest@ts.com";
  const navigate = useNavigate();
  const [months, setMonths] = useState<MonthTypes[]>([]);
  const [entries, setEntries] = useState<EntryTypes[]>([]);
  const [selectedOption, setSelectedOptions] = useState<string>("");
  const [companyFilter, setCompanyFilter] = useState<string>("");
  const hourSummary = entries.reduce(
    (sum, entry) => sum + Number(entry.hours_worked),
    0,
  );
  const totalMileage = entries.reduce(
    (sum, entry) => sum + Number(entry.mileage || 0),
    0,
  );
  const totalExpenses = entries.reduce(
    (sum, entry) => sum + Number(entry.expense || 0),
    0,
  );
  const [timesheets, setTimesheets] = useState<TimesheetTypes[]>([]);
  const [refresh, setRefresh] = useState(false);
  const uniqueCompanyNameList = [
    ...new Set(entries.map((entry) => entry.company_name)),
  ];
  const companyColors = [
    "#2563EB",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#06B6D4",
    "#84CC16",
    "#6366F1",
    "#F43F5E",
    "#0EA5E9",
    "#A855F7",
    "#22C55E",
    "#EAB308",
    "#3B82F6",
    "#EC4899",
    "#10B981",
    "#F97316",
    "#8B5CF6",
    "#06B6D4",
    "#EF4444",
    "#84CC16",
    "#6366F1",
    "#0EA5E9",
    "#A855F7",
    "#22C55E",
    "#F59E0B",
    "#2563EB",
  ];


  // console.log(totalMileage)

  async function handleDeleteEntry(e: Array<string>) {
    const entryID = e[0];

    const confirmDeletion = window.confirm(
      `Are you sure you want to delete entry: \nname: ${e[1]} \ndate: ${formatEventDateTime(
        e[2],
        {
          year: "numeric",
          day: "numeric",
          month: "long",
        },
      )}`,
    );

    if (!confirmDeletion) {
      return;
    } else {
      if(!token){
        navigate("/")
        return;
      }

        await deleteEntry(entryID, token).then((response) => {
          toast.success(response.message);
        });

    }
  }

  async function handleSignoff() {
    await signoffTimesheet(selectedOption, token).then((response) => {
      toast.success(response.message);
      return;
    });
  }

  function handleRefresh() {
    setRefresh(!refresh);
  }

  useEffect(() => {

    if(!token){
      navigate("/")
      return;
    }
    getdraftMonthNames(token).then((response) => {
      setMonths(response);
      if (response.length > 0) {
        setSelectedOptions(response[0].month);
      }
    });


    fetchTimesheets(token).then((response) => {
      setTimesheets(response);
    });

    if (!selectedOption) {
      return;
    }

    async function getEntries() {
      const getEntries = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}/dashboard/allTime/${selectedOption}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      if(!token){
        navigate("/")
        return;
      }

      const response = getEntries.data.data;

      setEntries(response);
    }

    getEntries();
  }, [selectedOption, refresh, token]);

  return (
    <LayoutWrapper>
      <section className="timesheets-wrapper">
        <div className="timesheets-title-wrapper">
          <h1 className="timesheets-title">Timesheets</h1>
          <CalendarRange className="timesheets-calendar-icon" />
        </div>
        <select
          className="month-select"
          onChange={(e) => setSelectedOptions(e.target.value)}
        >
          {months.map((entry: { month: string }) => (
            <option key={entry.month} value={entry.month}>
              {formatEventDateTime(entry.month, {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>

        {/* Time summary section */}
        <div className="timesheets-summary-signoff-wrapper">
          <div className="timesheets-summary-wrapper">
            <div className="timesheets-summary-hours-wrapper">
              <p>Total Hours This Month</p>
              <h2 className="timesheets-summary-hours">{hourSummary} hrs</h2>
              <p>Across {entries.length} entries</p>
              {entries.length > 0 && <p>Mileage: {totalMileage} km</p>}
              {entries.length > 0 && <p>Expenses: {totalExpenses} SEK</p>}
            </div>
            <Clock className="summary-clock" />
          </div>
          <button
            disabled={entries.length < 1 || isGuest}
            className="timesheets-signoff-button"
            style={{
              backgroundColor:
                entries.length < 1 || isGuest ? "rgb(161, 161, 161)" : "#ffffff",
              color: entries.length < 1 || isGuest ? "#000c4b" : "#2f4ce5",
            }}
            onClick={async () => {
              await handleSignoff();
              handleRefresh();
            }}
          >
            Sign Off
          </button>
        </div>
        {/* Time entry section */}
        <section className="time-entry-section">
          <div className="timeentry-title-wrapper">
            <h3>Time Entries</h3>{" "}
            <div
              style={{
                color: "#1A5AF4",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              {months.length > 0 ? (
                <div
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <ListFilter size={30} />
                  <select
                    name="company-select"
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                    }}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                  >
                    <option value="">All companies</option>
                    {uniqueCompanyNameList.map((entry) => (
                      <option key={entry} value={entry}>
                        {entry}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
          {months && entries && companyFilter ? (
            entries.filter(
              (name) =>
                companyFilter === "" || name.company_name === companyFilter,
            ).length < 1 ? (
              <p>No logged entries</p>
            ) : (
              entries
                .filter(
                  (name) =>
                    companyFilter === "" || name.company_name === companyFilter,
                )
                .reverse()
                .map((entry, index) => (
                  <div key={entry.id} className="entry-draft-card">
                    <div
                      style={{
                        backgroundColor:
                          companyColors[index % companyColors.length],
                      }}
                      className="draft-card-one"
                    >
                      <Building2 className="draft-building-icon" />
                    </div>
                    <div className="draft-card-two">
                      <h4>{entry.company_name}</h4>
                      <p>
                        {entry.hours_worked}{" "}
                        <span style={{ fontWeight: "300" }}>hrs</span>
                      </p>
                    </div>
                    <div className="draft-card-three">
                      <p style={{ textWrap: "nowrap" }}>
                        {formatEventDateTime(entry.work_date, {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <div className="status-container">
                        <p>{entry.status.replace("d", "D")}</p>
                      </div>
                      <button
                      disabled={isGuest}
                        onClick={async () => {
                          await handleDeleteEntry([
                            entry.id,
                            entry.company_name,
                            entry.work_date,
                          ]);
                          handleRefresh();
                        }}
                        className="delete-entry"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))
            )
          ) : (
            entries.map((entry, index) => (
              <div key={entry.id} className="entry-draft-card">
                <div
                  style={{
                    backgroundColor:
                      companyColors[index % companyColors.length],
                  }}
                  className="draft-card-one"
                >
                  <Building2 className="draft-building-icon" />
                </div>
                <div className="draft-card-two">
                  <h4>{entry.company_name}</h4>
                  <p>
                    {entry.hours_worked}{" "}
                    <span style={{ fontWeight: "300" }}>hrs</span>
                  </p>
                </div>
                <div className="draft-card-three">
                  <p style={{ textWrap: "nowrap" }}>
                    {formatEventDateTime(entry.work_date, {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <div className="status-container">
                    <p>{entry.status.replace("d", "D")}</p>
                  </div>
                  <button
                  disabled={isGuest}
                    onClick={async () => {
                      await handleDeleteEntry([
                        entry.id,
                        entry.company_name,
                        entry.work_date,
                      ]);
                      handleRefresh();
                    }}
                    className="delete-entry"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="latest-timesheets-wrapper">
            <div className="latest-timesheets-title-box">
              <p className="latest-timesheets-title">Submitted Timesheets</p>
              <p
                onClick={() => navigate("/history")}
                className="latest-timesheets-link"
              >
                To overview
              </p>
            </div>
            <div className="timesheet-render-summary">
              {timesheets && timesheets.length > 0 ? (
                timesheets.slice(-3).map((entry) => (
                  <div key={entry.id} className="timesheet-render-list">
                    <div className="timesheet-date">
                      <p>Date:</p>
                      <p>
                        {formatEventDateTime(entry.month, {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="timesheet-status">
                      <p>Status:</p>
                      <p
                        className={
                          entry.status === "pending"
                            ? "timesheet-status-pending"
                            : entry.status === "approved"
                              ? "timesheet-status-approved"
                              : "timesheet-status-rejected"
                        }
                      >
                        {entry.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "gray", marginLeft: "10px" }}>
                  No submitted timesheets
                </p>
              )}
            </div>
          </div>
        </section>
      </section>
    </LayoutWrapper>
  );
}
