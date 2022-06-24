import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config.js';
import nodemailer from 'nodemailer';
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
    res.status(500).json(0);
  }
};

export const actualizarcontrasenia = async (payload) => {
  const passwordCrypted = await bcrypt.hash(contrasenia, +config.SALT || 0);
  const queryUpdateUser = `UPDATE Usuario u INNER JOIN Persona p ON p.idUsuario = u.idUsuario SET u.contrasenia = ? WHERE p.correo = ?`;
  await queryPromise(queryUpdateUser, [passwordCrypted, payload.token]);
  return [200, null, 1];
};

export const olvidoContrasenia = async (payload) => {
  const queryUser = 'SELECT * FROM Usuario WHERE correo = ? AND estaActivo = 1';
  const [usuario] = await queryPromise(queryUser, [payload.correo]);
  const JWT = jwt.sign(usuario, 'sill');
  const url = `${config.ECOMMERCE_URL}/usuario/password?token=${JWT}`;
  const insertToken =
    'UPDATE Usuario u INNER JOIN Persona p ON p.idUsuario = u.idUsuario SET token = ? WHERE p.correo = ? AND estaActivo = 1';
  await queryPromise(insertToken, [JWT, payload.correo]);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'servicellmail01@gmail.com',
      pass: config.MAIL_PASS,
    },
  });

  transporter.verify().then(() => {
    console.log('Ready to send emails');
  });

  const mailOptions = {
    from: 'servicellmail01@gmail.com',
    to: payload.correo,
    subject: 'Recuperacion de cuenta Servicell',
    text: `Favor entre a este enlace ${url}`,
  };
  const response = await transporter.sendMail(mailOptions);
  return [200, null, response];
};
