const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9001;

app.get('/', controller.verArtistas);
app.get('/buscarArtista', controller.buscarArtista);
app.post('/agregar', controller.agregarArtista);
app.post('/entrenarRed', controller.entrenarRed)


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

