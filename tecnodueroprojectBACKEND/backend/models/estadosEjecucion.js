import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('estados_ejecucion', {
    id_estado: { type: DataTypes.NUMBER,
        primaryKey: true },
    nombre: { type: DataTypes.STRING }
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
 