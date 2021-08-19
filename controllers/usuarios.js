const { request, response } = require("express");
const bcryptjs = require("bcryptjs"); //importamos para encriptar

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // console.log(req.query);
  let { limite = 10, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  const usuarios = await Usuario.find({ estado: true })
    .limit(limite)
    .skip(desde);

  const total = await Usuario.countDocuments({ estado: true });

  res.json({
    Total: total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, password, email, rol });
  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync(); //Numero de veces que se aplica la encriptación

  usuario.password = bcryptjs.hashSync(password, salt); //encriptamos la contraseña

  await usuario.save();

  res.json({
    msg: "Usuario creado",
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;

  const { _id, password, email, google, ...resto } = req.body;

  //Validar datos
  if (password) {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); //numero de veces que se aplicará encriptación
    resto.password = bcryptjs.hashSync(password, salt); //encriptación de contraseña
  }

  //Actualizar la data del usuario y guardar la respuesta en usuario
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    message: "Usuario actualizado",
    usuario,
  });
};
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //Borrar fisicamente

  // const usuario = await Usuario.findByIdAndDelete(id);

  //Inactivar usuario
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  // const usuarioAutenticado = req.usuario;

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
