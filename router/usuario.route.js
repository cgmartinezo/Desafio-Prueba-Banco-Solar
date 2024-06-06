import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = Router()

router.get('/usuarios', UsuarioController.getAllUsuarios)

router.post('/usuario', UsuarioController.createUser)

router.delete('/usuario/', UsuarioController.deleteUser)

router.put('/usuario/', UsuarioController.putUser)

export default router;
