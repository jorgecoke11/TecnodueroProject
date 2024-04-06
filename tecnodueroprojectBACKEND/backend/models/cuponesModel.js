import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('cupon', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    nombre: { type: DataTypes.STRING }, // Corregido a INTEGER
    cupon: { type: DataTypes.STRING }, // Corregido a INTEGER

}, {
    tableName: 'cupon',
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
