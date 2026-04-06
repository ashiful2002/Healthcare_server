import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSource } from "../../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";

export const globalErrorHandller = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from global Error Handler", err);
  }

  let errorSources: TErrorSource[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "internal server error";

  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message: message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? err : "undefined",
  };

  res.status(statusCode).json(errorResponse);
};
