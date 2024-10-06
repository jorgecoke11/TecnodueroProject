import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('despliegue', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: { type: DataTypes.STRING },
    id_ejecutable_fk: { type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'ejecutables',
            key:'id'
        }
     },
    orden: { type: DataTypes.STRING },
    conmutador:{type: DataTypes.INTEGER}
}, {
    tableName:'despliegue',
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
