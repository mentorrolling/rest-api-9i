const { response } = require("express");
const Categoria = require("../models/categoria");

//obtener categorias- paginado- total- populate
const obtenerCategorias = async (req, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments({ estado: true }),
    Categoria.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre email"),
  ]);

  res.json({
    Total: total,
    categorias,
  });
};

//Obtener categoria - populate {}
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate(
    "usuario",
    "nombre email"
  );

  res.json({
    categoria,
  });
};

//Crear categoria----------------------------------------
const crearCategorias = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe`,
    });
  }

  //Generar la data
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();
  res.status(201).json(categoria);
};

//Actualizar categoria--------------------------------
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  resto.nombre = resto.nombre.toUpperCase();

  const categoria = await Categoria.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Categoría actualizada",
    categoria,
  });
};

//Borrar Categoria------------------------------------
const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "Categoría eliminada",
    categoria,
  });
};

module.exports = {
  crearCategorias,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
