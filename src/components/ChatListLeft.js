import React from 'react'

export default function ChatListLeft({ chatMessage, name }) {
    return (
        <div className="retrieve-chat-left">
            {chatMessage}
            {name}
        </div>
    )
}
