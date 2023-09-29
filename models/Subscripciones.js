import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Subscripciones = db.define('subscripciones',{ 
      endSub: {
        type: DataTypes.DATE,
        allowNull: true
      },
});

export default Subscripciones;