import React from 'react'
import Replies from '../components/Replies';
import PostForm from './PostForm';
import UserNameAndImage from './UserNameAndImage';

export default function Posts({ postValues, choosenUser, users, defaultImage, handleDeletePost, handleUpdatePost, resetMessageHandler, handleWriteMessage, maxPostLength }) {
    const [updating, setUpdating] = React.useState(false);
    const [replying, setReplying] = React.useState(false);
    const [showReplies, setShowReplies] = React.useState(true);
    const [editedPost, setEditedPost] = React.useState("")
    const [postUser] = users.filter(user => {
        return user._id === postValues.userID
    })
    const handleChange = function (event) {
        if (event.target.value.length >= maxPostLength) {
            handleWriteMessage(`Too many characters, max amount is: ${maxPostLength}`)
        }
        setEditedPost(event.target.value);
    }

    const updatePost = (e) => {
        e.preventDefault();
        setUpdating(prevUpdate => !prevUpdate)
        handleUpdatePost(editedPost, postValues._id, 'update')
    }

    return (
        <div className="postContainer" onChange={resetMessageHandler}>
            <UserNameAndImage
                postUser={postUser}
                key={postUser._id}
                defaultImage={defaultImage}
            />

            {
                !updating
                    ?
                    <p className="postContainer--postText">{postValues.post}</p>
                    :
                    <textarea
                        placeholder={postValues.post}
                        className="postContainer--updateInput"
                        type="text"
                        name="postText"
                        maxLength={maxPostLength}
                        onChange={handleChange}
                        autoFocus
                    />

            }
            <hr />
            <div className="postContainer--buttons">
                {
                    postValues.userID === choosenUser._id
                    &&

                    <div className="deleteEditReplyButtons">
                        {
                            !updating
                                ?
                                <div>
                                    <button onClick={() => handleDeletePost(postValues._id)}> Delete 🗑
                                    </button>

                                    <button onClick={() => setUpdating(prevUpdate => !prevUpdate)}> Edit ✒️</button>
                                </div>
                                :
                                <button onClick={updatePost} >{editedPost.length > 0 ? 'Submit 🚀' : 'Back ❌'}</button>
                        }

                    </div>

                }
                {!updating && <button onClick={() => setReplying(prevReplying => !prevReplying)} name="reply"> {replying ? 'Back ❌' : 'Reply 📣'}</button>}
            </div>

            {replying &&
                <PostForm
                    choosenUser={choosenUser}
                    handleSubmit={handleUpdatePost}
                    maxPostLength={maxPostLength}
                    typeOfPost="reply"
                    repliedPostId={postValues._id}
                    resetMessageHandler={resetMessageHandler}
                    handleWriteMessage={handleWriteMessage}
                />
            }
            {postValues.replies.length > 0 &&
                <div className="showHide--container">
                    <hr></hr>
                    <button onClick={() => setShowReplies(prev => !prev)} className="showHide--button">{showReplies ? 'Hide replies ⌃' : 'Show replies ⌄'}</button>
                </div>
            }
            {
                showReplies && postValues.replies.map(reply => {
                    return (
                        <Replies
                            reply={reply}
                            key={reply._id}
                            users={users}
                        />
                    )
                }).reverse()

            }
        </div >
    )
}