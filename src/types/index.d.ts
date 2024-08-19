import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface IUserRequest extends Request {
  user?: JwtPayload & { role?: string };
}
