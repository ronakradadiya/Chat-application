require('./server.js');
const Chat = require('./model');
const client = require('socket.io').listen(4000).sockets;

console.log('Mongoose connected');

client.on('connection', function(socket) {
    console.log('socket connected'); 

    socket.on('check-username', (data) => {
        console.log(data.username);

        Chat.find({}).then(res => {  

            for (let value of res ) {
                
                if (value.name == data.username) {
                    return socket.emit('username-found', value);
                }
            }

            socket.emit('username-not-found', {username: 'Invalid username!!'});
            
        });

       
        
    });
});