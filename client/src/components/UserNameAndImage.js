
export default function UserNameAndImage({ postUser, defaultImage }) {
    return (
        <div className="usernameAndImage">
            <div className="usernameAndImage--image"><img src={postUser.img ? postUser.img : defaultImage} alt="profile"></img> <span className="usernameAndImage--image--logInStatus" style={{ color: postUser.loggedIn ? 'green' : 'red' }}> ●</span></div>
            <h4 className="usernameAndImage--username"> {postUser.username}:

            </h4>
        </div>
    )
}