import config from '../../config.js';
import * as mysql from 'mysql';

const conexion = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_DATABASE,
  port: config.DB_PORT ? +config.DB_PORT : undefined,
});
conexion.connect((error) => {
  if (error) throw error;
  console.log(`!Conectado a la base de Datos ${config.DB_DATABASE}`);
});

export default conexion;
