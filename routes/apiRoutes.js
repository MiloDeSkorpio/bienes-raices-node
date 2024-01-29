import express from  'express';
import { propiedades, estados, municipios,crearMunicipio } from '../controllers/apiController.js'
const router = express.Router();

router.get('/propiedades', propiedades)
router.get('/estados',estados)
router.get('/municipios',municipios)
router.post('/crear-municipio',crearMunicipio)

export default router