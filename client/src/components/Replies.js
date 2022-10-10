import React from 'react'

export default function Replies(props) {
    let loggedIn = false;
    let username = '';
    for (const user of props.users) {
        if (props.replyUserId === user._id) {
            loggedIn = user.loggedIn;
            username = user.username;
        }
    }

    return (
        <div className="replyContainer">
            <h3 className="replyContainer--username"> {username}:
                <span className="replyContainer--logInStatus" style={{ color: loggedIn ? 'green' : 'red' }}> ●</span>
            </h3>
            <p className="replyContainer--postText">{props.post}</p>

        </div >
    )
}