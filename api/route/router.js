//definiremos las rutas de las vistas como la de nuestros controllers
import { Router } from 'express';
import verifyToken from '../middleware/token.js';
import {
  iniciarSesion,
  registrarUsuario,
} from '../controllers/authController.js';
import {
  agregarProducto,
  editarProducto,
  eliminarProducto,
  obtenerProductos,
} from '../controllers/productController.js';

export const route = Router();

route.get('/', (req, res) => {
  res.render('Api Cargo correctamente');
});

//router para los metodos de  los controller
route.get('/usuario', iniciarSesion);
route.post('/usuario', registrarUsuario);

route.post('/product', verifyToken, async (req, res) => {
  const payload = ({
    nombreProducto,
    precio,
    existencia,
    fechaCreacion,
    fechaModificacion = null,
    descuento,
    estaActivo = 1,
  } = req.body);
  res.json(await agregarProducto(payload));
});
route.get('producto', verifyToken, async (_, res) => {
  res.json(await obtenerProductos());
});
route.get('/producto/:id', async (req, res) => {
  const payload = {
    idProducto: req.query.id,
  };
  res.json(await obtenerProductosPorId(payload));
});

route.delete('/producto/:id', verifyToken, async (req, res) => {
  const payload = {
    idProducto: req.query.id,
  };

  res.json(await eliminarProducto(payload));
});

route.put('/producto/:id', verifyToken, async (req, res) => {
  const payload = ({
    idProducto: req.query.id,
    nombreProducto,
    precio,
    existencia,
    fechaModificacion,
    descuento,
    idCategoria,
  } = req.body);
  res.send(await editarProducto(payload));
});
