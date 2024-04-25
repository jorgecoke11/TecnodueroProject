import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('parametros', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    codigo: { type: DataTypes.STRING }, // Corregido a INTEGER
    valor: { type: DataTypes.STRING }, // Corregido a INTEGER
    id_robot_fk:{type:DataTypes.INTEGER}

}, {
    tableName: 'parametros',
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
