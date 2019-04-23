var brain = require('brain.js')
var express = require('express');
var app = express();

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


app.get('/', function (req, res) {
  res.send('Hola pedro!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});