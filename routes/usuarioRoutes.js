import express from 'express';
import passport from 'passport';
import { 
  formularioLogin, 
  formularioRegistro, 
  registrar, 
  confirmar, 
  formularioOlvidePassword, 
  resetPassword, 
  comprobarToken, 
  nuevoPassword, 
  autenticar, 
  cerrarSesion, 

} from '../controllers/usuarioController.js';
import GoogleStrategy from 'passport-google-oauth20';
import { Usuario } from '../models/index.js'
import { generarJWT, generarId } from '../helpers/tokens.js';
//

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

//Rutas Google
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
        rolId: 3,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      }
    }).then(([usuario, created, res]) => {
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
  router.get('/google',
    passport.authenticate('google'),
  );

  // Manejador de redireccionamiento de autenticación de Google
  router.get('/google/callback',
    passport.authenticate('google', {
      successRedirect: '/adm/mi-perfil', 
      failureRedirect: '/login' 
  }));

// //Login with FB
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//   scope: ['profile'] 
// },
// function(accessToken, refreshToken, profile, cb) {
 
//   Usuario.findOrCreate({ 
//     where: {facebookId: profile.id},
//     defaults: {
//       nombre: profile.displayName,
//       email: profile.emails[0].value,
//       password: 'facebook-' + profile.id,
//       token: generarId(),
//       rolId: 3,
//       facebookAccessToken: accessToken,        // Almacenar token de acceso
//       facebookRefreshToken: refreshToken 
//     }
//   }).then(([usuario, created]) => {
//     return cb(null, usuario);
//   }).catch(err => {
//     return cb(err);
//   });
// }
// ));
// router.get('/facebook',
//   passport.authenticate('facebook'));

// router.get('/facebook/callback',
//   passport.authenticate('facebook', { 
//     successRedirect: 'adm/mi-perfil',
//     failureRedirect: '/login' 
//   }));


export default router;