import express from 'express';
import { body } from 'express-validator';
import { panelAdmin, crearCategoria, guardarCategoria, crearPrecio, guardarPrecio, miPerfil } from '../controllers/admController.js'
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
router.post('/crear-categoria',
  protegerRuta,
  body('nombre').notEmpty().withMessage('El Nombre de Categoria es Obligatorio'),
  guardarCategoria
)
router.get('/crear-precio',
  protegerRuta,
  crearPrecio
)
router.post('/crear-precio',
  protegerRuta,
  body('nombre').notEmpty().withMessage('El Rango de Precio es Obligatorio'),
  guardarPrecio
)
router.get('/mi-perfil',
  protegerRuta,
  miPerfil )

export default router