import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const Usuario = db.define('usuarios', {
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
  imgPerfil: {
    type: DataTypes.STRING,
    allowNull: null
  },
  token: DataTypes.STRING,
  confirmado: DataTypes.BOOLEAN,
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  facebookId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  rolId: DataTypes.INTEGER,
  prueba: DataTypes.INTEGER,
  favoritos: DataTypes.INTEGER,
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  hooks: {
    beforeCreate: async function (usuario) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  },
  scopes: {
    eliminarPassword: {
      attributes: {
        exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
      }
    }
  }
});

//Metodos Personalizados
Usuario.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}



export default Usuario;

