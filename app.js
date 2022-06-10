import express from "express";
//import config from "./config"; //seteo de variables de entornos
import cookieParser from "cookie-parser";
import router from "./api/route/router";

const app = express();

// setaeamos el motor de plantilla
app.set("view engine", "ejs");

// setamos la carptea publica para fornt end
//app.use(express.static("public"));

//para procesar daros enviados desde los formularios o plantillas UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//trabajando con las cookies
//app.use(cookieParser)

//Llamar al Router
app.use("/", router);

//Enviamos a "port", el parametro de la variable de entorno
/*app.set("port", config.port);
// mandamos a escuchar la url y puerto del servidor con variables de
app.listen(app.get("port"), () => {
  console.log("SERVER UP Running http://localhost:4000");
});
*/
module.exports = app;
