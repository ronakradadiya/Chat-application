import React from 'react';
import '../css/TopBar.css';

export default function TopBar({username,currentTyping}) {
    return (
        <div className="topbar">
            <div>{username.charAt(0).toUpperCase() + username.slice(1)}</div>
            <div>{currentTyping}</div>
        </div>
    )
}