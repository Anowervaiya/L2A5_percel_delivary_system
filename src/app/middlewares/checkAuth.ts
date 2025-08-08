import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(403, 'No Token Recieved')
    }

    


  } catch (error) {
    next(error)
  }
  
}