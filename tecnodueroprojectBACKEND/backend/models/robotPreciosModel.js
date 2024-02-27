import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('robots', {
    idRobot: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    Nombre: { type: DataTypes.STRING }, // Corregido a INTEGER
    conmutador: { type: DataTypes.INTEGER }, // Corregido a INTEGER

}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
