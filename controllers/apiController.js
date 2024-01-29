import {Propiedad, Precio, Categoria, Estado, Municipio } from '../models/index.js'

const propiedades = async (req,res) => {
  const propiedades = await Propiedad.findAll({
    include: [
      {model: Precio, as: 'precio'},
      {model: Categoria, as: 'categoria'},
    ]
  })
  res.json(propiedades)
}

const estados = async (req,res) => {
  const estados = await Estado.findAll({})
  res.json(estados)
}
const municipios = async (req,res) => {
  const municipios = await Municipio.findAll({})
  res.json(municipios)
}

const crearMunicipio = async (req, res) => {
  try {
    // Validar que req.body tiene las propiedades necesarias
    if (!req.body.nombre || !req.body.lat || !req.body.lng || !req.body.zoom || !req.body.estadoId) {
      return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    }

    // Crear instancia de Municipio de manera síncrona
    const municipio = new Municipio();

    // Asignar valores desde req.body
    municipio.nombre = req.body.nombre;
    municipio.lat = req.body.lat;
    municipio.lng = req.body.lng;
    municipio.zoom = req.body.zoom;
    municipio.estadoId = req.body.estadoId;

    // Guardar el municipio
    const response = await municipio.save();
    if (response.status === 400) {
      const errorBody = await response.json();
      console.error('Error en la solicitud:', errorBody);
      res.status(400).json(errorBody);
    } else {
      // Enviar el municipio creado como respuesta
      res.json(municipio);
    }

  } catch (error) {
    // Manejar errores durante el proceso
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


export {
  propiedades,
  estados,
  municipios,
  crearMunicipio
}