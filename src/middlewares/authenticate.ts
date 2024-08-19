import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserRequest } from "../types";

// Middleware to authenticate JWT token
const authenticate = (req: IUserRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(401); // Unauthorized
  if (!process.env.JWT_SECRET) {
    return res.status(500).send("JWT secret is not defined");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user as JwtPayload;

    next();
  });
};

export default authenticate;
