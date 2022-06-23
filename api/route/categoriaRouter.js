import { Router } from 'express';
import {
  agregarCategoria,
  obtenerCategorias,
  eliminarCategoria,
} from '../controllers/categoriaController.js';
import verifyToken from '../middleware/token.js';
import { invalidResponse, validateParams } from '../../utils.js';

const route = Router();

route.post('/', verifyToken, async (req, res) => {
  const params = [
    { name: 'nombreCategoria', param: 'body', type: 'string' },
    { name: 'descripcion', param: 'body', type: 'string' },
    { name: 'fechaCreacion', param: 'body', type: 'string' },
  ];

  const [invalid, payload] = validateParams(params, req);
  if (invalid.length) res.status(500).send(invalidResponse(invalid));

  const [status, error, response] = await agregarCategoria(payload);

  res.status(status).json(error || response);
});

route.get('/', verifyToken, async (req, res) => {

  const [invalid, _] = validateParams([], req);
  if (invalid.length) res.status(500).send(invalidResponse(invalid));

  const [status, error, response] = await obtenerCategorias();
  res.status(status).json(error || response)


});

route.delete('/:id', verifyToken, async (req, res) => {
  const params = [
    { name: 'idCategoria', params: 'query', type: 'number' }
  ];
  const [invalid, payload] = validateParams(params, req);
  if (invalid.length) res.status(500).send(invalidResponse(invalid));

  const [status, error, response] = await eliminarCategoria(payload);
  res.status(status).json(error || response);

})

export default route;