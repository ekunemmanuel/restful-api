import { Request, Response, NextFunction } from "express";
import { IUserRequest } from "../types";

// Middleware to check user roles
const checkRole = (roles: string[]) => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.sendStatus(401); // Unauthorized
    }

    const userRole = req.user.role;
    if (!userRole) {
      return res.sendStatus(403); // Forbidden
    }

    if (roles.includes(userRole)) {
      next();
    } else {
      res.sendStatus(403); // Forbidden
    }
  };
};

export default checkRole;
