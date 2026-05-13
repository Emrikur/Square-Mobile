import { fetchCompanyData } from "../../services/dbCalls";
import { Request, Response } from "express";


export async function getCompanies(req:Request, res:Response){
const data = await fetchCompanyData()

// console.log("Here is data: ", data)
res.json(data)
}
