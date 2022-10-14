import React from 'react'
import Navbar from './components/Navbar'
import Posts from './components/Posts'
import PostForm from './components/PostForm'
import Users from './components/Users'
import BackEndMessage from './components/BackEndMessage';
import Login from './components/LogIn';
import { checkLogin_RegisterUser_Logout } from './proxies/checkLogin_RegisterUser_Logout';
import { fetchUsersAndPosts } from './proxies/fetchUsersAndPosts';

export default function App() {
  const [backEndData, setBackEndData] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [choosenUser, setChoosenUser] = React.useState("");
  const url = "https://localhost:3000/api/v1/posts";
  const maxPostLength = 150;
  const maxUsernameLength = 20;
  const defaultImage = 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg';
  const [error, setError] = React.useState(null);

  const logIn = async (requestBody, methodType) => {
    setLoading(true)
    const response = await checkLogin_RegisterUser_Logout(`${url}/login`, requestBody, methodType);
    if (!response.success) { setLoading(false); return writeError(response.message) };
    setChoosenUser(response.user);
    setLoggedIn(true);
    getUsersAndPosts();

  }

  const logOut = async (event) => {
    const methodType = event.target.name;
    const requestBody = { username: choosenUser.username }
    const response = await checkLogin_RegisterUser_Logout(`${url}/logout`, requestBody, methodType);
    if (!response.success) return writeError(response.message);
    setLoggedIn(false)
  }

  const getUsersAndPosts = async () => {
    const requestOptions = {
      method: 'GET'
    }
    const resPosts = await fetchUsersAndPosts(url, requestOptions);
    if (!resPosts.success) { setLoading(false); return writeError(resPosts.message) };
    const apiData = await resPosts;
    setBackEndData(apiData.posts);
    setUsers(apiData.users);
    for (const user of apiData.users) {
      if (user._id === choosenUser._id) setChoosenUser(user)
    }
    setLoading(false);
  }

  const submitPost = async (post) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: choosenUser.username, post: post, userID: choosenUser._id })
    }
    setLoading(true);
    const res = await fetchUsersAndPosts(url, requestOptions);
    if (!res.success) { setLoading(false); return writeError(res.message) };

    getUsersAndPosts();

  }

  const deletePost = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    }
    setLoading(true);
    const res = await fetchUsersAndPosts(`${url}/${id}`, requestOptions);
    if (!res.success) { setLoading(false); return writeError(res.message) };
    getUsersAndPosts();

  }


  const updatePost = async (post, id, updateOrReply) => {
    if (post.length === 0) return
    const reqBody = updateOrReply === 'update' ? { post: post } : { reply: { userID: choosenUser._id, post: post } }
    const requestOptions =
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(reqBody)
    }
    setLoading(true);
    const res = await fetchUsersAndPosts(`${url}/${id}`, requestOptions);
    console.log(res);
    if (!res.success) { setLoading(false); return writeError(res.message); }
    getUsersAndPosts();
  }

  const updateUser = async (id, username, imageLink) => {

    if (!imageLink && !username) return

    const requestOptions =
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: username.length > 0 ? username : choosenUser.username, img: imageLink.length > 0 ? imageLink : choosenUser.img })
    }
    setLoading(true)
    const res = await fetchUsersAndPosts(`${url}/user/${id}`, requestOptions);
    if (!res.success) { setLoading(false); return writeError(res.message); }
    getUsersAndPosts();

  }

  const resetError = function () {
    if (error) setError(null)
  }

  //////////// MAKE GENERAL FUNCTION AND STATE FOR BOTH ERROR AND SUCCESS MESSAGE FROM BACK-END
  const writeError = function (msg) {
    setError(msg)
  }

  const postsElements = backEndData || !loading
    ?
    backEndData.map(post => {
      return (
        < Posts
          key={post._id}
          id={post._id}
          postUserId={post.userID}
          choosenUserName={choosenUser.username}
          choosenUserId={choosenUser._id}
          choosenUserImg={choosenUser.img ? choosenUser.img : defaultImage}
          defaultImage={defaultImage}
          post={post.post}
          replies={post.replies}
          handleDeletePost={deletePost}
          handleUpdatePost={updatePost}
          maxPostLength={maxPostLength}
          resetErrorHandler={resetError}
          handleError={writeError}
          users={users}
          handleSubmit={submitPost}
        />
      )
    }).reverse()

    :

    <div> loading.. </div>


  return (

    <div>
      <Navbar
        loggedIn={loggedIn}
        handleLogout={logOut}
      />
      <BackEndMessage
        message={error}
      />

      {!loggedIn

        ?
        <Login
          handleLogin={logIn}
          resetErrorHandler={resetError}
        />

        :

        <main>
          <div className="somethingContainer"></div>
          <div className="postsAndPostFormcontainer">
            <PostForm
              handleSubmit={submitPost}
              maxPostLength={maxPostLength}
              resetErrorHandler={resetError}
              handleError={writeError}
              maxUsernameLength={maxUsernameLength}
              img={choosenUser.img ? choosenUser.img : defaultImage}
              typeOfPost="Post"
              handleUpdateUser={updateUser}
              username={choosenUser.username}
              id={choosenUser._id}
            />
            <h3>News-reel:</h3>

            {postsElements}
          </div>

          {users &&
            <Users
              users={users}
              defaultImage={defaultImage}

            />
          }
        </main>

      }
    </div>

  )
}