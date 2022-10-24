import React from 'react'
import UserNameAndImage from './UserNameAndImage'
export default function Users({ users, defaultImage }) {
    const userElements = users.map(user => {
        return (

            <UserNameAndImage
                postUser={user}
                defaultImage={defaultImage}
                key={user._id}
            />
        )
    })
    return (
        <div className="usersContainer">
            {userElements}
        </div>
    )
}