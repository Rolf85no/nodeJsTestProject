import React from 'react'


export default function Users(props) {
    const userElements = props.users.map(user => {
        return (
            <div className="userProfile">
                <img src={user.img ? user.img : props.defaultImage} alt="profile"></img>
                <h4> {user.username}</h4>

            </div>


        )
    })
    return (
        <section className="usersContainer">
            {userElements}
        </section>
    )
}