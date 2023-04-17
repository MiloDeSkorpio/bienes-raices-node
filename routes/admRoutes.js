import express from 'express';
import { panelAdmin, crearCategoria, crearPrecio } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

router.get('/panel-adm', 
  protegerRuta, 
  panelAdmin
  )
router.get('/crear-categoria',
  protegerRuta,
  crearCategoria
)
router.get('/crear-precio',
  protegerRuta,
  crearPrecio
)

export default router