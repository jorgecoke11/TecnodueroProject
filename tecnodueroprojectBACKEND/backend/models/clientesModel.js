import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('clientes', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    nombre: { type: DataTypes.STRING }, // Corregido a INTEGER
    apellidos: { type: DataTypes.STRING }, 
    telefono:{type: DataTypes.INTEGER},
    email:{type: DataTypes.STRING},
    nif:{type: DataTypes.STRING}// Corregido a INTEGER

}, {
    tableName: 'clientes',
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
