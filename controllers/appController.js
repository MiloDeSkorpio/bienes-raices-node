import { Precio, Categoria, Propiedad, Tipotr, Estado} from '../models/index.js'

const inicio = async (req, res) => {
  const [categorias,tipos, estados, precios, casas ] = await Promise.all([
    Categoria.findAll({ raw: true }),
    Tipotr.findAll({ raw: true }),  
    Estado.findAll({ raw: true }),  
    Precio.findAll({ raw: true }),
    Propiedad.findAll({
      limit: 10,
      where: {
        verificado: 1
      },
      include: [
        {
          model: Precio,
          as: 'precio'
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    }),
  ]);

  res.render('inicio', {
    pagina: 'Inicio',
    categorias,
    tipos,
    estados,
    precios,
    casas,
    csrfToken: req.csrfToken()
  });
};



const categoria =  async (req, res) => {
  const { id } = req.params
  
  // Comprobar que la categoria exista
  const categoria = await Categoria.findByPk(id)
  if(!categoria){
    return res.redirect('/404')
  }
  // Obtener las propiedades de la categoria
  const propiedades = await Propiedad.findAll({
    where: {
      categoriaId: id
    },
    include: [
      { model: Precio, as: 'precio'}
    ]
  })
  res.render('categoria',{
    pagina: `${categoria.nombre}s en Venta`,
    propiedades,
    csrfToken: req.csrfToken()
  })
}

const noEncontrado = (req, res) => {
  res.render('404', {
    pagina: 'No Encontrada',
    csrfToken: req.csrfToken()
  })
}

const buscador = async (req, res) => {
  const [categorias,tipos, estados, precios, casas ] = await Promise.all([
    Categoria.findAll({ raw: true }),
    Tipotr.findAll({ raw: true }),  
    Estado.findAll({ raw: true }),  
    Precio.findAll({ raw: true }),
    Propiedad.findAll({
      limit: 10,
      where: {
        verificado: 1
      },
      include: [
        {
          model: Precio,
          as: 'precio'
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    }),
  ]);

  res.render('buscador',{
    pagina: 'Buscador',
    categorias,
    tipos,
    estados,
    precios,
    casas,
    csrfToken: req.csrfToken()
  })
}

const ajustes = async (req, res) => {
  res.render('ajustes', {
    pagina: 'Ajustes',
    csrfToken: req.csrfToken()
  })
}
const favoritos = async (req, res) => {
  res.render('favoritos', {
    pagina: 'Favoritos',
    csrfToken: req.csrfToken()
  })
}
const verificadas = async (req, res) => {
  const [casas] = await Promise.all([
    Propiedad.findAll({
      limit: 10,
      where: {
        verificado: 1
      },
      include: [
        {
          model: Precio,
          as: 'precio'
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    }),
  ])
  res.render('verificadas', {
    pagina: 'Verificadas',
    casas,
    csrfToken: req.csrfToken()
  })
}
export {
  inicio,
  categoria,
  noEncontrado,
  buscador,
  ajustes,
  favoritos,
  verificadas
}