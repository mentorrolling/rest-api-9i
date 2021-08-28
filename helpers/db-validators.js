const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};

const idExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeCategoria = async (id) => {
  const existeCat = await Categoria.findById(id);

  if (!existeCat) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeProducto = async (id) => {
  const existeProd = await Producto.findById(id);

  if (!existeProd) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  emailExiste,
  idExiste,
  existeCategoria,
  existeProducto,
};
