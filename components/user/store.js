const Model = require('./model');

async function getUsers () {
    const users = await Model.find();
    return users; 
}

async function addUser (user) {
    const newUser = new Model(user);
    return await newUser.save();

}

module.exports = {
    add: addUser,
    list: getUsers,

}