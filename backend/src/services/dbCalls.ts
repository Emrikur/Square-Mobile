import pool from "../db"


export async function fetchGraphData(userId:string, filter:string){

  const response = await pool.query(`SELECT time_entries.*, companies.name AS company_name
    FROM time_entries
    JOIN companies ON time_entries.company_id = companies.id
    WHERE time_entries.user_id = $1
    AND time_entries.work_date >= CASE $2
    WHEN 'week'  THEN DATE_TRUNC('week', NOW() AT TIME ZONE 'Europe/Stockholm')
    WHEN 'month' THEN DATE_TRUNC('month', NOW() AT TIME ZONE 'Europe/Stockholm')
    WHEN 'year'  THEN DATE_TRUNC('year', NOW() AT TIME ZONE 'Europe/Stockholm')
    END`
     ,[userId, filter])


console.log(response.rows)
  return response.rows;

}


export async function fetchCompanyData(){

  const response = await pool.query(`SELECT name, id FROM companies`)
  // console.log("RESPONSE ROWS: ",response.rows)
  return response.rows;

}
