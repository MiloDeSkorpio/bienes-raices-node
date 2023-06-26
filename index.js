#!/usr/bin/env node

import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import admRoutes from './routes/admRoutes.js';
import db from './config/db.js';
import passport from 'passport';



//Crear la app
const app = express();

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}));

//Habilitar cookie parser
app.use( cookieParser())

//Habilitar sesiones
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  
  //Inicializar passport
  app.use(passport.initialize());
  app.use(passport.session());
//Habilitar CSRF
app.use(csrf({cookie : true}));

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