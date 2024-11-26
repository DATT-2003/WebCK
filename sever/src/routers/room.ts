import { Router } from "express";
import { create, getAllRooms } from "../controllers/room";

//API
const router = Router();
router.post('/create', create);
router.get('/list', getAllRooms);
export default router;