import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Roles = db.define('roles',{ 
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
});

export default Roles