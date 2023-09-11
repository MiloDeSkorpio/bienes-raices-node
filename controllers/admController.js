import { Roles } from "../models/index.js"

const miPerfil = async (req, res) => {
  //Datos Usuario
  const { dataValues } = req.usuario
  const usuario = dataValues
  //Datos del Rol
  const rol = await Roles.findByPk(usuario.rolId)
  const roles = rol.dataValues 

  res.render('adm/mi-perfil', {
    pagina: 'Mi Perfil',
    csrfToken: req.csrfToken(),
    usuario,
    roles
  });
}

const subscripcion = async (req,res) => {
  res.render('adm/subscripcion', {
    pagina: 'Subscripciones',
    csrfToken: req.csrfToken(),

  });
}
export {
  miPerfil,
  subscripcion
}