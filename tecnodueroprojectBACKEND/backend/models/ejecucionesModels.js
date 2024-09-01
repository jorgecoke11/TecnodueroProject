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
    id_estado:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estados_ejecucion', // Referencia a la tabla de clientes
            key: 'id_estado' // Clave primaria de la tabla de clientes
        }
    },
    
    id_bloque: { type: DataTypes.STRING, // Corregido a INTEGER
    allowNull: false,
    references: {
        model: 'bloques', // Referencia a la tabla de clientes
        key: 'id_bloque' // Clave primaria de la tabla de clientes
    }
}
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
