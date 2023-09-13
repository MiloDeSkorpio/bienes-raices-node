import { Roles } from "../models/index.js"

const miPerfil = async (req, res) => {
  //Datos Usuario
  const { dataValues } = req.usuario
  const usuario = dataValues
  //Datos del Rol
  const rol = await Roles.findByPk(usuario.rolId)
  const roles = rol.dataValues 

  res.render('adm/mi-perfil', {
    pagina: 'Mi Perfil',
    csrfToken: req.csrfToken(),
    usuario,
    roles
  });
}

const subscripcion = async (req,res) => {
  res.render('adm/subscripcion', {
    pagina: 'Subscripciones',
    csrfToken: req.csrfToken(),

  });
}

const preferences = async (req,res) => {
  let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
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
  res.render('adm/subscripcion', {
    pagina: 'Subscripciones',
    csrfToken: req.csrfToken(),

  });
}

const feedback = async (req,res) => {
  res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
  res.render('adm/subscripcion', {
    pagina: 'Subscripciones',
    csrfToken: req.csrfToken(),

  });
}
export {
  miPerfil,
  subscripcion,
  preferences,
  feedback
}