import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Tipotr = db.define('tipotr',{ 
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
});

export default Tipotr