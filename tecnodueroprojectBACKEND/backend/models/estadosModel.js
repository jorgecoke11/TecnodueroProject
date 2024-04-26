import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('estados', {
    idEstado: { type: DataTypes.NUMBER,
        primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    final:{type: DataTypes.NUMBER}
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
 