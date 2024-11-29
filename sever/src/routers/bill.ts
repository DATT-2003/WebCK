import { Router } from "express";
import { createBill } from "../controllers/bill";

const router = Router();
router.post('/create', createBill);

export default router;
