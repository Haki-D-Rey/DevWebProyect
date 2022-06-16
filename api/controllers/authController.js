import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config.js';
import queryPromise from '../database/DB.js';

export const iniciarSesion = async (req, res) => {
  try {
    const { nombreUsuario, contrasenia, estaActivo = 1 } = req.query;
    const obtenerUsuario =
      'SELECT * FROM Usuario WHERE nombreUsuario=? AND EstaActivo=?';
    const [row] = await queryPromise(obtenerUsuario, [
      nombreUsuario,
      estaActivo,
    ]);

    const doMatch = await bcrypt.compare(contrasenia, row.contrasenia);
    if (!doMatch) {
      res.status(401).json('Usuario o contrasenia no es correcto');
      console.error('Error contrasenia');
      return;
    }

    const data = JSON.stringify(row);
    const TOKEN = jwt.sign(data, 'stil');
    res.json({ TOKEN });
  } catch (error) {
    res.status(500).send(`Hubo un errror ${error}`);
  } finally {
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const {
      idRol,
      nombreUsuario,
      fechaRegistro,
      fechaModificacion = null,
      estaActivo = 1,
      contrasenia,
      nombres,
      apellidos,
      correo,
      direccion,
      telefono,
    } = req.body;
    const encrypted = await bcrypt.hash(
      contrasenia,
      config.SALT ? +config.SALT : 0
    );
    const insertUsuario = `INSERT INTO Usuario(idRol, nombreUsuario, contrasenia, fechaRegistro, fechaModificacion, estaActivo) 
    VALUES(?,?,?,?,?,?)`;
    queryPromise(insertUsuario, [
      idRol,
      nombreUsuario,
      encrypted,
      fechaRegistro,
      fechaModificacion,
      estaActivo,
    ]);
    const [{ idUsuario }] = await queryPromise(
      'SELECT @@identity AS idUsuario'
    );

    const insertPersonna = `INSERT INTO Persona (idUsuario,nombres, apellidos, nombreCompleto, correo, direccion, telefono, estaActivo)
    VALUES(?,?,?,?,?,?,?,?)`;
    queryPromise(insertPersonna, [
      idUsuario,
      nombres,
      apellidos,
      `${nombres} ${apellidos}`,
      correo,
      direccion,
      telefono,
      estaActivo,
    ]);

    res.status(200).json(1);
  } catch (error) {
    res.status(500).send(0);
  }
};
