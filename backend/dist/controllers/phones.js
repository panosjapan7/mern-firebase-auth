"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Phone = require("../models/phone");
const phonesRouter = (0, express_1.Router)();
phonesRouter.get("/", (req, res) => {
    return res.send("Hi from within the phones router GET");
});
phonesRouter.post("/", (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        const phone = new Phone(req.body);
        const savedPhone = phone.save();
        console.log("User Authenticated!", auth);
        return res.status(201).json(savedPhone);
    }
    return res.status(403).send("Not authorized");
});
exports.default = phonesRouter;
