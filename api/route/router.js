//definiremos las rutas de las vistas como la de nuestros controllers
import { Router } from "express";
import { registro } from '../controllers/authController'
export const route = Router();
// const authoController = require("../controllers/authController");

route.get("/", (req, res) => {
  res.render("index");
});

route.get("/login", (req, res) => {
  res.render("login");
});

//router para los metodos de  los controller
route.get("/registro", registro);
