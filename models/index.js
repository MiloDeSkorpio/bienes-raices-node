import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';
import Roles from './Roles.js';
import Estado from './Estado.js';
import CuentaExterna from './CuentaExterna.js';


Propiedad.belongsTo(Precio, {foreignKey: 'precioId'});
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'});
Propiedad.hasMany(Mensaje, {foreignKey: 'propiedadId'});
Propiedad.belongsTo(Estado, {foreignKey: 'estadoId'});

Mensaje.belongsTo(Propiedad, {foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'})

Usuario.belongsTo(Roles,{foreignKey: 'rolId'})

CuentaExterna.belongsTo(Usuario, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Usuario.hasMany(CuentaExterna, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

export {
  Propiedad,
  Precio,
  Categoria,
  Usuario,
  Mensaje,
  Roles,
  Estado,
  CuentaExterna
}