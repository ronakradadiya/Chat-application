 //connect to socket.io
 import openSocket from 'socket.io-client';

 const socket = openSocket('http://127.0.0.1:4000');
 //check for connection
 
//  export const subscribeToServer = () => {
//     if (socket !== undefined) {
//         console.log('connected to socket...');
//     }
//  }

 if (socket !== undefined) {
    console.log('connected to socket...');
}

export default socket;