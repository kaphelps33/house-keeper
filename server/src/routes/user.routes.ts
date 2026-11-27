import { Router } from "express";

export const router = Router();

// Public routes
router.post("/sign-up");
router.post("/login");
router.get("/refresh");
router.get("/logout");
// Private routes
