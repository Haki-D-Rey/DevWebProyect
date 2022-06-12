import express from 'express';
import { route } from './api/route/router.js';

const app = express();

// setaeamos el motor de plantilla
app.set('view engine', 'ejs');

// setamos la carptea publica para fornt end
//app.use(express.static("public"));

//para procesar daros enviados desde los formularios o plantillas UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser)

//Llamar al Router
app.use('/', route);

export default app;
