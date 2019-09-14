import React, { Component } from 'react'
import '../css/SignUp.css';
import {Link} from 'react-router-dom';
import socket from '../server/client-socket';

class SignUp extends Component {

    state = {
        inputUsername: '',
        inputPassword: ''
    }

    inputUsername = (event) => {
        this.setState({
            inputUsername: event.target.value
        });
    }

    inputPassword = (event) => {
        this.setState({
            inputPassword: event.target.value
        });
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        console.log(this.state.inputUsername, this.state.inputPassword)
        socket.emit('register', {
            username: this.state.inputUsername,
            password: this.state.inputPassword
        });
    }

    componentDidMount() {
        socket.on('saved', (data) => {
            alert(data)
        });
    }

    render() {
        return (
            <div className="signup">
                <form onSubmit={this.onSubmitForm}>
                    <label id="header" htmlFor="input">Sign Up</label>
                    <br />
                    <input
                    required={true} 
                    type="text" 
                    id="input"
                    placeholder="Enter username" 
                    name="input" 
                    value={this.state.inputUsername}
                    onChange={this.inputUsername}
                    />

                    <input type="password" required={true} minLength={6} placeholder="Enter password" value={this.state.inputPassword} onChange={this.inputPassword} />

                    <input type="submit" value="Submit" />

                    <div className="registered">
                        <label htmlFor="sign-in">Already registered ?</label>
                        <Link to="/signin">
                            <span>SignIn</span>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp
