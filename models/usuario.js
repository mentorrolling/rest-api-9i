const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//para no mostrar password ni __v
UsuarioSchema.methods.toJSON = function () {
  const { password, __v, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
