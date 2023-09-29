import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";
import { generarJWT, generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';
import passport from 'passport';


const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Inicio de Sesión',
  });
}

const autenticar = async (req, res) => {
  //validacion
  await check('email').isEmail().withMessage('El Email es Obligatorio').run(req);
  await check('password').notEmpty().withMessage('El Password es Obligatorio').run(req);

  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: resultado.array()
    });
  }
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: [{ msg: 'El Usuario no Existe' }]
    });
  }
  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: [{ msg: 'Tu cuenta no ha sido confirmada' }]
    });
  }
  // Revisar el password
  if (!usuario.verificarPassword(password)) {
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: [{ msg: 'El password es incorrecto' }]
    });
  }
  //Autenticar al Usuario
  const token = generarJWT({ id: usuario.id, nombre: usuario.nombre, rolId: usuario.rolId });

  //Almacenar en Cookies
  return res.cookie('_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: true
  }).redirect('/adm/mi-perfil');
} // fin autenticar


//Nueva autenticacion para cuentas externas
// Autenticación con Google
const autenticarGoogle = async (req, res) => {
  console.log(req)
  passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log(user)
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Usuario.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken)
      console.log(refreshToken)
      Usuario.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          nombre: profile.displayName,
          email: profile.emails[0].value,
          password: 'google-' + profile.id,
          imgPerfil: profile.photos[0].value,
          token: generarId(),
          rolId: 2,
          googleAccessToken: accessToken,
          googleRefreshToken: refreshToken,
        }
      }).then(([usuario, created]) => {
        const token = generarJWT({ id: usuario.id, nombre: usuario.nombre, rolId: usuario.rolId });
        res.cookie('_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: true
        });
        console.log(token);
        if (created) {
          console.log("Usuario nuevo registrado");
          // Envía el correo de confirmación si el usuario no ha sido creado
          emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
          });

        } else {
          console.log("Usuario ya registrado, Autenticando");
        }
        console.log(cb)
        return cb(null, usuario);
      }).catch(err => {
        return cb(err);
      });
    }//end function
  ));
};


const cerrarSesion = (req, res) => {
  return res.clearCookie('_token').status(200).redirect('/auth/login')
}
const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crear Cuenta',
    csrfToken: req.csrfToken()
  });
}

const registrar = async (req, res) => {
  //Validación
  await check('nombre').notEmpty().withMessage('El nombre es Obligatorio').run(req);
  await check('email').isEmail().withMessage('Ingresa un Email Valido').run(req);
  await check('password').isLength({ min: 6 }).withMessage('El Password debe tener al menos de 6 caracteres').run(req);
  await check('repetir_password').equals(req.body.password).withMessage('Los Passwords no son iguales').run(req);
  let resultado = validationResult(req)
  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email
      }
    });
  }
  //Extraer los datos
  const { nombre, email, password } = req.body;

  //Verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({ where: { email } })
  if (existeUsuario) {
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      errores: [{ msg: 'El usuario ya esta Registrado' }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email
      }
    });
  }

  // Almacenar un Usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
    rolId: 2
  });

  //Envia email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  });
  //Mostrar mensaje de Confirmación
  res.render('templates/mensaje', {
    pagina: 'Cuenta Creada Correctamente',
    mensaje: 'Hemos enviado un email de confirmacion, revisa tu bandeja de entrada.'
  });

}//End Registrar

//Funcion que comprueba una cuenta
const confirmar = async (req, res) => {
  const { token } = req.params;
  //Verificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Error al Confirmar tu cuenta',
      mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      error: true
    });
  }
  //Confirmar cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save()
  res.render('auth/confirmar-cuenta', {
    pagina: 'Cuenta confirmada',
    mensaje: 'La cuenta se confirmo Correctamente'
  });
}

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso',
    csrfToken: req.csrfToken()
  });
}

const resetPassword = async (req, res) => {
  //Validación
  await check('email').isEmail().withMessage('Agrega un Email Valido').run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso',
      errores: resultado.array()
    });
  }

  // Buscar el usuario

  const { email } = req.body
  const usuario = await Usuario.findOne({ where: { email } })
  console.log(usuario)
  if (!usuario) {
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso',
      errores: [{ msg: 'El Email no Pertenece a ningún usuario Registrado' }]
    });
  }
  //Generar un token y enviar el email
  usuario.token = generarId();
  await usuario.save();

  //Enviar un email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token
  })
  //Mostrar Mensaje de confirmacion
  res.render('templates/mensaje', {
    pagina: 'Restablece tu Password',
    mensaje: 'Hemos Enviado un email con las instrucciones, revisa tu bandeja de entrada.'
  });

}

const comprobarToken = async (req, res) => {

  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } })
  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Restablece tu Password',
      mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
      error: true
    });
  }
  //Mostrar formulario para modificar el password
  res.render('auth/reset-password', {
    pagina: 'Restablece tu Password'
  });
}

const nuevoPassword = async (req, res) => {
  //validar el password
  await check('password').isLength({ min: 6 }).withMessage('El Password debe tener al menos de 6 caracteres').run(req);

  let resultado = validationResult(req)
  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render('auth/reset-password', {
      pagina: 'Restablece tu Password',
      errores: resultado.array(),
    });
  }
  const { token } = req.params;
  const { password } = req.body;
  //identificar quien hace el cambio
  const usuario = await Usuario.findOne({ where: { token } })

  //hashear el nuevo password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;

  await usuario.save();
  res.render('auth/confirmar-cuenta', {
    pagina: 'Password Restablecido',
    mensaje: 'El password se guardo correctamente'
  })
}

export {
  formularioLogin,
  autenticar,
  cerrarSesion,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  autenticarGoogle,

}