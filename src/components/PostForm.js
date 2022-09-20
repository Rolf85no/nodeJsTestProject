import React from "react";

export default function PostForm(props) {

    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }

    return (
        <form className="postForm" onChange={props.resetErrorHandler}>
            <label htmlFor="postUsername">Username: </label>
            <input
                className="postForm--username"
                name="postUsername"
                type="text"
                maxLength={props.maxUsernameLength}
                onChange={handleChange}
            >
            </input>
            <label htmlFor="postText">Post:</label>
            <input
                className="postForm--postText"
                name="postText" type="text"
                maxLength={props.maxPostLength}
                onChange={handleChange}
            >

            </input>
            <button className="postForm--button" onClick={props.handleSubmit}>
                Submit
            </button>
        </form>
    )
}