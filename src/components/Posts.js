import React from 'react'
import ReplyForm from '../components/ReplyForm';

export default function Posts(props) {
    let loggedIn = false;
    for (const item of props.users) {
        if (props.username === item.username) {
            loggedIn = item.loggedIn;
        }
    }

    const [updating, setUpdating] = React.useState(false);
    const [replying, setReplying] = React.useState(false);
    const [showReplies, setShowReplies] = React.useState(false);
    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
    }
    const showReplyForm = () => {
        setReplying(prevReplying => !prevReplying);
    }

    const showHideReplies = () => {

        setShowReplies(prev => !prev);
    }

    const replyElements = props.replies ? props.replies.map(reply => {
        return (
            <div className="replyContainer" style={{ display: showReplies ? 'flex' : 'none' }} key={reply._id}>
                <h5 className="replyContainer--username">{reply.username}:

                </h5>
                <p className="replyContainer--postText">{reply.post}</p>
            </div>
        )
    })
        :
        <div></div>

    return (
        <div className="postContainer" onChange={props.resetErrorHandler}>
            <h3 className="postContainer--username">{props.username}:
                <span className="postContainer--logInStatus" style={{ color: loggedIn ? 'green' : 'red' }}> ●</span>
            </h3>
            {
                !updating
                    ?
                    <p className="postContainer--postText">{props.post}</p>
                    :
                    <textarea placeholder={props.post} className="postContainer--updateInput" type="text" name="postText" maxLength={props.maxPostLength} onChange={handleChange} />

            }
            <div className="postContainer--buttons">
                {
                    props.username === props.choosenUser
                    &&
                    <div>
                        <button onClick={() => props.handleDeletePost(props.id)}> 🗑
                        </button>
                        {
                            !updating
                                ?
                                <button onClick={() => setUpdating(prevUpdate => !prevUpdate)}>✒️</button>
                                :
                                <button onClick={() => { setUpdating(prevUpdate => !prevUpdate); props.handleUpdatePost(props.id, 'update'); }}>🚀</button>
                        }
                    </div>
                }
                <button onClick={showReplyForm}> 📣</button>
            </div>
            {replying &&
                <ReplyForm
                    handleUpdatePost={props.handleUpdatePost}
                    maxPostLength={props.maxPostLength}
                    id={props.id}

                />
            }
            {props.replies.length > 0 &&
                <div>

                    <button onClick={showHideReplies} className="showHide--button">{showReplies ? 'Hide replies' : 'Show replies'}</button>
                </div>
            }
            {
                replyElements

            }
        </div >
    )
}