import express, { Request, Response } from "express";
import "express-async-errors";
import path from "path";
import apiRouter from "./api";
import morgan from "./middleware/morgan";
import cors from 'cors'
const app = express();

// Middleware
app.use(cors())
app.use(morgan());
app.use(express.static("public"));

// API Routes
app.use("/api", apiRouter);

// Frontend
if (process.env.NODE_ENV === "production") {
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.resolve("public", "index.html"));
  });
}

export default app;
