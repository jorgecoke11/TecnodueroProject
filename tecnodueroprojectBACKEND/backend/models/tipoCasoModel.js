import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('tipocaso', {
    idtipo: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    id_proceso: {type: DataTypes.STRING}
}, {
    tableName: 'tipocaso', // Establecer el nombre de la tabla sin 's' al final
    timestamps: false,
    underscored: false,
});
