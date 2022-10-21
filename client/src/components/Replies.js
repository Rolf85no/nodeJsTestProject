import React from 'react'

export default function Replies({ reply, users }) {
    let loggedIn = false;
    let username = '';
    for (const user of users) {
        if (reply.userID === user._id) {
            loggedIn = user.loggedIn;
            username = user.username;
        }
    }

    return (
        <div className="replyContainer">
            <h3 className="replyContainer--username"> {username}:
                <span className="replyContainer--logInStatus" style={{ color: loggedIn ? 'green' : 'red' }}> ●</span>
            </h3>
            <p className="replyContainer--postText">{reply.post}</p>

        </div >
    )
}