import React, {Component} from 'react';
import '../css/Layout.css';
import LandingPage from './LandingPage';
import TopBar from './TopBar';
import MainBodyBar from './MainBodyBar';
import InputBar from './InputBar';

class Layout extends Component {

  state = {
    inputUsername: '',
    inputPassword: '',
    chat: {},
    currentChat: [],
    currentTyping: ''
  }

  onSearchSubmit = (term) => {
    console.log('term is ',term); 

    this.setState({
      inputUsername: term.username,
      inputPassword: term.password
    });
  }

  onChatSocket = (currentchat) => {
     console.log('currentchat is ',currentchat);
     this.setState({
       currentChat: currentchat
     });
     this.setState({
       currentTyping: ''
     });
     
  }

  onTyping = (username) => {
    this.setState({
      currentTyping: username
    });
  }

  render() {
    
    return (
      <div className="app-layout">
        {
          !this.state.inputUsername && !this.state.inputPassword ?
          <LandingPage onSearchSubmit={this.onSearchSubmit} />
          :
          <div className="chat-container">
            <TopBar username={this.state.inputUsername} currentTyping={this.state.currentTyping} />
            <MainBodyBar username={this.state.inputUsername} currentChat={this.state.currentChat} />
            <InputBar username={this.state.inputUsername} onChatSocket={this.onChatSocket} onTyping={this.onTyping} />    
          </div>
        }
      </div>
    );
  }
}

export default Layout;
