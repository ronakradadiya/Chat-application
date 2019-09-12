import React, {Component} from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import TopBar from './components/TopBar';
import MainBodyBar from './components/MainBodyBar';
import InputBar from '../src/components/InputBar';
import socket from '../src/server/client-socket';

class App extends Component {

  state = {
    inputUsername: '',
    chat: {},
    currentChat: []
  }

  onSearchSubmit = (term) => {
    console.log(term);
    
    socket.emit('check-username', {username: term});

    socket.on('username-found', (data) => {
        this.setState({
          inputUsername: data.name,
          chat: data
      });

    });

    socket.on('username-not-found', (data) => {
      alert("Invalid username!!");
    });

  }

  onChatSocket = (currentchat) => {
     console.log('currentchat is ',currentchat);
     this.setState({
       currentChat: currentchat
     });
  }


  render() {
    return (
      <div className="App">
        {
          !this.state.inputUsername ?
        <LandingPage onSubmit={this.onSearchSubmit} />
        :
        <div className="chat-container">
          <TopBar username={this.state.inputUsername} />
          <MainBodyBar username={this.state.inputUsername} currentChat={this.state.currentChat} />
          <InputBar username={this.state.inputUsername} onChatSocket={this.onChatSocket} />    
        </div>
        }
      </div>
    );
  }
}

export default App;
