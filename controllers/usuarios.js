const { request, response } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  res.json({
    msg: "GET usuarios",
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, email, password, rol });

  await usuario.save();

  res.json({
    msg: "Usuario creado",
    usuario,
  });
};

const usuariosPut = (req = request, res = response) => {
  res.json({
    msg: "PUT usuarios",
  });
};
const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "Delete usuarios",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
