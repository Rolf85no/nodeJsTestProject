import React from "react";

export default function ReplyForm(props) {

    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleUpdatePost(props.id, 'reply')
    }

    return (
        <div className="postForm" style={{ backgroundColor: 'lightgrey', width: '100%' }}>
            <img src={props.img ? props.img : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"} className="postForm--image" alt="profile"></img>
            <form
                onChange={props.resetErrorHandler}
                className="postForm--form reply"
                onSubmit={handleSubmit}
            >
                <input
                    className="postForm--postText"
                    id="replyPost"
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

    )
}