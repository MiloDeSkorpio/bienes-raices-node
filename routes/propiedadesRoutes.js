import express from "express";
import { body } from 'express-validator';
import { 
  admin, 
  crear, 
  guardar,
  agregarImagen, 
  almacenarImagen, 
  editar, 
  guardarCambios, 
  eliminar,
  cambiarEstado,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes
 } from "../controllers/propiedadController.js";
import protegerRuta from "../middleware/protegerRuta.js";
import upload from "../middleware/subirImagenes.js";
import identificarUsuario from "../middleware/identificarUsuario.js";


const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin);
router.get('/propiedades/crear', protegerRuta, crear);
router.post('/propiedades/crear',
  protegerRuta,
  body('titulo').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
  body('operacion').notEmpty().withMessage('Selecciona un tipo de Operación'),
  body('descripcion')
    .notEmpty().withMessage('La Descripción es Obligatoria')
    .isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
  body('areat').isNumeric().withMessage('Asigna un Area de Terreno'),
  body('areac').isNumeric().withMessage('Asigna un Area de Construccion'),
  body('precio').isNumeric().withMessage('Asigna un Rango de Precios'),
  body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'),
  body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
  body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
  body('lat').isNumeric().withMessage('Selecciona una Ubicación en el Mapa'),
  guardar
);

router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen);

router.post('/propiedades/agregar-imagen/:id',
  protegerRuta,
  upload.array('imagenes',10),
  almacenarImagen
);

router.get('/propiedades/editar/:id',
  protegerRuta,
  editar
)

router.post('/propiedades/editar/:id',
  protegerRuta,
  body('titulo').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
  body('descripcion')
    .notEmpty().withMessage('La Descripción es Obligatoria')
    .isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
  body('precio').isNumeric().withMessage('Selecciona un Rango de Precios'),
  body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'),
  body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
  body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
  body('lat').isNumeric().withMessage('Selecciona una Ubicación en el Mapa'),
  guardarCambios
);

router.post('/propiedades/eliminar/:id',
  protegerRuta,
  eliminar
)

router.put('/propiedad/:id',
 protegerRuta,
 cambiarEstado
)

//Area publica
router.get('/propiedad/:id',
  identificarUsuario,
  mostrarPropiedad,
)

// Almacenar los mensajes
router.post('/propiedad/:id',
  identificarUsuario,
  body('mensaje').isLength({min:10},{max:200}).withMessage('El mensaje no puede ir vacio o es muy corto'),
  enviarMensaje,
)

router.get('/mensajes/:id',
 protegerRuta,
 verMensajes
)

router.put('/propiedad/:id',
 protegerRuta,
 cambiarEstado
)

export default router;