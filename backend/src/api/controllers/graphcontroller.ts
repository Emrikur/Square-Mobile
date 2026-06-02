import { queryGraphData, queryTimesheetEntriesByMonth, queryTimesheetMonthByName } from "../../services/dbCalls";
import { Request, Response } from "express";



//##############################################################################


export async function getGraphsData(req: Request, res: Response) {
  const allowedFilter = ["week", "month", "year"];
  type Filter = "week" | "month" | "year";
  if (!allowedFilter.includes(req.params.filterCat)) {
    return res.status(401).send("Invalid Filter");
  }
  // console.log("FROM GRAPHCONTROLLER ",req.userId, " and ", req.params.filterCat)
  const userId = req.userId;
  const filter = req.params.filterCat as Filter;

  const data = await queryGraphData(userId, filter);

  // console.log("Here is data: ", data)
  res.json({ data });
}



//##############################################################################



export async function getGraphsWeekData(req: Request, res: Response) {
  const allowedFilter = ["week"];
  type Filter = "week";
  if (!allowedFilter.includes(req.params.filterCat)) {
    return res.status(401).send("Invalid Filter");
  }
  // console.log("FROM GRAPHCONTROLLER ",req.userId, " and ", req.params.filterCat)
  const userId = req.userId;
  const filter = req.params.filterCat as Filter;

  const data = await queryGraphData(userId, filter);

  // console.log("Here is data: ", data)
  res.json({ data });
}



//##############################################################################



export async function getAllTimeData(req: Request, res: Response) {

  const userId = req.userId;
  const filter = req.params.filterCategory;

  console.log("user Id from graphcontroller:", userId, "Filter category in graphcontroller: ", filter)

  const data = await queryTimesheetEntriesByMonth(userId, filter);

  console.log("Det gick bra: ", req.params.filterCategory)
  res.json({ data });
}



// Hämtar månader från entries med draft (För select-options)
export async function getdraftMonths(req: Request, res: Response) {

  const userId = req.userId;

  const data = await queryTimesheetMonthByName(userId);

  console.log("Here is data: ", data)
  res.json({ data });
}
