//definiremos las rutas de las vistas como la de nuestros controllers
import express from "express";
const route = express.Router();
const mysql = require("../database/DB");
const authoController = require("../controllers/authController");
route.get("/", (req, res) => {
  res.render("index");
});

route.get("/login", (req, res) => {
  res.render("login");
});

route.get("/Registro", (req, res) => {
  res.render("registro");
});

//router para los metodos de  los controller
route.post("/registro", authoController);
module.exports = route;
