const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
    controller.getMessages().then((messageList)=>{
        response.success(req, res, messageList, 200);
    })
    .catch((error)=>{
        response.error(req, res, "Invalid data", 500, "Server Error")
    })
});
router.post('/', function (req, res) {
    const body = req.body;
    controller.addMessage(body.user, body.message).then((fullMessage)=>{
        console.log('[success Network]', fullMessage);
        response.success(req, res, fullMessage, 201);
    }).catch(error=>{
        console.error('[error Network]', error);
        response.error(req, res, "Informacion invalida", 400, "Error en los campos agregados.");
    });
});
router.patch('/:id', function (req, res) {
    console.log(req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
        .then( (data) => {
            response.success(req, res, data, 200)
        })
        .catch( (error) => {
            console.log("['error Network']",error)
            response.error(req, res, "Error interno", 500, error)
        })
})
router.delete('/', function (req, res) {
    console.log(req.query);
    console.log(req.body);
    response.success(req, res, 'Mensaje eliminado', 200)

})

module.exports = router;