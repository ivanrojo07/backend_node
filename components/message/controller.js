const store = require('./store');
const socket = require('./../../socket').socket;

function addMessage (chat, user, message, file) {

    return new Promise((resolve, reject) => {
        if(!chat || !user || !message){
            console.error('[messageController]', "No hay usuario o mensaje" );
            reject('Los datos son incorrectos');
        }
        let fileUrl = '';
        if(file) {
            fileUrl = 'http://localhost:3000/app/files/'+file.filename;
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl
        };
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);

    })
}

function getMessages (user) {
    return new Promise( (resolve, reject) => {
        resolve(store.list(user));
    });
}

function updateMessage (id, message) {
    return new Promise(async  (resolve, reject) => {
        if(!id || !message){
            reject('Invalid data');
        }
        else{
            const result = await store.update(id, message);
            resolve(result);

        }
    });
}

function deleteMessage (id) {
    return new Promise(async (resolve, reject) => {
        if(!id) {
            reject('Invalid data');
        }
        else{
            try{
                const result = await store.delete(id);
                if(result){
                    resolve(result);
                }
                else{
                    reject('Not Found');
                }
                
            }
            catch(error){
                reject(error);
            }
        }
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}