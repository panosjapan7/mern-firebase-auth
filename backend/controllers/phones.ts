import express, { Router, Request, Response } from "express";

const phonesRouter: Router = Router();

phonesRouter.get("/", (req: Request, res: Response) => {
  return res.send("Hi from within the phones router GET");
});

phonesRouter.post("/", (req: Request, res: Response) => {
  return res.send("Hi from within the phones router POST");
});

export default phonesRouter;
