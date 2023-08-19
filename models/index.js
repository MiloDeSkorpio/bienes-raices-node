import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Categoria from './Categoria.js';
import Estado from './Estado.js';
import Municipio from './Municipio.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';
import Roles from './Roles.js';
import Tipotr from './Tipotr.js';

Propiedad.belongsTo(Precio, {foreignKey: 'precioId'});
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Propiedad.belongsTo(Estado, {foreignKey: 'estadoId'});
Propiedad.belongsTo(Municipio, {foreignKey: 'municipioId'})
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'});
Propiedad.belongsTo(Tipotr, {foreignKey: 'tipoId'});
Propiedad.hasMany(Mensaje, {foreignKey: 'propiedadId'});

Municipio.belongsTo(Estado, {foreignKey: 'estadoId'})

Mensaje.belongsTo(Propiedad, {foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'})

Usuario.belongsTo(Roles,{foreignKey: 'rolId'})


export {
  Propiedad,
  Precio,
  Categoria,
  Estado,
  Municipio,
  Usuario,
  Mensaje,
  Roles,
  Tipotr,
}