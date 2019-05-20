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
    console.log(cancionesProcesadas)
    this.network = new brain.NeuralNetwork();
    return this.network.train(cancionesProcesadas, { iterations: process.env.ITERACIONES || 20000, log: true });

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
      //.mapValues(value => `${(value * 100).toFixed(2)}%`);
  }

  procesarCanciones() {
    return _.flatMap(this.listaCanciones, (({ idArtista, titulo, artista }) => titulo.split("\n").map(t => ({ input: this.encode(t) , output: _.set({}, idArtista, 1) }))))
  }

  encode(titulo) {
    const tituloChequeado = _.padEnd(titulo.toLowerCase(), 60)
    const a = tituloChequeado.substr(0,60)
    return a.split('').map(x => x.charCodeAt(0) / 256).filter(it => it > 0 && it < 1);
  }


}

module.exports = new Service();