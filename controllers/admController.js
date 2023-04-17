
const panelAdmin = (req, res) => {
  res.render('adm/panel-adm', {
    pagina: 'Administracion'
    
  });
}
const crearCategoria = async (req, res) => {
  res.render('adm/crear-categoria', {
    pagina: 'Crear Categoria',
    csrfToken: req.csrfToken(),
  });
}
const crearPrecio = async (req, res) => {
  res.render('adm/crear-precio', {
    pagina: 'Crear Precio',
    csrfToken: req.csrfToken(),
  });
}

export {
  panelAdmin,
  crearCategoria,
  crearPrecio
}