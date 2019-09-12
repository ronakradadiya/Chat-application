require('./server.js');
const Chat = require('./model');
const client = require('socket.io').listen(4000).sockets;

console.log('Mongoose connected');

client.on('connection', function(socket) {
    // console.log('socket connected'); 
    //Authenticate user
    socket.on('check-username', (data) => {
        // console.log(data.username);

        Chat.find({}).then(res => {  

            for (let value of res ) {
                
                if (value.name == data.username) {
                    return socket.emit('username-found', value);
                }
            }

            socket.emit('username-not-found', {username: 'Invalid username!!'});
            
        });    
    });

    //Get chats from database after user is authenticated
    socket.on('retrieve-chat', function() {

        Chat.find({}).then(res => {
            
            socket.emit('retrieve-all-chats', res)
        });
    });

    socket.on('inputMessage', (data) => {
        const newChat = new Chat({
            name: data.username,
            message: data.message,
        });

        newChat.save().then(() => {
            socket.emit('currentsocketchat', newChat);
            socket.broadcast.emit('broadcastchat', newChat);
            
        }).catch((e) => {
            console.log(e);
        });
        
    });


});