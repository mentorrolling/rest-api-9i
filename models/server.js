const express = require("express");

const cors = require("cors");

class Server {
  constructor() {
    //inicialicen cuando se levente el server
    this.app = express();
    this.usuariosPath = "/api/usuarios";
    //middlewares
    this.middlewares();

    //rutas
    this.routes();
  }

  middlewares() {
    //Carpeta pública
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());
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
