import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('ejecucion', {
    id_ejecucion: { type: DataTypes.INTEGER,
        primaryKey: true }, // Corregido a INTEGER
    id_caso_fk: { type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'casos', // Referencia a la tabla de clientes
            key: 'idCaso' // Clave primaria de la tabla de clientes
        }
    },
    id_ejecutable_fk: { type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'ejecutables',
            key: 'id'
        }
     }, // Corregido a INTEGER
    ip: { type: DataTypes.STRING }, // Corregido a INTEGER
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
