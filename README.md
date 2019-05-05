# Reconocedor de artistas con Redes Neuronales

Usa la API de Genius para conseguir nombres de artistas y sus canciones (Titulo y letra).


##API-Handler.js

- exports.agregarArtista(): Agrega un artista a la memoria con 5 canciones por default  
- exports.verArtistas: Devuelve todos los artistas cargados


##pruebas.js
- Entrando al GET "/agregar" carga un artista a la memoria pasandolo por parametro.
- Entrando al GET "/" muestra a todos los artistas cargados en memoria.
- Entrando al GET "/entrenarRed" carga a los artistas a la red, solo hacerlo cuando ya se cargaron todos que desean los artistas a la red.
- Entrando al GET "/buscarArtista?input=XXX" busca un artista en la red segun el input, puede ser el titulo o parte de la letra (por ahora solo esta puesto el titulo).
