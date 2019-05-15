const accessToken = 'zrJSxLJMh-mV3z8Rkr8TMfJ19jWHS-3Du64LLWwEcyHIxI66WPgTMGecq4YppkIB'
const Promise = require("bluebird");
const Genius = require('genius-api');
const lyricist = new (require('lyricist/node6'))(accessToken);

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
      .map(({ id }) => lyricist.song(id, { fetch_lyrics: true }))
      .map(({ id, title, lyrics }) => ({ id, title, lyrics }))
  }

}

module.exports = new GeniusApi()

