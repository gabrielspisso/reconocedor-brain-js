var Artista = require('./artista.js')
var Cancion = require('./cancion.js')
var cheerio  = require('cheerio')
var Request = require("request");

const accessToken = 'zrJSxLJMh-mV3z8Rkr8TMfJ19jWHS-3Du64LLWwEcyHIxI66WPgTMGecq4YppkIB'
const genius = new Genius(accessToken)

let listaArtistas = [];


var exports = module.exports = {};

Genius.prototype.getArtistByName = function getArtistByName(artistName) {
    const normalizeName = name => name.replace(/\./g, '').toLowerCase()   // regex removes dots
    const artistNameNormalized = normalizeName(artistName)
  
    return this.search(artistName)
      .then((response) => {
        for (let i = 0; i < response.hits.length; i += 1) {
          const hit = response.hits[i]
          if (hit.type === 'song' && normalizeName(hit.result.primary_artist.name) === artistNameNormalized) {
            return hit.result
          }
        }
        throw new Error(`Did not find any songs whose artist is "${artistNameNormalized}".`)
      })
      .then(songInfo => new Artista(songInfo.primary_artist.name, songInfo.primary_artist.id, songInfo.primary_artist.image_url))
  }
  

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

                                     
  Genius.prototype.getSong = function getSong(geniusUrl) {
    return fetch(geniusUrl, {
      method: 'GET',
    })
    .then(response => {
      if (response.ok) return response.text()
      throw new Error('Could not get song url ...')
    })
    .then(parseSongHTML)
  }



exports.agregarArtista = function agregarArtista(nombre){
    genius.getArtistByName(nombre)
    .then((artista) => {
        listaArtistas.push(artista)
        genius.songsByArtist(artista.id, {
            per_page: 5,
            sort: 'popularity',
        })
        .then((songs) => {
            listaCanciones = [];
            songs.songs.map(c => {
                console.log(c.url)//----------> Se pasa la URL de la cancion
                Request.get(c.url, (error, response, body) => {
                    if(error) {
                        texto = error;
                    }
                    else{
                        var cancion = parseSongHTML(body);//-------------> esta funcion agarra el HTML y lo recontra parsea
                        listaCanciones.push(cancion);
                        console.log(cancion);
                    }
                });
                console.log(listaCanciones)
            })
            artista.canciones=listaCanciones;
        })
    })

}


exports.verArtistas = listaArtistas;


exports.buscarArtista = (nombre) => listaArtistas.find((artista) => artista.nombre == nombre);//esta linea me da cancer


