import React from "react";

export default function PostForm(props) {

    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }

    return (
        <div className="postForm">
            <img src={props.img ? props.img : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"} className="postForm--image" alt="profile"></img>
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

    )
}