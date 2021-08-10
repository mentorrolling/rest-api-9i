const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

const router = Router();

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.delete("/:id", usuariosDelete);

module.exports = router;
