import React from "react";
import UpdateUserForm from "./UpdateUserForm";

export default function PostForm(props) {
    const [editing, setEditing] = React.useState(false);
    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }

    const toggleEditing = () => {
        setEditing(prevState => !prevState)
    }

    return (
        !editing
            ?
            <div className="postForm">
                <img src={props.img} className="postForm--image" alt="profile" onClick={toggleEditing}></img>

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
            <UpdateUserForm
                id={props.id}
                toggleEditing={toggleEditing}
                username={props.username}
                handleUpdateUser={props.handleUpdateUser}

            />

    )
}