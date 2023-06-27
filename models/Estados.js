import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Estados = db.define('estados',{ 
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
});

export default Estados