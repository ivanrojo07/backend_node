const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/:id', function(req, res) {
    const filter = req.params.id || null;
    controller.getChats(filter)
            .then( (chatList) => {
                response.success(req, res, chatList, 200);
            })
            .catch( (error) => {
                response.error(req, res, 'Invalid data', 500, error);
            })
});

router.post('/', function(req, res) {
    const body = req.body;
    console.log(body)
    controller.addChat(body.users)
        .then( (chat) => {
            console.log('[success Network]', chat);
            response.success(req, res, chat, 201);
        })
        .catch( (error) => {
            console.log('[network error]', error);
            response.error(req, res, "Informacion invalida", 400, error);
        });
});

module.exports = router