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


const trainingData = [
    {
        input: "Sugar",
        output: { marron5: 1}
    },
    {
        input: "Sugar",
        output: { soad: 1}
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
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));
    console.log(results)
}

train(trainingData);
execute("Sugar");

let token="";

app.get('/tokenhandler', function (req, res) {
	token=req.query.token;
	res.send('nada por aqui');
});

app.get('/', function (req, res) {
var texto;
Request.get("http://httpbin.org/ip", (error, response, body) => {
    if(error) {
        texto = error;
    }
    texto = JSON.parse(body);
});

  res.send(texto);
});

app.listen(port, function () {
  console.log(`Server running at port `+port);
});