const accessToken = ''
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
    return Promise.resolve(this.api.songsByArtist(idArtista, { per_page: 10, sort: 'popularity'}))
      .get("songs")
      .map(({ id, title: titulo, primary_artist: { name: artista } }) => ({ id, titulo, idArtista, artista }))
      .filter(({ artista }) => !_.includes(artista, "&"))
      
  }

}

module.exports = new GeniusApi()

