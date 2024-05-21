import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('avisos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    titulo: { type: DataTypes.STRING },
    fecha: { type: DataTypes.STRING },
    hora: { type: DataTypes.STRING },
    id_direccion: {
        type: DataTypes.INTEGER,
        allowNull: false, // Esto asegura que cada dirección esté asociada a una direccion
        references: {
            model: 'direcciones', // Referencia a la tabla de clientes
            key: 'id' // Clave primaria de la tabla de clientes
        }
    },
    observaciones: { type: DataTypes.TEXT },
    presupuesto: { type: DataTypes.FLOAT },
    tipo: { type: DataTypes.STRING },
    estado:{type: DataTypes.INTEGER}
}, {
    tableName:'avisos',
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
