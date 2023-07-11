import { exit } from 'node:process';
import categorias from "./categorias.js";
import precios from './precios.js';
import roles from './roles.js';
import usuarios from './usuarios.js';
import estados from './estados.js';
import tipotr from './tipotr.js';
import propiedades from './propiedades.js';
import db from "../config/db.js";
//Importamos el modelo que se llenara
import { Categoria, Precio, Roles, Usuario, Estado ,Tipotr, Propiedad,   } from '../models/index.js';

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
      Roles.bulkCreate(roles),
      Usuario.bulkCreate(usuarios),
      Estado.bulkCreate(estados),
      Tipotr.bulkCreate(tipotr),
      Propiedad.bulkCreate(propiedades),
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

