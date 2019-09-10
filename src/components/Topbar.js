import React, { Component } from 'react';
import '../css/TopBar.css';

class TopBar extends Component {
    
    render() {
        console.log('Props is in topbar ',this.props.username);
        
        const {username} = this.props
        return (
            <div className="topbar">
                <p>{username.charAt(0).toUpperCase() + username.slice(1)}</p>
            </div>
        )
    }
}

export default TopBar