"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phonesRouter = (0, express_1.Router)();
phonesRouter.get("/", (req, res) => {
    return res.send("Hi from within the phones router GET");
});
phonesRouter.post("/", (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        console.log("User Authenticated!", auth);
        return res.send("Hi from within the phones router POST");
    }
    return res.status(403).send("Not authorized");
});
exports.default = phonesRouter;
