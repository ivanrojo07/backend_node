const store = require('./store');


function getUsers(){
    return new Promise( (resolve, reject) => {
        resolve(store.list())
    })
}

function addUser (name) {

    return new Promise((resolve, reject) => {
        if(!name){
            reject('Invalid Name')
        }
        const user = {
            name,
        };
        store.add(user);
        resolve(user);
        
    });
}

module.exports = {
    addUser,
    getUsers
}