import { Router } from "express";
import { create, getAllRooms, getRoomById, updateRoom, deleteRoom } from "../controllers/room";

//API
const router = Router();
router.post('/create', create);
router.get('/list', getAllRooms);
router.get('/room/:id', getRoomById);
router.put('/update/:id', updateRoom);
router.delete('/delete/:id', deleteRoom);
export default router;