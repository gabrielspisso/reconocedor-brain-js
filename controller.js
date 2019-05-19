const service = require('./service');

class Controller {

  verBaseConocimiento(req, res) {
    const listaCanciones = service.verBaseConocimiento();
    return res.json({ count: listaCanciones.length, results: listaCanciones });
  }

  agregarArtista({ query: { nombre } }, res) {
    return service.agregarArtista(nombre)
      .then((listaCanciones) => res.json({ count: listaCanciones.length, results: listaCanciones  }))

  }

  entrenarRed(req, res) {
    const error = service.entrenarRed();
    return res.json(error);
  }

  buscarArtista({ query: { nombre } }, res) {
    return service.buscarArtista(nombre)
      .then(artista => res.json(artista));

  }

  preguntar({ query: { titulo } }, res)
  {
    const respuesta = service.preguntar(titulo);
    return res.json({ respuesta });
  }

}

module.exports = new Controller();