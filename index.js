#!/usr/bin/env node
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import admRoutes from './routes/admRoutes.js';
import db from './config/db.js';
import passport from 'passport';
import mercadopago from 'mercadopago';
import cors from 'cors'
import helmet from 'helmet';
import bodyParser from 'body-parser'

//Crear la app
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Reemplaza esto con tu dominio o '*'
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true, // Habilita las cookies en las solicitudes (si es necesario)
    optionsSuccessStatus: 204, // Algunos navegadores pueden requerir esto para las solicitudes OPTIONS
  };
app.use(cors(corsOptions))
app.use(bodyParser.json());
//Habilitar cookie parser
app.use( cookieParser())
//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}));
//habilitar helmet
// app.use(helmet());
// helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//     scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "'http://localhost:3000'","'www.mercadopago.com.mx'"],
//     styleSrc: ["'self'", "'unsafe-inline'"],
//   },
// });
// Mercado pago
mercadopago.configure({
	access_token: process.env.MERCADOPAGO_ACCES_TOKEN,
});

//Habilitar sesiones
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  
  //Inicializar passport
  app.use(passport.initialize());
  app.use(passport.session());

//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión Correcta a la Base de datos');
} catch (error) {
    console.log(error);
}

//Habilitar Pug
app.set('view engine','pug');
app.set('views', './views');

//Carpeta Publica
app.use(express.static('public'));

//Routing
app.use('/', appRoutes)
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes)
app.use('/adm', admRoutes)


//Definir un puerto y arrancar el proyecto
const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});