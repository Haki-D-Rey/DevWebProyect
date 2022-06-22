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
  obtenerProductoPorId,
  obtenerProductos,
} from '../controllers/productController.js';
import { validateParams } from '../../utils.js';

export const route = Router();

route.get('/', (_, res) => {
  res.render('Api Cargo correctamente');
});

route.get('/usuario', iniciarSesion);
route.post('/usuario', registrarUsuario);

route.post('/producto', verifyToken, async (req, res) => {
  const params = [
    { name: 'nombreProducto', param: 'body', type: 'string' },
    { name: 'idCategoria', param: 'body', type: 'number' },
    { name: 'precio', param: 'body', type: 'number' },
    { name: 'existencia', param: 'body', type: 'number' },
    { name: 'fechaCreacion', param: 'body', type: 'string' },
    { name: 'descuento', param: 'body', type: 'number' },
  ];

  const [invalid, payload] = validateParams(params, req);
  if (invalid.length) res.status(500).send(invalidResponse(invalid));
  else res.json(await agregarProducto(payload));
});

route.get('producto', verifyToken, async (_, res) => {
  res.json(await obtenerProductos());
});

route.get('/producto/:id', async (req, res) => {
  const payload = {
    idProducto: req.query.id,
  };
  res.json(await obtenerProductoPorId(payload));
});

route.delete('/producto/:id', verifyToken, async (req, res) => {
  const payload = {
    idProducto: req.query.id,
  };

  res.json(await eliminarProducto(payload));
});

route.put('/producto/:id', verifyToken, async (req, res) => {
  const params = [
    { name: 'idProducto', param: 'query', type: 'number' },
    { name: 'nombreProducto', param: 'body', type: 'string' },
    { name: 'precio', param: 'body', type: 'number' },
    { name: 'existencia', param: 'body', type: 'number' },
    { name: 'fechaModificacion', param: 'body', type: 'string' },
    { name: 'descuento', param: 'body', type: 'number' },
    { name: 'idCategoria', param: 'body', type: 'number' },
  ];

  const [invalid, payload] = validateParams(params, req);

  if (invalid) res.status(500).send(invalidResponse(invalid));

  res.send(await editarProducto(payload));
});

const invalidResponse = (invalidParams = []) =>
  `Error en los parametros ${JSON.stringify(invalidParams)}`;

