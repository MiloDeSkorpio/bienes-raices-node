import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';


const Usuario = db.define('usuarios',{
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token:DataTypes.STRING,
  confirmado: DataTypes.BOOLEAN,
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async function(usuario){
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  },
  scopes: {
    eliminarPassword:{
      attributes:{
        exclude: ['password','token','confirmado','createdAt','updatedAt']
      }
    }
  }
});

//Metodos Personalizados
Usuario.prototype.verificarPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

// Middleware de identificación de usuario
Usuario.identificarUsuario = async function(req, res, next) {
  // Verificar si existe el header Authorization en la petición
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
  }
  
  // Obtener el token de autorización de la petición
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verificar el token
    const usuarioToken = jwt.verify(token, jwtSecret);

    // Buscar al usuario en la base de datos por su ID
    const usuario = await Usuario.findByPk(usuarioToken.id, { 
      attributes: { exclude: ['password'] }
    });

    // Verificar si el usuario existe en la base de datos
    if (!usuario) {
      return res.status(401).json({ error: 'No se pudo identificar al usuario' });
    }

    // Agregar el objeto usuario a la petición
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export default  Usuario;

