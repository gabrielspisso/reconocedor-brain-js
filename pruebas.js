var express = require('express');
var app = express();
var Request = require("request");
var handler = require('./API-Handler.js')

console.log(handler.buscarArtista("airbag"));

handler.agregarArtista('billie eilish');





const port=process.env.PORT || 3000;

app.get('/', function (req, res) {
    
      res.send(handler.verArtistas);
    });
    

    //Para probar usar por ejemplo: http://localhost:3000/agregar?artista=la%20renga
    app.get('/agregar', function (req, res) {//convertirlo en post
        var artista = req.query.artista; // $_GET["id"]
        handler.agregarArtista(artista);
        res.send("puto el que lee");
      });

    app.listen(port, function () {
      console.log(`Server running at port `+port);
    });
