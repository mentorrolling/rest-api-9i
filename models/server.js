const express = require("express");

const cors = require("cors");

//importar conexión a BD
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    //inicialicen cuando se levente el server
    this.app = express();
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    //path categorias
    this.categoriasPath = "/api/categorias";
    //path productos
    this.productosPath = "/api/productos";
    //path buscador
    this.buscarPath = "/api/buscar";
    //conexion
    this.conectarDB();
    //middlewares
    this.middlewares();

    //rutas
    this.routes();
  }

  //funcion para conectar la BD
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //Carpeta pública
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());

    //acceso al body leer y parsear
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.productosPath, require("../routes/productos"));
    this.app.use(this.buscarPath, require("../routes/buscar"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
