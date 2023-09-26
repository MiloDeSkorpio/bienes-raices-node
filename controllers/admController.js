import { Roles } from "../models/index.js"
import config from "../src/js/configMP.js"
import mercadopago from "mercadopago"

const miPerfil = async (req, res) => {
  //Datos Usuario
  const { dataValues } = req.usuario
  const usuario = dataValues
  //Datos del Rol
  const rol = await Roles.findByPk(usuario.rolId)
  const roles = rol.dataValues 

  res.render('adm/mi-perfil', {
    pagina: 'Mi Perfil',
    usuario,
    roles
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
			"success": config.url+"/adm/mi-perfil",
			"failure": config.url+"/adm/feedback",
			"pending": config.url+"/adm/feedback"
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
export {
  miPerfil,
  subscripcion,
  preferences,
  feedback
}