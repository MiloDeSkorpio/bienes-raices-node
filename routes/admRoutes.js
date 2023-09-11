import express from 'express';
import { miPerfil, subscripcion } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();


router.get('/mi-perfil',
  protegerRuta,
  miPerfil )

router.get('/subscripcion',
  subscripcion
)

export default router