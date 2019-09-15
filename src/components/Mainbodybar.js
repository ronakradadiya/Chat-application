import React, { Component } from 'react';
import ChatListRight from './ChatListRight';
import ChatListLeft from './ChatListLeft';
import socket from '../server/client-socket';
import '../css/MainBodyBar.css';

class MainBodyBar extends Component {

    constructor(props) {
        super(props);

        this.containerRef = React.createRef();
    }

    state = {
        messages: [],
    }

    componentDidUpdate() {
        const node = this.containerRef.current;
        node.scrollTop = node.scrollHeight;
    }

    componentDidMount() {        
        var message;

        socket.emit('retrieve-chat', this.props.username)

        socket.on('retrieve-all-chats', (chats) => {
            
            for (var chat of chats) {

                if(chat.name === this.props.username) {
                    message = <ChatListRight key={chat._id} chatMessage={chat.message} date={chat.date} />;
                    this.setState({
                        messages: [...this.state.messages, message]
                    });
                } else {
                    message = <ChatListLeft key={chat._id} chatMessage={chat.message} name={chat.name} date={chat.date} />;
                    this.setState({
                        messages: [...this.state.messages, message]
                    });
                }
            }

        });

    }
    
    render() {
        return (
            <div className="mainbodybar" ref={this.containerRef}>
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