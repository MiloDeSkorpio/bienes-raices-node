import {  Subscripciones, Usuario, TipoSubs } from "../models/index.js"
import config from "../src/js/configMP.js"
import mercadopago from "mercadopago"

const miPerfil = async (req, res) => {
	//Datos Usuario
	const { dataValues } = req.usuario
	const usuario = dataValues
  const id  = usuario.id
	console.log(usuario)
  console.log(id)	
  //Datos de la subscripcion
	const subs = await Subscripciones.findAll({
		where: {
			usuarioId: id
		}
	})
	console.log(subs[0].dataValues)
	const infos  = subs[0].dataValues
	//datos del tipo de subscripcion
	const idT = subs[0].dataValues.tiposubId
	console.log(idT)
	const tsubs = await TipoSubs.findAll({
		where:{
			id: idT
		}
	})
	console.log(tsubs[0].dataValues)
	//Estructurar Datos para presentarlos al cliente
	const tipos = tsubs[0].dataValues
  res.render('adm/mi-perfil', {
    pagina: 'Mi Perfil',
    usuario,
		tipos,
		infos
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
			success: config.url+"/adm/feedback",
			failure: config.url+"/adm/feedback",
			pending: config.url+"/adm/feedback"
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

const feedback = async (req,res) => {
  res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
}

const prueba = async (req,res) => {
	  //Datos Usuario
	  const { dataValues } = req.usuario
	  const usuario = dataValues
	console.log(usuario)
	res.render('adm/prueba', {
		pagina: 'Premium Gratis',
	  });
}

const freepremium = async (req,res) => {
	res.render()
}

export {
  miPerfil,
  subscripcion,
  preferences,
  feedback,
  prueba
}