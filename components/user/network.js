const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
    controller.getUsers().then( (users) => {
        response.success(req,res, users, 200);
    })
    .catch( (error) => {
        response.error(req, res, 'Invalid data', 500, error);
    })
})

router.post('/', function (req, res) {
    let name = req.body.name;
    controller.addUser(name)
        .then( (user) => {
            response.success(req, res, `El usuario ${user.name} ha sido creado`, 201);
            
        }).catch( (error) => {
            response.error(req, res, "Invalid error", 400, error)
        });
})

module.exports = router;