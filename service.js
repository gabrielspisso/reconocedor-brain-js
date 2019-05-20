const geniusApi = require("./geniusApi");
const brain = require('brain.js')
const _ = require("lodash");
const base = require("./base");

class Service {
  constructor() {
    this.listaCanciones = base;
    this.network = {}
  }

  verBaseConocimiento() {
    return this.listaCanciones;

  }

  agregarArtista(nombre) { 
    return this.buscarArtista(nombre)
      .then(({ id }) => geniusApi.cancionesDelArtista(id))
      .then(canciones => this.agregarCanciones(canciones))
  }

  entrenarRed() {
    const cancionesProcesadas = this.procesarCanciones();
    this.network = new brain.NeuralNetwork();
    return this.network.train(cancionesProcesadas, { iterations: process.env.iteraciones || 100000, log: true });
  }

  buscarArtista(nombre) {
    return geniusApi.obtenerArtistaPorNombre(nombre);
  }

  agregarCanciones(canciones) {
    this.listaCanciones = this.listaCanciones.concat(canciones);
    return this.listaCanciones;
  }

  preguntar(titulo) {
    const resultado = this.network.run(this.encode(titulo));
    return _(resultado)
      .mapKeys((value, idArtista) => _.find(this.listaCanciones, { idArtista: parseInt(idArtista) }).artista)
      .mapValues(value => value)//`${(value * 100).toFixed(2)}%`);
  }

  procesarCanciones() {
    return this.listaCanciones.map(({ idArtista, titulo, artista }) =>  ({ input: this.encode(titulo) , output: _.set({}, idArtista, 1) }))
  }

  encode(titulo) {
    const tituloChequeado = _.padEnd(titulo, 20)
    const a = tituloChequeado.substring(0, 20)
    return a.split('').map(x => x.charCodeAt(0) / 256).filter(it => it > 0 && it < 1);
  }


}

module.exports = new Service();