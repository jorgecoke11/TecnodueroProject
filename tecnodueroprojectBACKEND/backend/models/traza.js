import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('traza', {
    id: { type: DataTypes.NUMBER,
        primaryKey: true },
    mensaje: { type: DataTypes.STRING },
    ejecutor:{type: DataTypes.STRING},
    id_caso_fk: {
        type: DataTypes.STRING, // Corregido a INTEGER
        allowNull: false,
        references: {
            model: 'casos', 
            key: 'idCaso' 
        }
    },
    ruta_foto:{type: DataTypes.STRING}
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
 