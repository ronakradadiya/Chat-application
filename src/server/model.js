require('./server.js');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', userSchema);

module.exports = Chat;

