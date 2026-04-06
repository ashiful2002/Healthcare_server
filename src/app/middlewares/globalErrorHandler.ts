import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
export const globalErrorHandller = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from global Error Handler", err);
  }

  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "internal server error";

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err.message,
  });
};
