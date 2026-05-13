import bcrypt from "bcryptjs";
import type { ChartData } from "chart.js";
import type { Filter } from "./types";


interface GraphEntry{
company_name:string,
hours_worked:string,
work_date:string,
filter:string
}

export async function createHash(password: string) {
  if(password.length < 20){
    const newHash = await bcrypt.hash(`${password}`, 10);
    return newHash;
  }else{
    return "Password too long"
  }
}
export function formatEventDateTime(dateTime:string) {
  const date = new Date(dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${dateStr}`;
}

export function formatWeekTime(dateTime:string) {
  const date = new Date(dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${dateStr}`;
}
export function formatEventDateDayTime(dateTime:string) {
  const date = new Date(dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return `${dateStr}`;
}







export function formatGraphData(responseData: GraphEntry[], filter:Filter): ChartData<"bar", (number | null)[], string> {

if (filter === "year") {
  const sortedData = [...responseData].sort(
    (a, b) => new Date(a.work_date).getTime() - new Date(b.work_date).getTime()
  );
  const months = [...new Set(sortedData.map((entry) =>
    new Date(entry.work_date).toLocaleString("default", { month: "long" })
  ))];


  return {
    labels: months,
    datasets: [{
      label: "Hours",
      data: months.map((month) =>
        responseData
          .filter((e) => new Date(e.work_date).toLocaleString("default", { month: "long" }) === month)
          .reduce((sum, e) => sum + Number(e.hours_worked), 0)
      ),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    }],
  };
}

const companies = [...new Set(responseData.reverse().map((company) => company.company_name))]

const dates = [...new Set(responseData.map((entry) => entry.work_date))].sort((a,b) => new Date(a).getTime() - new Date(b).getTime())

  const formattedDates = dates.map((date) =>
    filter === "week" ? formatEventDateDayTime(date):
    formatEventDateTime(date))

  const datasets = companies.map((company) => {
    const companyHours = dates.map((date) => {
      const dateEntry = responseData.find((e) => e.company_name === company && e.work_date === date)
      return dateEntry ? Number(dateEntry.hours_worked) : null
    })
    return {
      label:company,
      data:companyHours,
      backgroundColor:`rgba(${Math.random() * 255}, ${Math.random() * 255}, 235, 0.5)`,
      skipNull: true,
    }

  });

  return {
    labels: formattedDates,
    datasets,
  };

}
