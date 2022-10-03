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
                <div>
                    <img src={props.img} className="postForm--image" alt="profile"></img>
                    <button onClick={() => setEditing(true)}> Edit user</button>
                </div>

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

            <form className="postForm">
                <label htmlFor="imgLink">Image-link:</label>
                <input name="imgLink" className="imgInput">
                </input>
                <button className="postForm--button" type="button" onClick={() => { handleUpdateUserSubmit(); setEditing(false); }}>
                    Save
                </button>

            </form >


    )
}