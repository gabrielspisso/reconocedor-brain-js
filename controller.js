const service = require('./service');

class Controller {

  verBaseConocimiento(req, res) {
    return res.json({ results: service.verBaseConocimiento() });
  }

  agregarArtista(req, res) {

  }

  entrenarRed(req, res) {

  }

  buscarArtista({ query: { nombre } }, res) {
    return service.buscarArtista(nombre)
      .then(artista => res.json(artista));

  }

}

module.exports = new Controller();