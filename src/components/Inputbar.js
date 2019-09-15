import React, { Component } from 'react';
import '../css/InputBar.css';
import socket from '../server/client-socket';
import ChatListRight from './ChatListRight';
import ChatListLeft from './ChatListLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class InputBar extends Component {

    state = {
        message: '',
        currentChat: []
    }

    onChangeMessage = (event) => {

        socket.emit('typing', this.props.username)
        
        this.setState({
            message: event.target.value
        });   
    }

    componentDidMount() {

       socket.on('sending-type', (data) => {
           const typingUser = <i>{data} is typing...</i>;   
           this.props.onTyping(typingUser)
       })
        
        socket.on('currentsocketchat', (data) => {
            const message = <ChatListRight chatMessage={data.message} date={data.date} />
            this.setState({
                currentChat: [...this.state.currentChat, message]
            }, () => console.log('this.state',this.state.currentChat));
            this.props.onChatSocket(this.state.currentChat)
        });
        

        socket.on('broadcastchat', (data) => {
            const message = <ChatListLeft chatMessage={data.message} name={data.name} date={data.date} />
            this.setState({
                currentChat: [...this.state.currentChat, message]
            }, () => console.log('this.state',this.state.currentChat));
                
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
            message: this.state.message,
            date: Date().slice(16,21)
        });
        
    }

    render() {
        return (
            <div className="inputbar">
                <form onSubmit={this.onSubmitMessage}>
                    <textarea
                    required={true}
                    wrap="soft"
                    placeholder="Enter message" 
                    value={this.state.message}
                    onChange={this.onChangeMessage}></textarea>
                    <button type="submit">
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                </form>
            </div>
        )
    }
}

export default InputBar
