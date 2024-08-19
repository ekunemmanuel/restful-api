import { Request, Response } from "express";
import User from "../models/user";

const createUser = (req: Request, res: Response) => {
  res.send("Create User");
};

const getUserById = (req: Request, res: Response) => {
  res.send(`Get User with ID ${req.params.id}`);
};

const getAllUsers = (req: Request, res: Response) => {
  res.send("User List");
};

export { createUser, getUserById, getAllUsers };
