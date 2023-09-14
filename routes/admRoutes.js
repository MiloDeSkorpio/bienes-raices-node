import express from 'express';
import { miPerfil, subscripcion, preferences, feedback } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();


router.get('/mi-perfil',
  protegerRuta,
  miPerfil )

router.get('/subscripcion',
  subscripcion
)

router.post('/create_preference',
  preferences  
)

router.get('/feedback',
  feedback
)

export default router