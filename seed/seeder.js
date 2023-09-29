import { exit } from 'node:process';
import categorias from "./categorias.js";
import precios from './precios.js';
import tipotr from './tipotr.js';
import roles from './roles.js';
import usuarios from './usuarios.js';
import estados from './estados.js';
import municipios from './municipios.js';
import propiedades from './propiedades.js';
import tiposubs from './tiposubs.js';
import subscripciones from './subscripciones.js';
import db from "../config/db.js";
//Importamos el modelo que se llenara
import { Categoria, Precio,Tipotr, Roles, Usuario, Estado ,Municipio , Propiedad, TipoSubs , Subscripciones  } from '../models/index.js';
const importarDatos = async () => {
  try {
    //Autenticar
    await db.authenticate();
    
    //Generar las Columnas
    await db.sync();
    
    //Insertamos los datos
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
      Tipotr.bulkCreate(tipotr),
      Roles.bulkCreate(roles),
      Usuario.bulkCreate(usuarios),
      Estado.bulkCreate(estados),
      Municipio.bulkCreate(municipios),
      Propiedad.bulkCreate(propiedades),
      TipoSubs.bulkCreate(tiposubs),
      Subscripciones.bulkCreate(subscripciones)
    ])
    console.log('Datos Importados Correctamente');
    exit() // 1 error - 0 se realizo bien
 
  } catch (error) {
    console.log(error);
    exit(1);
  }
}
const eliminarDatos = async () => {
  try {
  await  db.sync({force: true})
    console.log('Datos Eliminados Correctamente');
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
}

if(process.argv[2] === "-i"){
  importarDatos();
}
if(process.argv[2] === "-e"){
  eliminarDatos();
}

