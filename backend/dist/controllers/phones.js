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
const Phone = require("../models/phone");
const phonesRouter = (0, express_1.Router)();
phonesRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        const phones = yield Phone.find({});
        return res.json(phones.map((phone) => phone.toJSON()));
    }
    return res.status(403).send("Not Authorized");
}));
phonesRouter.get("/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        const uid = req.params.uid;
        try {
            const entries = yield Phone.find({ uid: uid });
            return res.json(entries.map((phone) => phone.toJSON()));
        }
        catch (error) {
            console.log("Error retrieving user from /phones/:uid:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    return res.status(403).send("Not Authorized");
}));
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
