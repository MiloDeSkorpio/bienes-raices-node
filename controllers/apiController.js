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
export {
  propiedades,
  estados,
  municipios
}