import  express  from "express";
import { inicio, categoria, noEncontrado, buscador, contacto, favoritos, verificadas } from '../controllers/appController.js'

const router = express.Router();

// Pagina de Inicio
router.get('/', inicio)

//Categorias
router.get('/categorias/:id', categoria)

// Pagina 404
router.get('/404', noEncontrado)

// Buscador
router.get('/buscador', buscador)

//contacto
router.get('/contacto',contacto)

//favoritos
router.get('/favoritos', favoritos)

//verificados
router.get('/verificadas',verificadas)
export default router;
