import { Sequelize } from 'sequelize';
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
  const { termino } = req.body

  //Validar que el termino no este vacio
  if(!termino.trim()){
    return res.redirect('back')
  }

  // Consultar las propiedades
  const propiedades = await Propiedad.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          titulo: {
            [Sequelize.Op.like]: '%' + termino + '%'
          }
        },
        {
          calle: {
            [Sequelize.Op.like]: '%' + termino + '%'
          }
        }
      ]
    },
    include: [
      { model: Precio, as: 'precio' }
    ]
  })
  res.render('busqueda',{
    pagina: 'Resultados de la Busqueda',
    propiedades,
    csrfToken: req.csrfToken()
  })
}

const contacto = async (req, res) => {
  res.render('contacto', {
    pagina: 'Contacto',
    csrfToken: req.csrfToken()
  })
}
export {
  inicio,
  categoria,
  noEncontrado,
  buscador,
  contacto
}