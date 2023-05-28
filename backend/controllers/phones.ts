import express, { Router, Request, Response } from "express";

interface CustomRequest extends Request {
  currentUser?: any;
}

const phonesRouter: Router = Router();

phonesRouter.get("/", (req: Request, res: Response) => {
  return res.send("Hi from within the phones router GET");
});

phonesRouter.post("/", (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    console.log("User Authenticated!", auth);
    return res.send("Hi from within the phones router POST");
  }
  return res.status(403).send("Not authorized");
});

export default phonesRouter;
