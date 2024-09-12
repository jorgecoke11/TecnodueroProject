import db from "../db.js";
import { DataTypes } from "sequelize";

export default db.define('ejecucion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, // Corregido a INTEGER
    id_caso_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'casos', 
            key: 'idCaso' 
        }
    },
    id_estado_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estados_ejecucion', 
            key: 'id_estado' 
        }
    },

    id_ejecutable_fk: {
        type: DataTypes.STRING, // Corregido a INTEGER
        allowNull: false,
        references: {
            model: 'ejecutables', 
            key: 'id' 
        },

    },
    fh_inicio: {
        type: DataTypes.STRING
    },
    fh_fin: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    underscored: false, // Usa el estilo de nomenclatura snake_case para las columnas
});
