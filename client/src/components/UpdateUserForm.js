import React from 'react'

export default function UpdateUserForm(props) {

    const [username, setUsername] = React.useState('');
    const [imageLink, setImageLink] = React.useState('');

    const handleUpdateUserSubmit = (event) => {
        event.preventDefault();
        props.toggleEditing();
        props.handleUpdateUser(props.id, username, imageLink)
    }

    const handleChange = (event) => {
        if (event.target.name === 'username') setUsername(event.target.value);
        else if (event.target.name === 'imgLink') setImageLink(event.target.value);
    }

    return (
        <form className="postForm updateUser" onSubmit={handleUpdateUserSubmit}>
            <button className="updateUser--button-close" type="button" onClick={props.toggleEditing}> x</button>
            <label htmlFor="imgLink">Image-link:</label>
            <input name="imgLink" className="imgInput updateUser" onChange={handleChange} value={imageLink}>
            </input>
            <label htmlFor="username">Username:</label>
            <input value={username} name="username" className="username updateUser" id="updateUsername" placeholder={props.username} onChange={handleChange}></input>
            <button className="updateUser--button" type="submit">
                Save
            </button>

        </form >

    )
}