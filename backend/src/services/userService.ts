import db from "../db"
import {QueryResult} from "pg"
export async function getUserId(token:string): Promise<QueryResult>{


  return await db.query("SELECT * FROM users WHERE token = ?", [token])
}
