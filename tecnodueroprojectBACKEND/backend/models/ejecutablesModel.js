import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('ejecutables', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    nombre: { type: DataTypes.STRING }
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
