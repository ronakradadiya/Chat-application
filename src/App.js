import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage'
import Topbar from './components/Topbar'
import Mainbodybar from './components/Mainbodybar'
import Inputbar from './components/Inputbar'

class App extends Component {

  // onSearchSubmit = (term) => {
  //   console.log(term);  
  // }

  render() {

    return (
      <div className="App">
        {/* <LandingPage onSubmit={this.onSearchSubmit} /> */}
        <div className="chat-container">
          <Topbar />
          <Mainbodybar />
          <Inputbar />
        </div>
      </div>
    );
  }
}

export default App;
