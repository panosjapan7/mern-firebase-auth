import express, { Router, Request, Response } from "express";
import admin from "firebase-admin";
const Phone = require("../models/phone");
import { IPhone } from "../models/phone";

interface CustomRequest extends Request {
  currentUser?: admin.auth.DecodedIdToken;
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

phonesRouter.get("/:uid", async (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    const uid = req.params.uid;

    try {
      const entries = await Phone.find({ uid: uid });
      return res.json(entries.map((phone: IPhone) => phone.toJSON()));
    } catch (error) {
      console.log("Error retrieving user from /phones/:uid:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
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
