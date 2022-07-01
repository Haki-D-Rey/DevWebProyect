import express from 'express';
import { route } from './api/route/router.js';
import categoriaRouter from './api/route/categoriaRouter.js';
import cors from 'cors';

const app = express();
// const Cors = cors();

/*app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', route);
app.use('/categoria', categoriaRouter);

export default app;
