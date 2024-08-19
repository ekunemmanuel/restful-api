import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";

// Custom error class for application errors
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handlers for specific MongoDB errors
const handleCastErrorDB = (err: any) => new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
const handleDuplicateFieldsDB = (err: any) => new AppError(`Duplicate field value: ${err.keyValue.name}. Please use another value!`, 400);
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

// Development error response
const sendErrorDev = (err: AppError | MongoError, res: Response) => {
  res.status((err as AppError).statusCode || 500).json({
    status: (err as AppError).status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Production error response
const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// Main error handling middleware
const errorHandler = (
  err: AppError | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    if (process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);
    } else {
      sendErrorProd(err, res);
    }
  } else {
    let error = { ...err } as any;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    if (process.env.NODE_ENV === "development") {
      sendErrorDev(error, res);
    } else {
      sendErrorProd(error, res);
    }
  }
};

export { AppError, errorHandler };
