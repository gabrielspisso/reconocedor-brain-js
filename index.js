var brain = require('brain.js')
var express = require('express');
var app = express();
var Request = require("request");

const port=process.env.PORT || 3000;

// provide optional config object (or undefined). Defaults shown.
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);
let marron5 = {nombre: 'Maron 5', integrantes : 1};
let soad = {nombre: 'System of a Down', integrantes : 4};
let datosArtistas = [marron5,soad];



const trainingData = [
    {
        input: "Sugar",
        output: { 0 : 1}
    },
    {
        input: "Sugar",
        output: { 1 : 1 }
    }
];

let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();

    var aux = processTrainingData(data);
console.log(aux)
    net.train(aux);

    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));
    var indexes = [];
    for(var index in results){
        console.log(index);
        console.log(datosArtistas[index]);
    }

    //console.log(indexes[0]) -> the name
   // console.log(indexes[1]) -> the other name

    //console.log(results[0])
}

train(trainingData);
execute("Sugar");






/*
let token="";

app.get('/tokenhandler', function (req, res) {
	token=req.query.token;
	res.send('nada por aqui');
});

app.get('/', function (req, res) {
var texto;
Request.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=argentina&api_key=f44de98e4c71e31cf33f0d7f478af1c3&format=json", (error, response, body) => {
    if(error) {
        texto = error;
    }
else
    texto = JSON.parse(body);
});

  res.send(texto);
});

app.listen(port, function () {
  console.log(`Server running at port `+port);
});

*/