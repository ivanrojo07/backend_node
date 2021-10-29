const express = require('express');
require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 3000;
const URL_BD = process.env.MONGO_URI;
const db = require('./db')
// Router
const router = require('./network/routes');
// db
db(URL_BD);
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
