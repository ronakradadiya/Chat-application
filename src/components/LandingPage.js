import React, { Component } from 'react';
import '../css/LandingPage.css';
import socket from '../server/client-socket';
import { withAlert } from 'react-alert'

class LandingPage extends Component {

    state = {
        inputValue: '',
        inputPassword: ''
    }

    onChangeText = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    onChangePassword = (event) => {
        this.setState({
            inputPassword: event.target.value
        });
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        socket.emit('check-credentials', {
            username: this.state.inputValue,
            password: this.state.inputPassword
        });
    }

    componentDidMount() {
        socket.on('correct-credentials', (value) => {
            this.props.onSearchSubmit({
                username: value.username,
                password: value.password
            })
        });

        socket.on('incorrect-credentials', (value) => {
            this.props.alert.error(value);
        });
    }


    render() {
        return (
            <div className="form-landing-page">
                <form onSubmit={this.onSubmitForm}>
                    <label htmlFor="input">Sign In</label>
                    <br />
                    <input
                    required={true} 
                    type="text" 
                    id="input"
                    placeholder="Enter username" 
                    name="input" 
                    value={this.state.inputValue}
                    onChange={this.onChangeText}  />
                    <input type="password" required={true} placeholder="Enter password" value={this.state.inputPassword} onChange={this.onChangePassword} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default withAlert()(LandingPage)
