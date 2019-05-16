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
    service.entrenarRed();
    return res.status(200).end();
  }

  buscarArtista({ query: { nombre } }, res) {
    return service.buscarArtista(nombre)
      .then(artista => res.json(artista));

  }

  preguntar({ query: { titulo } }, res)
  {
    console.log("EEE", titulo)
    const respuesta = service.preguntar(titulo);
    return res.json({ respuesta });
  }

}

module.exports = new Controller();