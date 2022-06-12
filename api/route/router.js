//definiremos las rutas de las vistas como la de nuestros controllers
import { Router } from 'express';
import verifyToken from '../middleware/token.js';
import { login } from '../controllers/authController.js';
export const route = Router();
route.get('/', (req, res) => {
  res.render('index');
});

//router para los metodos de  los controller
route.get('/login', login);

route.get('/productos', verifyToken, (req, res) => {
  res.json('hayro es imbecil');
});
