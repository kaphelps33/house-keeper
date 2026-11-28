import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { NextFunction, Request, Response } from "express";
import { userRouter } from "./routes/user.routes";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

require("dotenv").config();

export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

var jwt = require("jsonwebtoken");

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/user", userRouter);

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.send(401);
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      // invalid token
      return res.status(403);
    }
    req.user = decoded.username;
    next();
  });
};
