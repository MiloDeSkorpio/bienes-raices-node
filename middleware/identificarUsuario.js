import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { createOrUpdateUserWithExternalAccount } from '../controllers/usuarioController.js';

const identificarUsuario = async (req, res, next) => {
  // Identificar si hay un token
  const { _token } = req.cookies;
  if (!_token) {
    req.usuario = null;
    return next();
  }

  //Comprobar el token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);

    // Comprobar si el usuario ha iniciado sesión con un proveedor externo (Google)
    if (decoded.provider === 'google') {
      const usuarioData = {
        nombre: decoded.nombre,
        email: decoded.email,
        password: null // Como el usuario no ha ingresado una contraseña, establecemos el valor a null
      };
      const usuario = await createOrUpdateUserWithExternalAccount(decoded, usuarioData);
      req.usuario = usuario;
    } else {
      // Si el usuario ha iniciado sesión con correo electrónico y contraseña
      const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id);
      req.usuario = usuario;
    }

    return next();
  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login');
  }
};

export default identificarUsuario;
