import React from 'react'

export default function ChatListRight({ chatMessage,date }) {
    return (
        <div className="retrieve-chat-right">
            <div className="chat-right-message">{chatMessage}</div>
            <div className="current-date"> {date} </div>
        </div>
    )
}
