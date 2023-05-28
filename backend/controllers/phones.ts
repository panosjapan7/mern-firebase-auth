import express, { Router, Request, Response } from "express";
const Phone = require("../models/phone");

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
    const phone = new Phone(req.body);
    const savedPhone = phone.save();
    console.log("User Authenticated!", auth);
    return res.status(201).json(savedPhone);
  }
  return res.status(403).send("Not authorized");
});

export default phonesRouter;
