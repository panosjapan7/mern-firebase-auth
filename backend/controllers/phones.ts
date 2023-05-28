import express, { Router, Request, Response } from "express";
const Phone = require("../models/phone");
import { IPhone } from "../models/phone";

interface CustomRequest extends Request {
  currentUser?: any;
}

const phonesRouter: Router = Router();

phonesRouter.get("/", async (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    const phones = await Phone.find({});
    return res.json(phones.map((phone: IPhone) => phone.toJSON()));
  }
  return res.status(403).send("Not Authorized");
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
