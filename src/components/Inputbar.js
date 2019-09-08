import React, { Component } from 'react'

class Inputbar extends Component {
    render() {
        return (
            <div className="inputbar">
                <input 
                type="text" 
                placeholder="Enter message" />
            </div>
        )
    }
}

export default Inputbar
