const express = require('express');
const PORT = 3000;
const response = require('./network/response')
// Router
const router = express.Router();
// Inicializar
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(router);

router.get('/', function(req, res) {
    res.send('hola desde get'); 
})
router.get('/message', function (req, res) {
    console.log('headers',req.headers)
    res.header({
        "custom-header": "Nuestro valor personalizado",
    })
    // res.send('Lista de mensajes');
    response.success(req, res, "Lista de mensajes");
});
router.post('/message', function (req, res) {
    console.log("body",req.body)
    console.log('query', req.query);
    if(req.query.error == 'ok'){
        response.error(req, res, "Error Ocurrido", 401)
    }
    // res.send('Mensaje '+req.body.message+' añadido');
    response.success(req, res, 'Mensaje '+req.body.message+' añadido', 201)
});
router.delete('/message', function (req, res) {
    console.log(req.query);
    console.log(req.body);
    // res.status(201).send({error:'', body:"Eliminado"});
    response.success(req, res, 'Mensaje eliminado', 200)

})
// app.use('/', function(req, res) {
//     res.send('Hola');
// });
app.use('/app', express.static('public'))
app.listen(PORT);

console.log(`La aplicación está escuchando en http://localhost:${PORT}`)
