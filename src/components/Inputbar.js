import React, { Component } from 'react';
import socket from '../server/client-socket';
import ChatListRight from './ChatListRight';
import ChatListLeft from './ChatListLeft';

class InputBar extends Component {

    state = {
        message: '',
        currentChat: []
    }

    onChangeMessage = (event) => {
        
        this.setState({
            message: event.target.value
        });   
    }

    componentDidMount() {
        
        socket.on('currentsocketchat', (data) => {
            const message = <ChatListRight chatMessage={data.message} />
            this.setState({
                currentChat: [...this.state.currentChat, message]
            }, () => console.log(this.state.currentChat));
                
            this.props.onChatSocket(this.state.currentChat)
        });

        socket.on('broadcastchat', (data) => {
            const message = <ChatListLeft chatMessage={data.message} />
            this.setState({
                currentChat: [...this.state.currentChat, message]
            }, () => console.log(this.state.currentChat));
                
            this.props.onChatSocket(this.state.currentChat)
        });

        
    }

    onSubmitMessage = (event) => {     
        event.preventDefault();
        
        this.setState({
            message: ''
        });

        console.log(this.state.message);

        socket.emit('inputMessage', {
            username: this.props.username,
            message: this.state.message
        });
        
    }

    render() {
        
        return (
            <div className="inputbar">
                <form onSubmit={this.onSubmitMessage}>
                    <input 
                    type="text" 
                    placeholder="Enter message" 
                    value={this.state.message}
                    onChange={this.onChangeMessage} />
                </form>
            </div>
        )
    }
}

export default InputBar
