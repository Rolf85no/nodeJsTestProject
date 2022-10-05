import React from 'react'
import ReplyForm from '../components/ReplyForm';
import Replies from '../components/Replies';

export default function Posts(props) {
    let postUser = {}
    for (const user of props.users) {
        if (props.postUserId === user._id) {
            postUser = user;
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

    const replyElements = props.replies.map(reply => {
        return (
            <Replies
                replyUserId={reply.userID}
                post={reply.post}
                id={reply.id}
                key={reply.id}
                users={props.users}
            />
        )
    })


    return (
        <div className="postContainer" onChange={props.resetErrorHandler}>
            <h3 className="postContainer--username"> {postUser.username}:
                <span className="postContainer--logInStatus" style={{ color: postUser.loggedIn ? 'green' : 'red' }}> ●</span>
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
                    props.postUserId === props.choosenUserId
                    &&
                    <div className="deleteEditReplyButtons">
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
                <button onClick={() => setReplying(prevReplying => !prevReplying)}> 📣</button>
            </div>
            {replying &&
                <ReplyForm
                    handleUpdatePost={props.handleUpdatePost}
                    maxPostLength={props.maxPostLength}
                    id={props.id}
                    img={props.choosenUserImg}

                />
            }
            {props.replies.length > 0 &&
                <div>

                    <button onClick={() => setShowReplies(prev => !prev)} className="showHide--button">{showReplies ? 'Hide replies' : 'Show replies'}</button>
                </div>
            }
            {
                showReplies && replyElements

            }
        </div >
    )
}