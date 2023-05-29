import express, { Router, Request, Response } from "express";
const User = require("../models/UserModel");
import { IUser } from "../models/UserModel";

interface CustomRequest extends Request {
  currentUser?: any;
}

const usersRouter: Router = Router();

usersRouter.get("/", async (req: CustomRequest, res: Response) => {
  const auth = req.currentUser;
  if (auth) {
    const users = await User.find({});
    return res.json(users.map((user: IUser) => user.toJSON()));
  }
  return res.status(403).send("Not Authorized");
  {
  }
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
