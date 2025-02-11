import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('maquinas', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    nombre: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER }, // Corregido a INTEGER
    ip: { type: DataTypes.STRING }, // Corregido a INTEGER
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
