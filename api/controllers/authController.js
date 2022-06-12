import jwt from 'jsonwebtoken';
import mysql from '../database/DB.js';

export const login = async (req, res) => {
  const objetoRegistro = {
    userName: req.body.userName,
    password: req.body.password,
  };
  mysql.query(
    'SELECT * FROM Usuario WHERE userName=? AND clave=?',
    [objetoRegistro.userName, objetoRegistro.password],
    (err, rows) => {
      if (err) {
        res.json('Usuario o clave incorrectos');
        throw new Error(`error ${err}`);
      }
      const data = JSON.stringify(rows[0]);
      const TOKEN = jwt.sign(data, 'stil');
      res.json({ TOKEN });
    }
  );
};
