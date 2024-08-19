import { Request, Response } from "express";

const createProduct = (req: Request, res: Response) => {
  res.send("Create User");
};

const getProductById = (req: Request, res: Response) => {
  res.send(`Get User with ID ${req.params.id}`);
};

const getAllProducts = (req: Request, res: Response) => {
  res.send("Product List");
};

export { createProduct, getProductById, getAllProducts };
