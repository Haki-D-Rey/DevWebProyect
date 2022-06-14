//definiremos las rutas de las vistas como la de nuestros controllers
import { Router } from 'express';
import verifyToken from '../middleware/token.js';
import {
  iniciarSesion,
  registrarUsuario,
} from '../controllers/authController.js';

export const route = Router();

route.get('/', (req, res) => {
  res.render('Api Cargo correctamente');
});

//router para los metodos de  los controller
route.get('/usuario', iniciarSesion);
route.post('/usuario', registrarUsuario);
route.put('/usuario', (req, res) => {
  res.send('actualizar usuario');
});
route.delete('/usuario', verifyToken, (req, res) => {
  res.send('borrar usuario');
});
