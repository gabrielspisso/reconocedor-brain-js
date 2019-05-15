var express = require('express');
var app = express();
var brain = require('brain.js')
var handler = require('./API-Handler.js')


handler.agregarArtista('billie eilish');


    const config = {
        binaryThresh: 0.5,
        hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
        activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
        leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
    };
    


function procesarDatosCanciones(artistaId, canciones) {
    var json = "{\""+artistaId+"\" : 1}";
    return canciones.map(cancion => {
        return [
        {
            input: encode(cancion.titulo),
            output: JSON.parse(json)
        }
    ]
    });
}

function procesarDatosArtistas(artistas){//Arma el JSON para entrenar a la red
    var trainingData = artistas.map(artista => procesarDatosCanciones(artista.id,artista.canciones))
    var aux = trainingData.flat(2);//elimina las listas de listas
    console.log(aux);
    return aux;
}


function entrenarRed(){
    let net = new brain.NeuralNetwork(config);
    var datos = procesarDatosArtistas(handler.verArtistas);
    net.train(datos);//---> Se pasan los artistas de la API
    redEntrenada = net.toFunction();
}



function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}


function ejecutar(input) {
    return redEntrenada(encode(input));
}


Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});
