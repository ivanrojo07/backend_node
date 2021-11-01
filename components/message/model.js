const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: "Chat",
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    date: Date,
    message: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: false
    }
})

const model = mongoose.model('Message', mySchema);

module.exports = model