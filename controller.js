const service = require('./service');

class Controller {

  verBaseConocimiento(req, res) {
    const listaCanciones = service.verBaseConocimiento();
    return res.json({ results: listaCanciones, count: listaCanciones.length });
  }

  agregarArtista({ query: { nombre } }, res) {
    return service.agregarArtista(nombre)
      .then((listaCanciones) => res.json({ results: listaCanciones, count: listaCanciones.length }))

  }

  entrenarRed(req, res) {

  }

  buscarArtista({ query: { nombre } }, res) {
    return service.buscarArtista(nombre)
      .then(artista => res.json(artista));

  }

}

module.exports = new Controller();