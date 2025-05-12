import express from "express";
import { addRoom } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/add-room", addRoom);

export default router;
