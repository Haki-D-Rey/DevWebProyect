import jwt from 'jsonwebtoken';
import mysql from '../database/DB.js';

export const iniciarSesion = async (req, res) => {
  try {
    const { username, password } = req.body;

    mysql.query(
      'SELECT * FROM Usuario WHERE username=? AND password=?',
      [username, password],
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
  } catch (error) {
    console.log(error);
    res.status(500).send('Huo un errror');
  }
};
