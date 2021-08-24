const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

const router = Router();
// controladores

//middlewares
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const { emailExiste, idExiste } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "Debe tener una contraseña").not().isEmpty().trim(),
    check(
      "password",
      "La contraseña debe tener 5 caracteres como mínimo"
    ).isLength({
      min: 6,
    }),
    check("email", "No es un correo valido").isEmail(),
    check("email").custom(emailExiste),
    check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
