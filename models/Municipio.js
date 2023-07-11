import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Municipio = db.define('municipios',{ 
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zoom: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

export default Municipio