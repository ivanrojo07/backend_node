const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;

db.connect('mongodb+srv://ivanrojo07:w9lzpJiOfVJCeAiV@cluster0.qj00c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true
})
console.log('[db] Conectada con exito')
function addMessage (message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages (filterUser) {
    let filter = {}
    if(filterUser !== null) {
        filter = {
            user: filterUser
        };
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateMessage (id, text) {
    const foundMessage = await Model.findOne({
        _id: id
    });
    
    foundMessage.message = text;
    const newMessage = await foundMessage.save();
    return newMessage
}

async function deleteMessage (id) {
    const foundMessage = await Model.findOne({
        _id: id
    });
    if(foundMessage){

        const deletedMessage = await foundMessage.delete();
        return deletedMessage;
    }
    return null;

}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage,
}
// w9lzpJiOfVJCeAiV
// mongodb+srv://ivanrojo07:<password>@cluster0.qj00c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority