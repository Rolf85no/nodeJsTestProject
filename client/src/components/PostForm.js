import React from "react";
import UpdateUserForm from "./UpdateUserForm";

export default function PostForm(props) {
    const [editing, setEditing] = React.useState(false);
    const [postText, setPostText] = React.useState('');

    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
        setPostText(event.target.value);
    }

    const toggleEditing = () => {
        setEditing(prevState => !prevState)
    }

    const submitPost = (event) => {
        event.preventDefault();
        if (props.typeOfPost === "Post") props.handleSubmit(postText);
        else props.handleSubmit(postText, props.postId, 'reply');
        setPostText('');
    }

    return (
        editing && props.typeOfPost === "Post"
            ?
            <UpdateUserForm
                id={props.id}
                toggleEditing={toggleEditing}
                username={props.username}
                handleUpdateUser={props.handleUpdateUser}
            />
            :
            <div className="postForm">
                <img src={props.img} className="postForm--image" alt="profile" onClick={toggleEditing}></img>

                <form onChange={props.resetErrorHandler} className="postForm--form" onSubmit={submitPost}>
                    <input
                        className="postForm--postText"
                        name="postText" type="text"
                        maxLength={props.maxPostLength}
                        onChange={handleChange}
                        aria-label="Your post"
                        value={postText}
                    >

                    </input>
                    <button className="postForm--button" type="submit" disabled={postText.length === 0}>
                        Submit
                    </button>
                </form>
            </div >

    )
}