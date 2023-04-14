import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';
import Roles from './Roles.js';

Propiedad.belongsTo(Precio, {foreignKey: 'precioId'});
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'});
Propiedad.hasMany(Mensaje, {foreignKey: 'propiedadId'})

Mensaje.belongsTo(Propiedad, {foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'})

Usuario.belongsTo(Roles,{foreignKey: 'rolId'})


export {
  Propiedad,
  Precio,
  Categoria,
  Usuario,
  Mensaje,
  Roles
}