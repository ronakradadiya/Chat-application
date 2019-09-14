import React, { Component } from 'react';
import '../css/LandingPage.css';
import socket from '../server/client-socket';

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
        console.log(this.state.inputValue, this.state.inputPassword);
        socket.emit('check-credentials', {
            username: this.state.inputValue,
            password: this.state.inputPassword
        });
        
        // if (this.state.inputValue.length < 3) {
        //     return alert("Username must have at least 3 characters");
        // }
        
    }

    componentDidMount() {
        socket.on('correct-credentials', (value) => {
            console.log('Inside correct');
            console.log('value is ',value)
            this.props.onSearchSubmit({
                username: value.username,
                password: value.password
            })
        });

        socket.on('incorrect-credentials', (value) => {
            alert(value)
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

export default LandingPage
