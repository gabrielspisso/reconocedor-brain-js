var express = require('express');
var app = express();


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

