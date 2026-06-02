//IsAdmin-Middleware checks if the user is an Admin.

import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
}
