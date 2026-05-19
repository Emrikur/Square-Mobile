import bcrypt from "bcryptjs";
import type { ChartData } from "chart.js";
import type { Filter } from "./types";

//! "###" marks the separation of functions.



interface GraphEntry{
company_name:string,
hours_worked:string,
work_date:string,
filter:string
}



//##############################################################################

//! Create Hash-function

export async function createHash(password: string) {
  if(password.length < 20){
    const newHash = await bcrypt.hash(`${password}`, 10);
    return newHash;
  }else{
    return "Password too long"
  }
}
export function formatEventDateTime(dateTime: string | Date) {
  const date = new Date(dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
  /* const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); */
  return `${dateStr}`;
}

export function formatWeekTime(dateTime: string | Date) {
  const date = new Date(dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${dateStr}`;
}
export function formatEventDateDayTime(dateTime: string | Date) {

  const date = new Date(dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return `${dateStr}`;
}



//##############################################################################

//! Format data for graph rendering

export function formatGraphData(responseData: GraphEntry[], filter:Filter): ChartData<"bar", (number | null)[], string> {

if (filter === "year") {
  const sortedData = [...responseData].sort(
    (a, b) => new Date(a.work_date).getTime() - new Date(b.work_date).getTime()
  );
  const months = [...new Set(sortedData.map((entry) =>
    new Date(entry.work_date).toLocaleString("en-US", { month: "long" })
  ))];


  return {
    labels: months,
    datasets: [{
      label: "Hours",
      data: months.map((month) =>
        responseData
          .filter((e) => new Date(e.work_date).toLocaleString("en-US", { month: "long" }) === month)
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



//##############################################################################

//! Format doughnut chart data

export function formatDoughnutData(responseData: GraphEntry[]): ChartData<"doughnut", (number | null)[], string> {

  try {
  const companyHours: { [key: string]: number } = {}; //Tomt objekt med nycklar som alltid är av typen sträng, värdet är alltid nummer

  responseData.forEach((entry) => {

    //If the company does NOT have a key in the object, then it creates one with 0 as value and adds the worked hours to that.
    if (!companyHours[entry.company_name]) {
      companyHours[entry.company_name] = 0;
    }
    companyHours[entry.company_name] += Number(entry.hours_worked);
  });

  const companies = Object.keys(companyHours);
  const hours = Object.values(companyHours);

  // Random colors for each company label
  const colors = companies.map(() =>
    `rgba(${Math.random() * 255}, ${Math.random() * 255}, 235, 0.5)`
  );

  return {
    labels: companies,
    datasets: [{
      data: hours,
      backgroundColor: colors,
      borderColor: colors.map(color => color.replace('0.7', '1')),
      borderWidth: 2,
    }],
  };}catch (error) {
    console.error("Error formatting doughnut data:", error);
    return {
      labels: [],
      datasets: [{
        data: []
      }]
    };
  }
}



//##############################################################################

//! Calculates week range for given date

export function weekRange(date: Date): string {
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(date.getDate() - date.getDay() + 1);
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 4);

  const firstDay = firstDayOfWeek.toLocaleDateString("en-US", { day: "numeric" });
  const lastDay = lastDayOfWeek.toLocaleDateString("en-US", { day: "numeric" });

  return `${firstDay} - ${lastDay}`;
}



//##############################################################################
