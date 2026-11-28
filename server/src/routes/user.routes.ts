import { Router } from "express";
import { login, logout, refresh, signUp } from "../controllers/user.controller";

export const userRouter = Router();

// Public routes
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);
userRouter.get("/refresh", refresh);

// Private routes
// TODO: MAKE THIS ROUTE PROTECTED
userRouter.get("/logout", logout);

module.exports = userRouter;
