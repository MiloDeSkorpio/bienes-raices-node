import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Subscripciones = db.define('subscripciones',{ 
    startSub: {
        type: DataTypes.DATE,
        allowNull: true
      },
      endSub: {
        type: DataTypes.DATE,
        allowNull: true
      },
});

export default Subscripciones;