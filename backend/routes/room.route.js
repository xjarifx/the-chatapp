import express from "express";
import { authRoom } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/auth-room", authRoom);

export default router;
