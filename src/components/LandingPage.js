import React, { Component } from 'react'

class LandingPage extends Component {

    state = {
        inputValue: ''
    }

    onChangeText = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    onsubmitForm = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.inputValue)
    }

    render() {
        return (
            <div className="form-landing-page">
                <form onSubmit={this.onsubmitForm}>
                    <label htmlFor="input">Welcome</label>
                    <br />
                    <input 
                    type="text" 
                    id="input"
                    placeholder="Enter username" 
                    name="input" 
                    value={this.state.inputValue}
                    onChange={this.onChangeText}  />
                </form>
            </div>
        )
    }
}

export default LandingPage
