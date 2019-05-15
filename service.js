const geniusApi = require("./geniusApi");

class Service {

  verArtistas() {
    

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