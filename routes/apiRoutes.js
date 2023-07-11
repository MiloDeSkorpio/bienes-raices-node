import express from  'express';
import { propiedades, estados, municipios } from '../controllers/apiController.js'
const router = express.Router();

router.get('/propiedades', propiedades)
router.get('/estados',estados)
router.get('/municipios',municipios)

export default router