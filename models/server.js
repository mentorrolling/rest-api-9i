const express = require("express");

const cors = require("cors");

//importar conexión a BD
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    //inicialicen cuando se levente el server
    this.app = express();
    this.usuariosPath = "/api/usuarios";

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
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
