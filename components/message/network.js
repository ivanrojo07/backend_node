const express = require('express');
const multer = require('multer');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

const upload = multer({
    dest: 'public/files/',
})

router.get('/', function (req, res) {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages).then((messageList)=>{
        response.success(req, res, messageList, 200);
    })
    .catch((error)=>{
        response.error(req, res, "Invalid data", 500, "Server Error")
    })
});
router.post('/', upload.single('file'),  function (req, res) {
    const body = req.body;
    // console.log(req.file)
    controller.addMessage(body.chat, body.user, body.message, req.file).then((fullMessage)=>{
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
router.delete('/:id', function (req, res) {
   controller.deleteMessage(req.params.id)
    .then( (data) =>{
        console.log(data)
        response.success(req, res, `Mensaje de ${data.user} eliminado`, 200 )
    })
    .catch( (error) =>{
        console.log('[network Error]', error);
        if(error === "Not Found"){
            response.error(req, res, "Mensaje no encontrado", 404, error);
        }
        response.error(req, res, "Error interno", 500, error);
    });

})

module.exports = router;