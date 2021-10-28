const express = require('express');
const PORT = 3000;
const response = require('./network/response')
// Router
// const router = require('./components/message/network');
const router = require('./network/routes');
// Inicializar
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(router);

router(app)
// app.use('/', function(req, res) {
//     res.send('Hola');
// });
app.use('/app', express.static('public'))
app.listen(PORT);

console.log(`La aplicación está escuchando en http://localhost:${PORT}`)
