import Sequelize from "sequelize";
import db from "../config/db.js";

const CuentaExterna = db.define(
  "CuentaExterna",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoCuenta: {
      type: Sequelize.ENUM("google", "facebook", "apple"),
      allowNull: false,
    },
    idUsuarioExterno: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expiresIn: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    idToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);


export default CuentaExterna;
