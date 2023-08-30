import express from 'express';
import { body } from 'express-validator';
import { miPerfil } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();


router.get('/mi-perfil',
  protegerRuta,
  miPerfil )

export default routers