import express, { Router, Request, Response } from "express";
const User = require("../models/UserModel");
import { IUser } from "../models/UserModel";
import admin from "firebase-admin";

interface CustomRequest extends Request {
  currentUser?: admin.auth.DecodedIdToken;
}

const usersRouter: Router = Router();

usersRouter.get("/", async (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    const users = await User.find({});
    return res.json(users.map((user: IUser) => user.toJSON()));
  }
  return res.status(403).send("Not Authorized");
});

usersRouter.get("/:uid", async (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    const uid = req.params.uid;

    try {
      const user = await User.findOne({ uid });
      if (user) {
        return res.json(user.toJSON());
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log("Error retrieving user from /:uid:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(403).send("Not Authorized");
});

usersRouter.post("/", (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    const user = new User(req.body);
    const savedUser = user.save();
    console.log("User Authenticated");
    return res.status(201).json(savedUser);
  }
  return res.status(403).send("Not Authorized");
});

export default usersRouter;
