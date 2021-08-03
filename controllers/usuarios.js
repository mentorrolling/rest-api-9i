const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  res.json({
    msg: "GET usuarios",
  });
};

const usuariosPost = (req = request, res = response) => {
  res.json({
    msg: "POST usuarios",
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
