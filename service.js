const geniusApi = require("./geniusApi");
const brain = require('brain.js')
const network = new brain.NeuralNetwork({
  binaryThresh: 0.5,
  hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
});
const _ = require("lodash");

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
      .then(canciones => this.agregarCanciones(canciones))
  }

  entrenarRed() {
    const cancionesProcesadas = this.procesarCanciones();
    network.train(cancionesProcesadas);
  }

  buscarArtista(nombre) {
    return geniusApi.obtenerArtistaPorNombre(nombre);
  }

  agregarCanciones(canciones) {
    this.listaCanciones = this.listaCanciones.concat(canciones);
    return this.listaCanciones;
  }

  preguntar(titulo) {
    return network.toFunction()(this.encode(titulo))
  }

  procesarCanciones() {
    return this.listaCanciones.map(({ idArtista, titulo }) => console.log("EEE", titulo) || ({ input: this.encode(titulo) , output: _.set({}, idArtista, 1)}) )
  }

  encode(titulo) {
    return titulo.split('').map(x => (x.charCodeAt(0) / 256));
  }


}

module.exports = new Service();