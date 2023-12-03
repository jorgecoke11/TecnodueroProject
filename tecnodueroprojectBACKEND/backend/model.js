//conexion a la base de datos
import db from "./db.js";
import { DataTypes } from "sequelize";

export default  db.define('usuarios',{
    id_usuario: {type: DataTypes.NUMBER },
    nombre: {type: DataTypes.STRING },
    apellido_1: {type: DataTypes.STRING },
    apellido_2: {type: DataTypes.STRING },
    password: {type: DataTypes.STRING },
    username: {type: DataTypes.STRING },
    tipo_usuario: {type: DataTypes.STRING }
})
