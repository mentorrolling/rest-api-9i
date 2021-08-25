const { response } = require("express");
const Producto = require("../models/producto");

//obtener Productos- paginado- total- populate

const obtenerProductos = async (req, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre email")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    Total: total,
    productos,
  });
};

//Obtener producto - populate {}
const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre email")
    .populate("categoria", "nombre");

  res.json({
    producto,
  });
};

//Crear producto
const crearProductos = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  // let { precio, categoria, descripcion, nombre } = req.body;
  // nombre = nombre.toUpperCase();
  // categoria = categoria.toUpperCase();

  // const categoriaDB = await Categoria.findOne({
  //   nombre: categoria,
  // });
  // if (!categoriaDB) {
  //   return res.status(400).json({
  //     msg: `La categoría ${categoria} no existe`,
  //   });
  // }

  const productoDB = await Producto.findOne({
    nombre: body.nombre.toUpperCase(),
  });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }

  //Generar la data
  // const data = {
  //   nombre,
  //   precio,
  //   usuario: req.usuario._id,
  //   categoria: categoriaDB._id,
  //   descripcion,
  // };

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  //Guardar DB

  await producto.save();

  res.status(201).json(producto);
};

//Actualizar categoria--------------------------------
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { _id, estado, usuario, ...resto } = req.body;

  if (resto.nombre) {
    resto.nombre = resto.nombre.toUpperCase();
  }
  resto.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Producto actualizado",
    producto,
  });
};

//Borrar Categoria
const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "Producto eliminado",
    producto,
  });
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProductos,
  actualizarProducto,
  borrarProducto,
};
