var express = require('express');
var app = express();
var brain = require('brain.js')
var handler = require('./API-Handler.js')


handler.agregarArtista('billie eilish');


const port=process.env.PORT || 3000;
let redEntrenada;

app.get('/', function (req, res) {
    
      res.send(handler.verArtistas);
    });
    

    //Para probar usar por ejemplo: http://localhost:3000/agregar?artista=la%20renga
    app.get('/agregar', function (req, res) {//convertirlo en post
        var artista = req.query.artista; 
        handler.agregarArtista(artista);
        res.send("puto el que lee");
      });


      app.get('/entrenarRed', function (req, res) {
        entrenarRed();
        res.send("La red ha sido entrenada");
      });

      app.get('/buscarArtista', function (req, res) {//convertirlo en post
        var input = req.query.input; 
        res.send(ejecutar(input));
      });


    app.listen(port, function () {
      console.log(`Server running at port `+port);
    });




    const config = {
        binaryThresh: 0.5,
        hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
        activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
        leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
    };
    

    
/*

function procesarDatosCanciones(artistaId, canciones) {
    var json = "{\""+artistaId+"\" : 1}";
    return canciones.map(cancion => {
        return [{
            input: encode(cancion.letra),
            output: JSON.parse(json)
        },
        {
            input: encode(cancion.titulo),
            output: JSON.parse(json)
        }]
    });
}

*/


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
