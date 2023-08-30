
const miPerfil = async (req,res) => {
  res.render('adm/mi-perfil', {
    pagina: 'Mi Perfil',
    csrfToken: req.csrfToken(),
  });
}
export {
  miPerfil
}