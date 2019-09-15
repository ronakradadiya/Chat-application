import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import * as serviceWorker from './serviceWorker';

const options = {
    position: positions.TOP_CENTER,
    timeout: 3000,
    offset: '30px',
    type: types.ERROR,
    transition: transitions.SCALE
  }

ReactDOM.render(
<AlertProvider template={AlertTemplate} {...options}>
    <App />
</AlertProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
