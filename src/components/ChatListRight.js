import React from 'react'

export default function ChatListRight({ chatMessage, name }) {
    return (
        <div className="retrieve-chat-right">
            {chatMessage}
            {name}
        </div>
    )
}
