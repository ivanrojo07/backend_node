const Model = require('./model');

function addMessage (message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages (filterUser) {
    return new Promise( (resolve, reject) => {
        let filter = {}
        if(filterUser !== null) {
            filter = {
                user: filterUser
            };
        }
        Model.find(filter)
            .populate("user")
            .exec( (err, populateData) => {
                if(err) {
                    console.log(err)
                    reject(err)
                }
                else{
                    resolve(populateData)
                }
            });

    })
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
