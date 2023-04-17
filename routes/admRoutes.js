import express from 'express';
import { panelAdmin } from '../controllers/admController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

router.get('/panel-adm', 
  protegerRuta, 
  panelAdmin
  )

export default router