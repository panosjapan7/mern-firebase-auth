"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phonesRouter = (0, express_1.Router)();
phonesRouter.get("/", (req, res) => {
    return res.send("Hi from within the phones router GET");
});
phonesRouter.post("/", (req, res) => {
    return res.send("Hi from within the phones router POST");
});
exports.default = phonesRouter;
