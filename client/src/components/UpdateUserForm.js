import React from 'react'

export default function UpdateUserForm(props) {

    const handleUpdateUserSubmit = (event) => {
        event.preventDefault();
        props.toggleEditing();
        props.handleUpdateUser(props.id)
    }

    return (
        <form className="postForm updateUser" onSubmit={handleUpdateUserSubmit}>
            <button className="updateUser--button-close" type="button" onClick={props.toggleEditing}> x</button>
            <label htmlFor="imgLink">Image-link:</label>
            <input name="imgLink" className="imgInput updateUser">
            </input>
            <label htmlFor="username">Username:</label>
            <input name="username" className="username updateUser" id="updateUsername" placeholder={props.username}></input>
            <button className="updateUser--button" type="submit">
                Save
            </button>

        </form >

    )
}