import express from 'express';
import { miPerfil } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();


router.get('/mi-perfil',
  protegerRuta,
  miPerfil )

export default router