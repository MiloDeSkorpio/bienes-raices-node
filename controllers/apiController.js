import {Propiedad, Precio, Categoria, Estado } from '../models/index.js'

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
export {
  propiedades,
  estados
}