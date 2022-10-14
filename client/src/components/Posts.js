import React from 'react'
import Replies from '../components/Replies';
import PostForm from './PostForm';

export default function Posts(props) {
    const [updating, setUpdating] = React.useState(false);
    const [replying, setReplying] = React.useState(false);
    const [showReplies, setShowReplies] = React.useState(true);
    const [editedPost, setEditedPost] = React.useState("")
    const [postUser, setPostUser] = React.useState({})

    React.useEffect(() => {
        for (const user of props.users) {
            if (props.postUserId === user._id) {
                setPostUser(user);
            }
        }
    }, [props.users, props.postUserId])


    const handleChange = function (event) {
        if (event.target.value.length >= props.maxPostLength) {
            props.handleError(`Too many characters, max amount is: ${props.maxPostLength}`)
        }
        setEditedPost(event.target.value);
    }

    const updatePost = (e) => {
        e.preventDefault();
        setUpdating(prevUpdate => !prevUpdate)
        props.handleUpdatePost(editedPost, props.id, 'update')
    }

    const replyElements = props.replies.map(reply => {
        return (
            <Replies
                replyUserId={reply.userID}
                post={reply.post}
                id={reply._id}
                key={reply._id}
                users={props.users}
            />
        )
    })


    return (
        <div className="postContainer" onChange={props.resetErrorHandler}>
            <div className="postContainer--info">
                <div><img src={postUser.img ? postUser.img : props.defaultImage} className="postContainer--info--image" alt="profile"></img></div>
                <h4 className="postContainer--info--username"> {postUser.username}:
                    <span className="postContainer--logInStatus" style={{ color: postUser.loggedIn ? 'green' : 'red' }}> ●</span>
                </h4>
            </div>

            {
                !updating
                    ?
                    <p className="postContainer--postText">{props.post}</p>
                    :
                    <textarea
                        placeholder={props.post}
                        className="postContainer--updateInput"
                        type="text"
                        name="postText"
                        maxLength={props.maxPostLength}
                        onChange={handleChange}
                    />

            }
            <div className="postContainer--buttons">
                {
                    props.postUserId === props.choosenUserId
                    &&

                    <div className="deleteEditReplyButtons">
                        {
                            !updating
                                ?
                                <div>
                                    <button onClick={() => props.handleDeletePost(props.id)}> Delete 🗑
                                    </button>

                                    <button onClick={() => setUpdating(prevUpdate => !prevUpdate)}> Edit ✒️</button>
                                </div>
                                :
                                <button onClick={updatePost} >{editedPost.length > 0 ? 'Submit 🚀' : 'Back ❌'}</button>
                        }

                    </div>

                }
                {!updating && <button onClick={() => setReplying(prevReplying => !prevReplying)}> Reply 📣</button>}
            </div>
            {replying &&
                <PostForm
                    handleSubmit={props.handleUpdatePost}
                    maxPostLength={props.maxPostLength}
                    img={props.choosenUserImg}
                    typeOfPost="Reply"
                    username={props.choosenUserName}
                    choosenUserId={props.choosenUserId}
                    postId={props.id}
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