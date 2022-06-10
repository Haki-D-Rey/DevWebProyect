import config from "../../config";
import * as mysql from 'mysql'
// const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_DATABASE,
  port: +config.DB_PORT,
  //insecureAuth: false,
});
conexion.connect((error) => {
  if (error) throw error;
  console.log(`!Conectado a la base de Datos ${config.DB_DATABASE}`);
});

export default conexion;
// module.exports = conexion;

//Sin da error"'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
//ejecutar esta consulta en workbench"
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
