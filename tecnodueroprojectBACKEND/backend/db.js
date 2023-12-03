import { Sequelize } from "sequelize";
import data from "./data.js"
const db = new Sequelize(data.MYSQL_DATABASE, data.MYSQL_USER, data.MYSQL_PASSWORD,{
    host: data.MYSQL_HOST,
    dialect: data.MYSQL_DIALECT
});

export default db