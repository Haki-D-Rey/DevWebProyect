import express from 'express';
import { route } from './api/route/router.js';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
/*
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      // Dirección desde donde se pueden hacer peticiones
      if (!['http://localhost:4000'].includes(origin)) {
        return callback(
          new Error(
            `La política CORS para el origen ${origin} no permiten el acceso al servidor.`
          ),
          false
        );
      }
      return callback(null, true);
    },
  })
);*/

// setamos la carptea publica para fornt endc:\Users\Haki\AppData\Local\Programs\Microsoft VS Code\resources\app\out\vs\code\electron-browser\workbench\workbench.html
//app.use(express.static("public"));

//para procesar daros enviados desde los formularios o plantillas UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser)

//Llamar al Router
app.use('/', route);

export default app;
