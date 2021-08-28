const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

//importar las colecciones o modelos
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

//Buscar por coleccion de usuarios
const buscarUsuarios = async (termino, res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  //si termino no es un id

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { email: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino, res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  });
  const total = await Categoria.countDocuments({
    nombre: regex,
    estado: true,
  });

  res.json({
    Total: total,
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");
  const total = await Producto.countDocuments({ nombre: regex, estado: true });
  res.json({
    results: {
      Total: total,
      productos,
    },
  });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      //accion
      break;
    case "categorias":
      //accion
      buscarCategorias(termino, res);
      break;
    case "productos":
      //accion
      buscarProductos(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Se me olvidó hacer la búsqueda",
      });
      break;
  }
};

module.exports = {
  buscar,
};
