"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phones_1 = __importDefault(require("./controllers/phones"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authenticateToken_1 = __importDefault(require("./authenticateToken"));
const connectMongoDB_1 = __importDefault(require("./mongodb/connectMongoDB"));
const users_1 = __importDefault(require("./controllers/users"));
dotenv_1.default.config();
(0, connectMongoDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(authenticateToken_1.default);
app.use("/api", phones_1.default);
app.use("/api/users", users_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
