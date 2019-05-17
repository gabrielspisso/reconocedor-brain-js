const accessToken = 'zrJSxLJMh-mV3z8Rkr8TMfJ19jWHS-3Du64LLWwEcyHIxI66WPgTMGecq4YppkIB'
const Promise = require("bluebird");
const Genius = require('genius-api');
const lyricist = new (require('lyricist/node6'))(accessToken);
const _ = require("lodash");

class GeniusApi {

  constructor() {
    this.api = new Genius(accessToken);
  }

  obtenerArtistaPorNombre(nombre) {
    return Promise.resolve(this.api.search(nombre))
      .get("hits")
      .filter(({ type, result: { primary_artist: { name }} }) => type == 'song' && new RegExp(nombre, "gi").test(name))
      .then(([{ result: { primary_artist: { id, name } } }]) => ({ id, name }))
  }

  cancionesDelArtista(idArtista) {
    return Promise.resolve(this.api.songsByArtist(idArtista, { per_page: 5, sort: 'popularity'}))
      .get("songs")
      .map(({ id }) => lyricist.song(id, { fetchLyrics: true }))
      .map(({ id, title: titulo, lyrics: letra, primary_artist: { id: idArtista, name: artista } }) => ({ id, titulo, letra, idArtista, artista }))
      
  }

}

module.exports = new GeniusApi()

