const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async (req = request, res = response) => {
  //recibir el email y el password

  const { email, password } = req.body;

  try {
  } catch (error) {}

  try {
    //verificar el email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //usuario activo?
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - estado: false",
      });
    }
    //verificar contraseña

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //generar el Token
    const token = "llooo4568";

    res.json({
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hablar con el admin",
    });
  }
};

module.exports = {
  login,
};
