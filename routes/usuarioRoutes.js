import express from 'express';
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword, autenticar, cerrarSesion, autenticarGoogle  } from '../controllers/usuarioController.js';
import Usuario from '../models/Usuario.js';
import passport from 'passport';
import GoogleStrategy  from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook'
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js';
const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', autenticar);


//cerrar Sesion
router.post('/cerrar-sesion', cerrarSesion)
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token',confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

//Almacena el nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);


// Autenticación con Google

passport.serializeUser((user, done) => {
  done(null, user.id);
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
function(res,accessToken, refreshToken, profile, cb) {
  console.log(profile)
  Usuario.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      nombre: profile.displayName,
      email: profile.emails[0].value,
      password: 'google-' + profile.id,
      token: generarId(),
      rolId: 3,
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken ,
    }
    
  }).then(([usuario, created]) => {
    // Envía el correo de confirmación si el usuario no ha sido creado
    if(created) {
      console.log("Usuario nuevo registrado")
      emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
      });
    }else {
      console.log("Usuario ya registrado, Autenticando")
      console.log(profile)
    }
    return cb(null, usuario);
  }).catch(err => {
    return cb(err);
  });
}
));

router.get('/google', 
  passport.authenticate('google')
  );

// Manejador de redireccionamiento de autenticación de Google
router.get('/google/callback',
autenticarGoogle,
  passport.authenticate('google', {
    successRedirect: 'adm/mi-perfil', 
    failureRedirect: '/login' 
}));

//Login with FB
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  scope: ['profile'] 
},
function(accessToken, refreshToken, profile, cb) {
 
  Usuario.findOrCreate({ 
    where: {facebookId: profile.id},
    defaults: {
      nombre: profile.displayName,
      email: profile.emails[0].value,
      password: 'facebook-' + profile.id,
      token: generarId(),
      rolId: 3,
      facebookAccessToken: accessToken,        // Almacenar token de acceso
      facebookRefreshToken: refreshToken 
    }
  }).then(([usuario, created]) => {
    return cb(null, usuario);
  }).catch(err => {
    return cb(err);
  });
}
));
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect: 'adm/mi-perfil',
    failureRedirect: '/login' 
  }));


export default router;