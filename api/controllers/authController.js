import express from "express";
import jsonwebtoken from "jsonwebtoken";

const { promisify } = require("util");
const bcryptjs = require("bcryptjs");
const route = express.Router();
const mysql = require("../database/DB");

//Peticion para Registranos
exports.registro = async (req, res) => {
  const objetoRegistro = {
    userName: req.body.userName,
    password: req.body.password,
  };
};
