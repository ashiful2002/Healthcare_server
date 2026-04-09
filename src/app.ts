import express, { Application, Request, Response } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandller } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
// parsers

app.use(express.json());
app.use(cookieParser());

// application routes
app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Ph Health care management server is running");
});

app.use(globalErrorHandller);
app.use(notFound);

export default app;
