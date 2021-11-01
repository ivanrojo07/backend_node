const store = require('./store');

function getChats(filterUser) {
    return new Promise( (resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function addChat(users) {
    if(!Array.isArray(users) || !users.length > 1) {
        console.error('[chatController]', 'No hay param usuario' );
        return Promise.reject('Los datos son incorrectos');
    }
    else {
        const chat = {
            users: users
        };
        return store.add(chat);

    }
}

module.exports = {
    getChats,
    addChat,
}