import express, { Express, Router, Request, Response } from "express";
import phonesRouter from "./controllers/phones";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import decodeIDToken from "./authenticateToken";

dotenv.config();

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

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
