import express from 'express';
import { registrarVeterinario, perfilVeterinario, confirmarVeterinario } from '../controllers/veterinarioController.js';

const router = express.Router();

router.post('/', registrarVeterinario);
router.get('/perfil', perfilVeterinario);
router.get('/confirmar/:token', confirmarVeterinario);

export default router;