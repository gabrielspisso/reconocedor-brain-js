const accessToken = 'zrJSxLJMh-mV3z8Rkr8TMfJ19jWHS-3Du64LLWwEcyHIxI66WPgTMGecq4YppkIB'
const Promise = require("bluebird");
const Genius = require('genius-api');

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

}

module.exports = new GeniusApi()

