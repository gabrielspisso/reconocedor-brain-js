const geniusApi = require("./geniusApi");

class Service {
  constructor() {
    this.listaCanciones = [];
  }

  verBaseConocimiento() {
    return this.listaCanciones;

  }

  agregarArtista(nombre) { 
    return this.buscarArtista(nombre)
      .then(({ id }) => geniusApi.cancionesDelArtista(id))
      .tap(canciones => this.listaCanciones = this.listaCanciones.concat(canciones))

  }

  entrenarRed() {

  }

  buscarArtista(nombre) {
    return geniusApi.obtenerArtistaPorNombre(nombre);
  }

}

module.exports = new Service();