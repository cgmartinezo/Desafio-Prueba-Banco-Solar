import { Router } from "express";
import { TransferenciaController } from "../controllers/transferencia.controller.js";

const router = Router()


router.post('/transferencias', TransferenciaController.createTransferencia)


router.get('/transferencias', TransferenciaController.getAllTransfer)


export default router;