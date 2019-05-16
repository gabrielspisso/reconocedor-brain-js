const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9001;

app.get('/', controller.verBaseConocimiento);
app.get('/buscarArtista', controller.buscarArtista);
app.get('/preguntar', controller.preguntar)
app.post('/agregar', controller.agregarArtista);
app.post('/entrenar', controller.entrenarRed)


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

