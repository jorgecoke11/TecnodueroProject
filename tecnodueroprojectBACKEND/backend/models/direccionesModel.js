import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('direcciones', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_cliente: { 
        type: DataTypes.INTEGER,
        allowNull: false, // Esto asegura que cada dirección esté asociada a un cliente
        references: {
            model: 'clientes', // Referencia a la tabla de clientes
            key: 'id' // Clave primaria de la tabla de clientes
        }
    },
    calle: { 
        type: DataTypes.STRING 
    },
    ciudad: { 
        type: DataTypes.STRING 
    },
    provincia: { 
        type: DataTypes.STRING 
    },
    cod_postal: { 
        type: DataTypes.STRING 
    }
}, {
    tableName: 'direcciones',
    timestamps: false,
    underscored: false
});
