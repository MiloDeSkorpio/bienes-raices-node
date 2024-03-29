import { unlink } from 'node:fs/promises';
import { validationResult } from 'express-validator';
import {  Categoria, Propiedad, Mensaje, Usuario, Subscripciones, TipoSubs, Tipotr, Favorito } from '../models/index.js';
import { esVendedor, formatearFecha, esFavorito } from '../helpers/index.js'

const admin = async (req, res) => {
// Paginador
  // Leer QueryString
  const { pagina: paginaActual } = req.query

  //Expresion Regular 
  // -- [0-9] Solo acepta digitos del 0 al 9 
  // -- ^ Siempre debe iniciar con digitos
  // -- $ Siempre tiene que finalizar con digitos
  const expresion = /^[0-9]$/

  if(!expresion.test(paginaActual)){
    return res.redirect('/mis-propiedades?pagina=1')
  }

  try {
    const { id } = req.usuario
    //Limites y Offfset para el Paginador
    const limit = 3
    const publicada = true // identificar propiedades publicadas
    const offset = ((paginaActual * limit ) - limit)
    const [propiedades, total,publicadas] = await Promise.all([
      Propiedad.findAll({
        limit,
        offset,
        where: {
          usuarioId: id
        },
        include: [
          { model: Categoria, as: 'categoria' }, 
          { model: Mensaje, as: 'mensajes' }
        ]
      }),
      Propiedad.count({
        where: {
          usuarioId: id
        }
      }),
      Propiedad.count({
        where: {
          usuarioId: id,
          publicado: publicada
        }
      })
    ])

// Limite de subscripciones
const { tiposubId } = await Subscripciones.findByPk(id);
const { limite } = await TipoSubs.findByPk(tiposubId);

const publicadasMayorLimite = publicadas > limite;

if (publicadasMayorLimite) {
  // Obtener todas las propiedades publicadas del usuario ordenadas por fecha de creación ascendente
  const propiedadesOrdenadas = await Propiedad.findAll({
    where: {
      usuarioId: id,
      publicado: publicada,
    },
    order: [['createdAt', 'ASC']],
  });
  // Mantener la propiedad más antigua y desactivar las demás
  const propiedadMasAntigua = propiedadesOrdenadas[0];
  // Actualizar las propiedades en la base de datos
  await Promise.all(
    propiedadesOrdenadas.map(async (propiedad) => {
      // Verificar si el campo 'verificada' está activo
      let {id, verificado, publicado} = propiedad.dataValues   
        if (verificado) {
          // La propiedad verificada tiene prioridad para mantenerse activa
          if (id != propiedadMasAntigua.id) {
            // Desactivar la propiedad
            publicado = false
            propiedad.set({
              publicado 
            })
            await propiedad.save();
          return res.redirect('/mis-propiedades')
          }
        }else if(id != propiedadMasAntigua.id) {
          publicado = false
          propiedad.set({
            publicado 
          })
          await propiedad.save();
        return res.redirect('/mis-propiedades')
        }

    })
  );
}
   
    //Renderizado de pagina
    res.render('propiedades/admin', {
      pagina: 'Mis Propiedades',
      propiedades,
      paginas: Math.ceil(total / limit),
      paginaActual: Number(paginaActual),
      total,
      publicadas,
      offset,
      limit,
      publicadasMayorLimite
    });
  } catch (error) {
    console.log(error)
  }
}

// Formulario para crear nueva propiedad
const crear = async (req, res) => {
  // Consultar Modelo de precio y categorias
  const [categorias, operaciones] = await Promise.all([
    Categoria.findAll(),
    Tipotr.findAll()
  ]);
  res.render('propiedades/crear', {
    pagina: 'Crear Propiedad',
    categorias,
    operaciones,
    datos: {}
  });
}

const guardar = async (req, res) => {
  //Validacion
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    // Consultar Modelo de precio y categorias
    const [categorias, operaciones] = await Promise.all([
      Categoria.findAll(),
      Tipotr.findAll()
    ]);
    return res.render('propiedades/crear', {
      pagina: 'Crear Propiedad',
      categorias,
      operaciones,
      errores: resultado.array(),
      datos: req.body
    });
  }
  //Crear  un registro
  const { titulo, tipoId, descripcion,areat, areac, habitaciones, estacionamiento, wc, calle, lat, lng, precio, categoria: categoriaId, municipioId, estadoId } = req.body;
  const { id: usuarioId } = req.usuario
  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      tipoId,
      descripcion,
      areat,
      areac,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precio,
      categoriaId,
      municipioId,
      estadoId,
      usuarioId,
      imagen: ['']
    })
    const { id } = propiedadGuardada;
    res.redirect(`/propiedades/agregar-imagen/${id}`)
  } catch (error) {
    console.log(error)
  }
}

const agregarImagen = async (req, res) => {


  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad pertenece a quien visita esta pagina
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  res.render('propiedades/agregar-imagen', {
    pagina: `Agregar Imagenes: ${propiedad.titulo}`,
    propiedad
  });
}

const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad pertenece a quien visita esta pagina
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  try {

    //Almacenar la imagen y publicar la propiedad
    console.log(req.files)
    // const imagenes = [];

    // propiedad.imagen = imagenes;
    // propiedad.publicado = true;

    // await propiedad.save();

    // next();

  } catch (error) {
    console.log(error)
  }
}

const editar = async (req, res) => {

  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id)

  if (!propiedad) {
    return res.redirect('/mis-propiedades')
  }
  // Revisar que quien visita la URL, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect('/mis-propiedades')
  }
  // Consultar Modelo de precio y categorias
  const [categorias, operaciones] = await Promise.all([
    Categoria.findAll(),
    Tipotr.findAll()
  ]);

  res.render('propiedades/editar', {
    pagina: `Editar Propiedad: ${propiedad.titulo}`,
    categorias,
    operaciones,
    datos: propiedad
  });
}

const guardarCambios = async (req, res) => {
  // Verificar la Validacion

  //Validacion
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    // Consultar Modelo de precio y categorias
    const [categorias, operaciones] = await Promise.all([
      Categoria.findAll(),
      Tipotr.findAll()
    ]);

    return res.render('propiedades/editar', {
      pagina: 'Editar Propiedad',
      categorias,
      operaciones,
      errores: resultado.array(),
      datos: req.body
    });
  }

  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id)
  
  if (!propiedad) {
    return res.redirect('/mis-propiedades')
  }
  // Revisar que quien visita la URL, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect('/mis-propiedades')
  }

  //Reescribir el objeto y asignar neuvos valores
  try {
    const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio, categoria: categoriaId } = req.body;

    propiedad.set({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precio,
      categoriaId
    });
    await propiedad.save()

    res.redirect('/mis-propiedades')
  } catch (error) {
    console.log(error)
  }
}

const eliminar = async (req, res) => {
  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id)

  if (!propiedad) {
    return res.redirect('/mis-propiedades')
  }
  // Revisar que quien visita la URL, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect('/mis-propiedades')
  }
  //Eliminar la imagen
  await unlink(`public/uploads/${propiedad.imagen}`)
  console.log(`Se Elimino la imagen: ${propiedad.imagen}`)
  // Eliminar la propiedad
  await propiedad.destroy()
  res.redirect('/404')
}

//Modifica el estado de la propiedad

const cambiarEstado = async(req,res) => {
  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id)

  if (!propiedad) {
    return res.redirect('/mis-propiedades')
  }
  // Revisar que quien visita la URL, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect('/mis-propiedades')
  }
  propiedad.publicado = !propiedad.publicado

  await propiedad.save()

  res.json({
    resultado: 'ok'
  })
}


const mostrarPropiedad = async (req, res) => {
  const { id: idPropiedad } = req.params
  
  // ValidPropiedadar que la propiedad exista
  const propiedad = await Propiedad.findByPk(idPropiedad,{
    include: [
      {
        model: Categoria, as: 'categoria',
      }, 

    ]
  })
  const favorito = await Favorito.findAll({
    where:{
      usuarioId : req.usuario?.id
    } 
  })
  if (!propiedad || !propiedad.publicado) {
    return res.redirect('/404')
  }
  res.render('propiedades/mostrar', {
    idPropiedad,
    propiedad,
    favorito,
    pagina: propiedad.titulo,
    usuario: req.usuario,
    esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId)
  })
}

const enviarMensaje = async (req,res) => {
  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id,{
    include: [
      {
        model: Categoria, as: 'categoria',
      }, 
      {
        model: Precio, as: 'precio'
      }
    ]
  })

  if (!propiedad) {
    return res.redirect('/mis-propiedades')
  }
  // Renderizar los errores
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    
   return res.render('propiedades/mostrar', {
      propiedad,
      pagina: propiedad.titulo,

      usuario: req.usuario,
      esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
      errores: resultado.array()
    })
  }

  const { mensaje } = req.body
  const { id: propiedadeId } = req.params
  const { id: usuarioId} = req.usuario

  // Alamacenar el mensaje
  await Mensaje.create({
    mensaje,
    propiedadeId,
    usuarioId
  })

  res.render('propiedades/mostrar', {
    propiedad,
    pagina: propiedad.titulo,
    usuario: req.usuario,
    esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
    enviado: true
  })

}

// Leer mensajes recibidos

const verMensajes = async (req, res) => {
  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id,{
    include: [
      { model: Mensaje, as: 'mensajes',
          include: [
            {model: Usuario.scope('eliminarPassword'), as: 'usuario'}
          ]
      }
    ]
  })

  if (!propiedad) {
    return res.redirect('/mis-propiedades')
  }
  // Revisar que quien visita la URL, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect('/mis-propiedades')
  }
  res.render('propiedades/mensajes',{
    pagina: 'Mensajes',
    mensajes: propiedad.mensajes,
    formatearFecha
  })
}
export {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
  cambiarEstado,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes
}