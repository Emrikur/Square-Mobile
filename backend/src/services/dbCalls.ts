import pool from "../db";
import type { FormData } from "../../types/types";


//##############################################################################



export async function fetchGraphData(userId: string, filter: string) {
  const response = await pool.query(
    `SELECT time_entries.*, companies.name AS company_name
    FROM time_entries
    JOIN companies ON time_entries.company_id = companies.id
    WHERE time_entries.user_id = $1
    AND time_entries.work_date >= CASE $2
    WHEN 'week'  THEN DATE_TRUNC('week', NOW() AT TIME ZONE 'Europe/Stockholm')
    WHEN 'month' THEN DATE_TRUNC('month', NOW() AT TIME ZONE 'Europe/Stockholm')
    WHEN 'year'  THEN DATE_TRUNC('year', NOW() AT TIME ZONE 'Europe/Stockholm')
    END`,
    [userId, filter],
  );

  // console.log(response.rows)
  return response.rows;
}


//##############################################################################



export async function fetchCompanyData() {
  const response = await pool.query(`SELECT name, id FROM companies`);
  // console.log("RESPONSE ROWS: ",response.rows)
  return response.rows;
}



//##############################################################################



export async function fetchSpecificCompanyData(companyId: string) {
  console.log("REQUEST ID IN DBCALLS: ",companyId)
  try {
    const response = await pool.query(`SELECT * FROM companies WHERE id = $1`, [companyId]);
    console.log("RESPONSE ROWS: ",response.rows)
    return response.rows;
  } catch (error) {
    console.error("Error fetching specific company data: ", error);
    throw error;
  }
}



//##############################################################################



export async function addNewEntry(userId: string, formData: FormData) {
  console.log("User id: ", userId);
  console.log("Form data: ", formData);

  const response = await pool.query(
    `INSERT INTO time_entries (user_id, company_id, work_date, hours_worked, hourly_rate, description) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      userId,
      formData.id,
      formData.date,
      formData.hours,
      formData.hourRate,
      formData.description,
    ],
  );
  // console.log("RESPONSE ROWS: ", response.rows);

  return { success: true, message: "entry created" };
}



//##############################################################################
