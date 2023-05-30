"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User = require("../models/UserModel");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        const users = yield User.find({});
        return res.json(users.map((user) => user.toJSON()));
    }
    return res.status(403).send("Not Authorized");
}));
usersRouter.get("/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        const uid = req.params.uid;
        try {
            const user = yield User.findOne({ uid });
            if (user) {
                return res.json(user.toJSON());
            }
            else {
                return res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            console.log("Error retrieving user from /:uid:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    return res.status(403).send("Not Authorized");
}));
usersRouter.post("/", (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        const user = new User(req.body);
        const savedUser = user.save();
        console.log("User Authenticated");
        return res.status(201).json(savedUser);
    }
    return res.status(403).send("Not Authorized");
});
exports.default = usersRouter;
