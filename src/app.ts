import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app = express();

app.use(express.json());
app.use(cors());

// user routers
app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("University Management System is Running!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
