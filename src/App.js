import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout';
import Sign from './components/Sign';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Sign} />
            <Route path="/signin" exact component={Layout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
