var Artista = require('./artista.js')
var Cancion = require('./cancion.js')
var cheerio  = require('cheerio')
var Request = require("request");

const accessToken = 'zrJSxLJMh-mV3z8Rkr8TMfJ19jWHS-3Du64LLWwEcyHIxI66WPgTMGecq4YppkIB'
const genius = new Genius(accessToken)

let listaArtistas = [];


var exports = module.exports = {};


//Anda GENIAL

function parseSongHTML(htmlText) {
    const $ = cheerio.load(htmlText)
    var lyrics = $('.lyrics').text();
    lyrics = lyrics.replace(/(\r\n|\n|\r)/gm," ");//Le saco los enters
    //lyrics = lyrics.replace(""," ");
    lyrics = lyrics.substring(37); //Le saco un espacio de 37 chars que tira genius
    lyrics = lyrics.substring(0,lyrics.length-35);//Le saco un espacio de 35 chars que tira genius
    var titulo = $('.header_with_cover_art-primary_info-title').text();
    return new Cancion(titulo,lyrics);
  }

                                    




exports.buscarArtista = (nombre) => listaArtistas.find((artista) => artista.nombre == nombre);//esta linea me da cancer


