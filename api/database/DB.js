import config from '../../config.js';
import * as mysql from 'mysql';
import * as util from 'util';

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

const queryPromise = util.promisify(conexion.query).bind(conexion);

export default queryPromise;
