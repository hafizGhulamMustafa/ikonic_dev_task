// config/db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DB_NAME || "ikonic_task_db",
  logging: false,
});

module.exports = sequelize;
