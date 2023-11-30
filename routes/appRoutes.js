import  express  from "express";
import { inicio, categoria, noEncontrado, buscador, favoritos, verificadas } from '../controllers/appController.js'

const router = express.Router();

// Pagina de Inicio
router.get('/', inicio)

// Buscador
router.get('/buscador', buscador)

//favoritos
router.get('/favoritos', favoritos)

//verificados
router.get('/verificadas',verificadas)

//Categorias
router.get('/categorias/:id', categoria)

// Pagina 404
router.get('/404', noEncontrado)
export default router;
