
const miPerfil = async (req, res) => {
 
  const { dataValues} = req.usuario
  console.log(dataValues)
  const usuario = dataValues
  console.log(usuario)



  res.render('adm/mi-perfil', {
    pagina: 'Mi Perfil',
    csrfToken: req.csrfToken(),
    usuario,
  });
}
export {
  miPerfil
}