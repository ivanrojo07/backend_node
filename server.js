require('dotenv').config({ path: './.env' });
const express = require('express');
// Inicializar
const app = express();
const server = require('http').Server(app)

const socket = require('./socket');

const PORT = process.env.PORT || 3000;
const URL_BD = process.env.MONGO_URI;
const db = require('./db')
// Router
const router = require('./network/routes');
// db
db(URL_BD);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(router);

socket.connect(server);

router(app)
// app.use('/', function(req, res) {
//     res.send('Hola');
// });
app.use('/app', express.static('public'))
server.listen(PORT, function () {
    console.log(`La aplicación está escuchando en http://localhost:${PORT}`)

});

