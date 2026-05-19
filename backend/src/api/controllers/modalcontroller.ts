import { fetchCompanyData } from "../../services/dbCalls";
import { addNewEntry } from "../../services/dbCalls";
import { Request, Response } from "express";



//##############################################################################



export async function getCompanies(req:Request, res:Response){
const data = await fetchCompanyData()

// console.log("Here is data: ", data)
res.json(data)
}
export async function addEntry(req:Request, res:Response){
  console.log("REQ BODY: ",req.body)
  const userId = req.userId
const data = await addNewEntry(userId, req.body)

// console.log("Here is data: ", data)
res.json(data)
}



//##############################################################################
