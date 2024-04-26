import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('casos', {
    idCaso: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    idEstadoFK: { type: DataTypes.INTEGER }, // Corregido a INTEGER
    idRobotFK: { type: DataTypes.INTEGER }, // Corregido a INTEGER
    nombre: { type: DataTypes.STRING },
    porcentaje: { type: DataTypes.INTEGER }, // Corregido a INTEGER
    datos: { type: DataTypes.BLOB },
    idtipo: { type: DataTypes.INTEGER },
    jsonNegocio:{type: DataTypes.JSON},
    fh_creacion:{type: DataTypes.DATE},
    fh_comienzo:{type: DataTypes.STRING},
    fh_fin:{type: DataTypes.DATE}// Corregido a INTEGER
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
