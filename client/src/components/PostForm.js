import React from "react";

export default function PostForm(props) {
    const [editing, setEditing] = React.useState(false);
    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }

    const handleUpdateUserSubmit = () => {
        props.handleUpdateUser(props.id)
    }

    return (
        !editing
            ?

            <div className="postForm">
                <img src={props.img} className="postForm--image" alt="profile" onClick={() => setEditing(true)}></img>

                <form onChange={props.resetErrorHandler} className="postForm--form" onSubmit={props.handleSubmit}>
                    <input
                        className="postForm--postText"
                        name="postText" type="text"
                        maxLength={props.maxPostLength}
                        onChange={handleChange}
                        aria-label="Your post"
                    >

                    </input>
                    <button className="postForm--button" type="submit">
                        Submit
                    </button>
                </form>
            </div >

            :

            <form className="postForm updateUser">
                <label htmlFor="imgLink">Image-link:</label>
                <input name="imgLink" className="imgInput updateUser">
                </input>
                <label htmlFor="username">Username:</label>
                <input name="username" className="username updateUser" id="updateUsername" placeholder={props.username}></input>
                <button className="postForm--button" type="button" onClick={() => { handleUpdateUserSubmit(); setEditing(false); }}>
                    Save
                </button>

            </form >


    )
}