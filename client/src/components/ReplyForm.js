import React from "react";

export default function ReplyForm(props) {
    const [postText, setPostText] = React.useState("")

    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleWriteMessage(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
        setPostText(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleUpdatePost(postText, props.id, 'reply')
        setPostText('')
    }

    return (
        <div className="postForm replyForm">
            <img src={props.img} className="postForm--image" alt="profile"></img>
            <form
                onChange={props.resetWriteMessageHandler}
                className="postForm--form reply"
                onSubmit={handleSubmit}
            >
                <input
                    className="postForm--postText"
                    id="replyPost"
                    name="postText" type="text"
                    maxLength={props.maxPostLength}
                    onChange={handleChange}
                    value={postText}
                    aria-label="Your post"
                >

                </input>
                <button className="postForm--button" type="submit" disabled={postText.length === 0}>
                    Submit
                </button>
            </form>
        </div >

    )
}