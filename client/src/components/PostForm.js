import React from "react";
import UpdateUserForm from "./UpdateUserForm";

export default function PostForm({ choosenUser, maxPostLength, handleWriteMessage, handleSubmit, typeOfPost, handleUpdateUser, defaultImage, resetMessageHandler, repliedPostId }) {
    const [editing, setEditing] = React.useState(false);
    const [postText, setPostText] = React.useState('');

    const handleChange = function (event) {
        if (event.target.value.length >= maxPostLength) {
            handleWriteMessage(`Too many characters, max amount is: ${maxPostLength}`)
        }
        setPostText(event.target.value);
    }

    const toggleEditing = () => {
        setEditing(prevState => !prevState)
    }

    const submitPost = (event) => {
        event.preventDefault();
        if (typeOfPost === "Post") handleSubmit(postText);
        else handleSubmit(postText, repliedPostId, typeOfPost);
        setPostText('');
    }

    return (
        editing && typeOfPost === "Post"
            ?
            <UpdateUserForm
                id={choosenUser._id}
                toggleEditing={toggleEditing}
                username={choosenUser.username}
                handleUpdateUser={handleUpdateUser}
            />
            :
            <div className="postForm">
                <img src={choosenUser.img ? choosenUser.img : defaultImage} className="postForm--image" alt="profile" onClick={toggleEditing}></img>
                <form onChange={resetMessageHandler} className="postForm--form" onSubmit={submitPost}>
                    <input
                        className="postForm--postText"
                        name="postText" type="text"
                        maxLength={maxPostLength}
                        onChange={handleChange}
                        aria-label="Write post"
                        value={postText}
                        autoFocus
                    >

                    </input>
                    <button className="postForm--button" type="submit" disabled={postText.length === 0}>
                        {typeOfPost === 'Post' ? 'Submit' : 'Reply'}
                    </button>
                </form>
            </div >

    )
}