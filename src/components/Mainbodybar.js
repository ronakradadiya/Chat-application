import React, { Component } from 'react';
import ChatListRight from './ChatListRight';
import ChatListLeft from './ChatListLeft';
import socket from '../server/client-socket';
import '../css/MainBodyBar.css'

class MainBodyBar extends Component {

    state = {
        messages: [],
    }

    componentDidMount() {        
        var chatMessageFromDB = [];
        var message;

        socket.emit('retrieve-chat')

        socket.on('retrieve-all-chats', (chats) => {
            
            for (let chat of chats) {

                if(chat.name === this.props.username) {
                    message = <ChatListRight key={chat._id} chatMessage={chat.message} />;
                    chatMessageFromDB.push(message)
                } else {
                    message = <ChatListLeft key={chat._id} chatMessage={chat.message} />;
                    chatMessageFromDB.push(message)
                }
            }

            this.setState({
                messages: chatMessageFromDB
            });

        });


    }

    render() {

        return (
            <div className="mainbodybar">
                {
                    this.state.messages.map((message,index) => {
                        return <div key={index}>{message}</div>
                    })
                }
                {
                    this.props.currentChat.map((chat,index) => {
                        return <div key={index}>{chat}</div>
                    })
                }
                
            </div>

        )
    }
}

export default MainBodyBar