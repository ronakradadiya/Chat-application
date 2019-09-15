import React from 'react';
import '../css/TopBar.css';
import faker from 'faker';

export default function TopBar({username,currentTyping}) {
    const imageAvatar = <img src={faker.image.avatar()} alt="Hello User" />;
    return (
        <div className="topbar">
            <div className="image-avatar">{imageAvatar}</div>
            <div className="header-typing">
                <div className="header">{username.charAt(0).toUpperCase() + username.slice(1)}</div>
                <div className="typing">{currentTyping}</div>
            </div>
        </div>
    )
}