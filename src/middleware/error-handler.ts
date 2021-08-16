import { Request, Response, NextFunction } from "express";

import { Modify } from "../lib/interfaces";

const ErrorHandler = (
  error: Modify<
    Error,
    { data?: string | undefined; statusCode?: string | undefined }
  >,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;

  if (!res.headersSent) {
    res.status(status).json({
      error: true,
      statusCode: status,
      message: status === 500 ? "Internal server error" : message,
      data,
    });
  }
};

export default ErrorHandler;
