const express = require('express');
const PORT = 3000;
// Inicializar
var app = express();

app.use('/', function(req, res) {
    res.send('Hola');
});

app.listen(PORT);

console.log(`La aplicación está escuchando en http://localhost:${PORT}`)
