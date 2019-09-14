require('./server.js');
const Chat = require('./model');
const UserVerify = require('./auth-model');
const client = require('socket.io').listen(4000).sockets;

console.log('Mongoose connected');

client.on('connection', function(socket) {

    //Registration
    socket.on('register', (data) => {

        const RegistrationDetails = new UserVerify({
            username: data.username,
            password: data.password
        });

        RegistrationDetails.save().then(() => {
            socket.emit('saved', 'Successfully saved')
        }).catch(e => {
            console.log(e)
        });
        
    });
    
    //Authenticate user
    socket.on('check-credentials', (data) => {
        console.log('data is ',data);
        
        // UserVerify.find({}).then(res => {  

        //     for (let value of res ) {
        //         if (value.username == data.username && value.password == data.password) {
        //             console.log(value);
        //             return socket.emit('correct-credentials', value);
        //         }
        //     }

        //     socket.emit('incorrect-credentials', 'Invalid Details!!');
            
        // });   

        UserVerify.findByCredentials(data.username, data.password).then(user => {
            socket.emit('correct-credentials', user);
        }).catch(e => {
            socket.emit('incorrect-credentials', e.message);
        });
    });

    //Get chats from database
    socket.on('retrieve-chat', function(username) {
        let count = 0;
        Chat.find({}).then(res => {

            for (let valueName of res) {
                if (username == valueName.name) {
                    count+=1
                }
            }
            
            if (count!=0) {
                socket.emit('retrieve-all-chats', res)
            }
        });
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('sending-type', data)
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