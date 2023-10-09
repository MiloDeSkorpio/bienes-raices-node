import { Subscripciones, Usuario, TipoSubs } from "../models/index.js"
import config from "../src/js/configMP.js"
import mercadopago from "mercadopago"
import { formatearFecha } from '../helpers/index.js'
const miPerfil = async (req, res) => {
	/** PENDIENTE AGREGAR EL METODO DE VERIFICACION DEL DATE DE VENCIMIENTO DE TODAS LAS MEMBRESIAS **/
	const fechaActual = new Date()
	//Datos Usuario
	const usuario = req.usuario.dataValues
	const id = usuario.id
	//Datos de la subscripcion
	const subs = await Subscripciones.findByPk( id )
	//datos del tipo de subscripcion
	const idT = subs.tiposubId
	const tiposubs = await TipoSubs.findByPk(idT)
	//datos de subgratuita
	const gratis = await TipoSubs.findByPk(1)
	const nuevaFecha = new Date(fechaActual);
	nuevaFecha.setDate(fechaActual.getDate() + gratis.duracion);
	// console.log(nuevaFecha)
	if(fechaActual > subs.endSub) {
		console.log('Prueba Vencida')
		subs.endSub = nuevaFecha
		subs.tiposubId = 1
		await subs.save()
	} else {
		console.log('Subscripcion Activa')
	}
	res.render('adm/mi-perfil', {
		pagina: 'Mi Perfil',
		usuario,
		subs,
		tiposubs,
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

export {
	miPerfil,
	subscripcion,
	preferences,
	feedback,
	prueba,
	freepremium
}