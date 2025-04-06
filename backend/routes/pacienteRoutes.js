import express from "express";
import {
    agregarPaciente,
    obtenerPacientes,
    obtenerIdPaciente,
    actualizarPaciente,
    eliminarPaciente,
} from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

router
    .route("/:id")
    .get(checkAuth, obtenerIdPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente);

export default router;
