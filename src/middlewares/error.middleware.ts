import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";

export class ServerError extends Error {
  status: number;
  message: string;
  errors: ValidationError[];
  constructor(
    message: string = "",
    status: number,
    errors: ValidationError[] = []
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

function errorMiddleware(
  error: ServerError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const {
    errors,
    status: statusCode = 500,
    message = "Something went wrong",
  } = error;

  if (error.errors && error.errors.length > 0) {
    return response.status(error.status).send({
      statusCode: error.status,
      message: error.message,
      errors,
    });
  }

  response.status(statusCode).send({
    statusCode,
    message,
  });
}

export default errorMiddleware;
