import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('ejecutables', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    nombre: { type: DataTypes.STRING },
    id_robot_fk:{type: DataTypes.INTEGER},
    ruta:{type:DataTypes.STRING},
    status:{type:DataTypes.INTEGER}
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
