const Model = require('./model');

async function addChat (users) {
    const newChat = new Model(users);
    return await newChat.save();

}

async function getChats (filterUser) {
    return new Promise( (resolve, reject) => {
        let filter = {}
        if(filterUser !== null) {

            filter = {
                users : filterUser
            }
        }
        Model.find(filter)
            .populate('users')
            .exec( (err, populateData) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    resolve(populateData);
                }
            });

    });
}

module.exports = {
    add: addChat,
    list: getChats, 
    

}