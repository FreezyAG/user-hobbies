import { IError } from "../lib/interfaces";

export const sendFailureResponse = (error: IError) => {
  if (!error.statusCode) error.statusCode = 500;
  throw error;
};

export const sendNotFoundResponse = (message: string) => {
  const error: IError = new Error(`${message}`);
  error.statusCode = 404;
  throw error;
};

export const sendSuccessResponse = (res, message: string, data: any = null) => {
  res.status(200).json({
    error: false,
    message,
    data,
  });
};
