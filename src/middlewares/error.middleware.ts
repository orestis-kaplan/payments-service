import { NextFunction, Request, Response } from "express";

export class ServerError extends Error {
  status: number;
  message: string;
  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

function errorMiddleware(
  error: ServerError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.status || 500;
  const message = error.message || "Something went wrong";
  console.log(error);
  response.status(statusCode).send({
    statusCode,
    message,
  });
}

export default errorMiddleware;
