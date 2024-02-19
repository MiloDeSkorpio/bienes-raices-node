import { Subscripciones, Usuario, TipoSubs, Favorito } from "../models/index.js"
// import config from "../src/js/configMP.js"
import mercadopago from "mercadopago"
import { formatearFecha } from '../helpers/index.js'
import { eliminar } from "./propiedadController.js"


const miPerfil = async (req, res) => {

	/** PENDIENTE AGREGAR EL METODO DE VERIFICACION DEL DATE DE VENCIMIENTO DE TODAS LAS MEMBRESIAS **/

	/** Desestructuración de objetos y definicion de variables **/
		// Desestructuración
		const { dataValues: { id, nombre, email, imgPerfil, rolId, prueba  } } = req.usuario;
		let { tiposubId, createdAt } = await Subscripciones.findByPk( id )
		const { nombre: nombreS } = await TipoSubs.findByPk(tiposubId)
		const { duracion } = await TipoSubs.findByPk(1)
		const subscripciones = await Subscripciones.findByPk(id)

		// Metodo para asignar la subscripcion gratuita una vez se venza alguna subscripcion
		// El metodo renovara la subscripcion gratuita cada que se finalize una subscripcion
		// Variables 
		const fechaActual = new Date();
		let endSub = new Date(subscripciones.endSub);
		const nuevaFecha = new Date(fechaActual);
		nuevaFecha.setDate(fechaActual.getDate() + duracion);

		// Asignar la duracion de la subscripcion gratuita a la fecha actual
		// Condicional para el vencimiento de la subscripcion
		if(fechaActual > endSub) {
			console.log('Subscripcion vecnida')
			try {	
				endSub = nuevaFecha
				tiposubId = 1
				subscripciones.set({
					endSub,
					tiposubId
				})
				await subscripciones.save()
					
			} catch (error) {
				console.log("Error:",error)
			}
			return res.redirect('/adm/mi-perfil')
		} 		
		
		
	res.render('adm/mi-perfil', {
		pagina: 'Mi Perfil',
		id,
		nombre,
		email,
		imgPerfil,
		rolId,
		prueba,
		nombreS,
		endSub,
		createdAt,
		formatearFecha
	});
}

const subscripcion = async (req, res) => {
	res.render('adm/subscripcion', {
		pagina: 'Subscripciones',
	});
}

const preferences = async (req, res) => {
	let preference = {
		items: [
			{
				title: "Premium Mensual",
				unit_price: 180,
				quantity: 1,
			}
		],
		back_urls: {
			success: config.url + "/adm/feedback",
			failure: config.url + "/adm/feedback",
			pending: config.url + "/adm/feedback"
		},
		auto_return: "approved",
	};
	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
}

const feedback = async (req, res) => {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
}

const prueba = async (req, res) => {
	res.render('adm/prueba', {
		pagina: 'Premium Gratis',

	});
}
//** Crear Metodo POST **/
const freepremium = async (req, res) => {
	const { id } = req.params
	const subscripcion = await Subscripciones.findByPk(id)
	const usuario = await Usuario.findByPk(id)
	const tiposubs = await TipoSubs.findAll()
	const prueba = tiposubs[5]
	
	// Clona la fecha actual para no modificarla directamente
	const fechaAct = new Date()
	const nuevaFecha = new Date(fechaAct);
	nuevaFecha.setDate(fechaAct.getDate() + prueba.duracion);
	if (usuario.prueba === 0){
		try {
			//guardar nuevos valores en base de datos
			subscripcion.endSub = nuevaFecha,
			subscripcion.tiposubId = prueba.id
			await subscripcion.save()
			usuario.prueba = 1
			await usuario.save()
			res.redirect('/mi-perfil')
		} catch (error) {
			console.log(error)
		}
	} 
}
const addFav = async (req,res) => {
	try {	
		const  { id: idPropiedad } = req.params
		const {dataValues: { id} } = req.usuario
		const favorito = await Favorito.create({
			usuarioId: id,
			propiedadId: idPropiedad
		  })
		  res.redirect('/favoritos')
	} catch (error) {
		console.log(error)
	}

}

const delFav = async (req, res) => {
	
	const { id } = req.params
	const {id: idVisitante } = req.usuario
	 // Validar que la propiedad exista
	const favorito = await Favorito.findByPk(id)
	
	if(!favorito){
		console.log('No existe')
		return res.redirect('/favoritos')
	}
	// Revisar que quien visita la URL, es quien agrego el favorito
	if(favorito.usuarioId.toString() !== idVisitante.toString()) {
		console.log('Este no es tuyo')
		return res.redirect('favoritos')
	}
	// eliminar favorito
	await favorito.destroy()
	res.redirect('/favoritos')
}
	
export {
	miPerfil,
	subscripcion,
	preferences,
	feedback,
	prueba,
	freepremium,
	addFav,
	delFav
}