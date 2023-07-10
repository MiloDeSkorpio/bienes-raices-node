import express from  'express';
import { propiedades, estados } from '../controllers/apiController.js'
const router = express.Router();

router.get('/propiedades', propiedades)
router.get('/estados',estados)

export default router