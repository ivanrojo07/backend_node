const express = require('express');
const PORT = 3000;
// Router
const router = express.Router();
// Inicializar
var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router);

router.get('/', function(req, res) {
    res.send('hola desde get'); 
})
router.get('/message', function (req, res) {
    console.log('headers',req.headers)
    res.header({
        "custom-header": "Nuestro valor personalizado",
    })
    res.send('Lista de mensajes');
});
router.post('/message', function (req, res) {
    console.log("body",req.body)
    console.log('query', req.query);
    res.send('Mensaje '+req.body.message+' añadido');
});
router.delete('/message', function (req, res) {
    console.log(req.query);
    console.log(req.body);
    res.status(201).send({error:'', body:"Eliminado"});
})
// app.use('/', function(req, res) {
//     res.send('Hola');
// });

app.listen(PORT);

console.log(`La aplicación está escuchando en http://localhost:${PORT}`)
