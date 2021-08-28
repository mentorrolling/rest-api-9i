const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

const { existeProducto } = require("../helpers/db-validators");
const { existeCategoria } = require("../helpers/db-validators");

//middlewares
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const {
  obtenerProductos,
  obtenerProducto,
  crearProductos,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const router = Router();

//Obtener todos las producto - publico
router.get("/", obtenerProductos);

//Obtener los producto por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);

//crear producto privado
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID válido").isMongoId(),
    check("categoria").custom(existeCategoria),

    validarCampos,
  ],
  crearProductos
);

//actualizar registro por id privado
router.put(
  "/:id",
  [
    validarJWT,

    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  actualizarProducto
);

//borrar categoria privado - admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
