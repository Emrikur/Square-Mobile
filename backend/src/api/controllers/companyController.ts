import { fetchSpecificCompanyData } from "../../services/dbCalls";



//##############################################################################



import { Request, Response } from "express";

export async function getCompanies(req: Request, res: Response) {
  const data = await fetchSpecificCompanyData(req.params.id);

  res.json(data);
}



//##############################################################################
