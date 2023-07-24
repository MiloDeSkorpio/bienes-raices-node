
import { Categoria, Precio } from '../models/index.js';
import { validationResult } from 'express-validator';

const panelAdmin = (req, res) => {
  res.render('adm/panel-adm', {
    pagina: 'Ajustes'
  });
}
// Categorias
const crearCategoria = async (req, res) => {
  res.render('adm/crear-categoria', {
    pagina: 'Crear Categoria',
    csrfToken: req.csrfToken(),
  });
}

const guardarCategoria = async (req, res) => {
  //Validacion
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render('adm/crear-categoria', {
      pagina: 'Crear Categoria',
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      datos: req.body
    });
  }
  //Crear  un registro
  const { nombre } = req.body;
  try {
    const categoriaGuardada = await Categoria.create({
      nombre
    })
    const { id } = categoriaGuardada;
    res.redirect(`panel-adm`)
  } catch (error) {
    console.log(error)
  }

}

// Precios
const crearPrecio = async (req, res) => {
  res.render('adm/crear-precio', {
    pagina: 'Crear Precio',
    csrfToken: req.csrfToken(),
  });
}
const guardarPrecio = async (req, res) => {
  //Validacion
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render('panel-adm', {
      pagina: 'Crear Categoria',
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      datos: req.body
    });
  }
  //Crear  un registro
  const { nombre } = req.body;
  try {
    const precioGuardado = await Precio.create({
      nombre
    })
    const { id } = precioGuardado;
    res.redirect(`panel-adm`)
  } catch (error) {
    console.log(error)
  }

}
export {
  panelAdmin,
  crearCategoria,
  guardarCategoria,
  crearPrecio,
  guardarPrecio
  
}