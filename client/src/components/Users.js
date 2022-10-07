import React from 'react'


export default function Users(props) {
    const userElements = props.users.map(user => {
        return (
            <div className="usersContainer--userProfile">
                <img src={user.img ? user.img : props.defaultImage} alt="profile" className="usersContainer--userProfile--image"></img>
                <h4> {user.username} <span className="postContainer--logInStatus" style={{ color: user.loggedIn ? 'green' : 'red' }}> ●</span></h4>

            </div>


        )
    })
    return (
        <div className="usersContainer">
            {userElements}
        </div>
    )
}