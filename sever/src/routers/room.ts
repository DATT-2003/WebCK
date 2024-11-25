import { Router } from "express";
import { create } from "../controllers/room";

//API
const router = Router();
router.post('/create', create);
export default router;