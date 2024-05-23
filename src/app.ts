import cors from "cors";
import express from "express";
import { UserRouters } from "./modules/user/user.route";

const app = express();

app.use(express.json());
app.use(cors());

// user routers
app.use("/api/users", UserRouters);

app.get("/", (req, res) => {
  res.send("Express + TypeScript + Mongoose Server");
});

export default app;
