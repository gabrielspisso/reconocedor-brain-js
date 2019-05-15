const geniusApi = require("./geniusApi");

class Service {
  constructor() {
    this.listaCanciones = [];
  }

  verBaseConocimiento() {
    return this.listaCanciones;

  }

  agregarArtista() { 


  }

  entrenarRed() {

  }

  buscarArtista(nombre) {
    return geniusApi.obtenerArtistaPorNombre(nombre);
  }

}

module.exports = new Service();