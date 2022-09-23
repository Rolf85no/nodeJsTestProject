import React from 'react'

export default function Posts(props) {

    const [updating, setUpdating] = React.useState(false);
    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }
    return (
        <div className="postContainer" onChange={props.resetErrorHandler}>
            <h3 className="postContainer--username">{props.username}:</h3>
            {
                !updating
                    ?
                    <p className="postContainer--postText">{props.post}</p>
                    :
                    <textarea placeholder={props.post} className="postContainer--updateInput" type="text" name="postText" maxLength={props.maxPostLength} onChange={handleChange} />

            }
            {
                props.username === props.choosenUser
                &&
                <div className="postContainer--buttons">
                    <button onClick={() => props.handleDeletePost(props.id)}> Delete</button>
                    {
                        !updating
                            ?
                            <button onClick={() => setUpdating(prevUpdate => !prevUpdate)}>Update</button>
                            :
                            <button onClick={() => { setUpdating(prevUpdate => !prevUpdate); props.handleUpdatePost(props.id); }}>Save</button>
                    }
                </div>
            }
        </div >
    )
}