import { Request, Response, NextFunction } from "express";

// Middleware to log requests and responses
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`
    );
  });

  next();
};

export default loggerMiddleware;
