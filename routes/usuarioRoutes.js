import express from 'express';
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword, autenticar, cerrarSesion,  } from '../controllers/usuarioController.js';
import Usuario from '../models/Usuario.js';
import passport from 'passport';
import GoogleStrategy  from 'passport-google-oauth20';

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
function(req, accessToken, refreshToken, profile, cb) {
  Usuario.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      nombre: profile.displayName,
      email: profile.emails[0].value,
      password: 'google-' + profile.id,
      confirmado: 1,
      rolId: 3,
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken 
    }
  }).then(([usuario, created]) => {
    return cb(null, usuario);
  }).catch(err => {
    return cb(err);
  });
}
));

router.get('/google', passport.authenticate('google'));

// Manejador de redireccionamiento de autenticación de Google
router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/mis-propiedades', 
    failureRedirect: '/login' 
}));


export default router;