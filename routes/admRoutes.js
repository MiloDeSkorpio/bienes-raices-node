import express from 'express';
import { miPerfil, subscripcion, preferences, feedback, prueba, freepremium } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

router.get('/mi-perfil',
  protegerRuta,
  miPerfil 
)

router.get('/subscripcion',
  protegerRuta,
  subscripcion
)

router.post('/create_preference',
  protegerRuta,
  preferences 
);

router.get('/feedback',
  protegerRuta,
  feedback
)

router.get('/prueba',
  protegerRuta,
  prueba
)

router.post('/prueba/:id',
  freepremium
)

export default router