import { DataTypes } from "sequelize";
import db from '../config/db.js';

const TipoSubs = db.define('tiposubs',{ 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: DataTypes.INTEGER,
    duracion: DataTypes.INTEGER,
    limite: DataTypes.BIGINT
    
});

export default TipoSubs;