import express from "express";
import { createSession } from "../controller";

const router = express.Router();

router.post("/create-session", createSession);

export default router;
