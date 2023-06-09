import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";
import { generarJWT, generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Inicio de Sesión',
    csrfToken: req.csrfToken(),
  });
}

const autenticar = async (req,res) => {
  //validacion
  await check('email').isEmail().withMessage('El Email es Obligatorio').run(req);
  await check('password').notEmpty().withMessage('El Password es Obligatorio').run(req);

  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if(!resultado.isEmpty()){
    //Errores
    return res.render('auth/login',{
      pagina: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errores: resultado.array()
    });
  }
  const {email, password} = req.body;
  const usuario = await Usuario.findOne({ where: { email }});
  if(!usuario){
    return res.render('auth/login',{
      pagina: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errores: [{msg: 'El Usuario no Existe'}]
    });
  }
  //Comprobar si el usuario esta confirmado
  if(!usuario.confirmado){
    return res.render('auth/login',{
      pagina: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
    });
  }
  // Revisar el password
  if(!usuario.verificarPassword(password)){
    return res.render('auth/login',{
      pagina: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errores: [{msg: 'El password es incorrecto'}]
    });
  }
  //Autenticar al Usuario
  const token = generarJWT({id: usuario.id, nombre: usuario.nombre, rolId: usuario.rolId});
    
  //Almacenar en Cookies
  return res.cookie('_token',token,{
    httpOnly: true,
    // secure: true,
    // sameSite: true
  }).redirect('/mis-propiedades');
}

const cerrarSesion = (req,res) => {
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
      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
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
    token: generarId()
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
 const confirmar = async (req,res) =>{
  const { token } = req.params;
  //Verificar si el token es valido
  const usuario = await Usuario.findOne({ where: {token}});
  if(!usuario){
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

const resetPassword = async (req,res) => {
    //Validación
    await check('email').isEmail().withMessage('Agrega un Email Valido').run(req);
 
    let resultado = validationResult(req);

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
        // Errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso',
            csrfToken : req.csrfToken(),
            errores: resultado.array()
        });
    }

    // Buscar el usuario

    const { email } = req.body
    const usuario = await Usuario.findOne({ where: { email}} )
    console.log(usuario)
    if(!usuario) {
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El Email no Pertenece a ningún usuario Registrado'}]
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

const comprobarToken = async (req,res) => {
    
  const { token } = req.params;

  const usuario = await Usuario.findOne({where: {token}})
  if(!usuario){
    return res.render('auth/confirmar-cuenta',{
      pagina: 'Restablece tu Password',
      mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
      error: true
    });
  }
  //Mostrar formulario para modificar el password
  res.render('auth/reset-password',{
    pagina: 'Restablece tu Password',
    csrfToken : req.csrfToken(),
  });

}

const nuevoPassword = async (req,res) => {
  //validar el password
  await check('password').isLength({ min: 6 }).withMessage('El Password debe tener al menos de 6 caracteres').run(req);
  
  let resultado = validationResult(req)
   // Verificar que el resultado este vacio
   if (!resultado.isEmpty()) {
    // Errores
    return res.render('auth/reset-password', {
      pagina: 'Restablece tu Password',
      csrfToken: req.csrfToken(),
      errores: resultado.array(),

    });
  }
  const {token } =req.params;
  const {password} = req.body;
  //identificar quien hace el cambio
  const usuario = await Usuario.findOne({where: {token}})

  //hashear el nuevo password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash( password, salt);
  usuario.token= null;

  await usuario.save();
  res.render('auth/confirmar-cuenta',{
    pagina: 'Password Restablecido',
    mensaje: 'El password se guardo correctamente'
  })
}
const createOrUpdateUserWithExternalAccount = async (externalData, usuarioData) => {
  try {
    const [usuario, created] = await Usuario.findOrCreate({
      where: { googleId: externalData.sub },
      defaults: {
        nombre: usuarioData.nombre,
        email: usuarioData.email,
        password: usuarioData.password,
        googleId: externalData.sub
      }
    });

    if (!created) {
      usuario.nombre = usuarioData.nombre;
      usuario.email = usuarioData.email;
      usuario.password = usuarioData.password;
      await usuario.save();
    }

    return usuario;
  } catch (error) {
    throw new Error(`Error al crear o actualizar usuario: ${error.message}`);
  }
};

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
  createOrUpdateUserWithExternalAccount
}