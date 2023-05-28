import express, { Express, Router, Request, Response } from "express";
import phonesRouter from "./controllers/phones";
import dotenv from "dotenv";
import cors from "cors";
import decodeIDToken from "./authenticateToken";
import connectMongoDB from "./mongodb/connectMongoDB";

dotenv.config();

connectMongoDB();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(decodeIDToken);

app.use("/api", phonesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
