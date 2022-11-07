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
  const [message, setMessage] = React.useState({ message: "", success: null });

  const logIn = async (requestBody, methodType) => {
    setLoading(true)
    const response = await checkLogin_RegisterUser_Logout(`${url}/login`, requestBody, methodType);
    if (!response.success) { setLoading(false); return writeMessage(response.message, response.success) };
    setChoosenUser(response.user);
    setLoggedIn(true);
    getUsersAndPosts(response.message);
  }


  const logOut = async (event) => {
    const methodType = event.target.name;
    const requestBody = { username: choosenUser.username }
    const response = await checkLogin_RegisterUser_Logout(`${url}/logout`, requestBody, methodType);
    if (!response.success) return writeMessage(response.message, response.success);
    setLoggedIn(false)
    writeMessage(response.message, response.success);
    setChoosenUser("");
  }

  const getUsersAndPosts = async (message) => {
    const requestOptions = {
      method: 'GET'
    }
    const resPosts = await fetchUsersAndPosts(url, requestOptions);
    if (!resPosts.success) { setLoading(false); return writeMessage(resPosts.message, resPosts.success) };
    const apiData = await resPosts;
    setBackEndData(apiData.posts);
    setUsers(apiData.users);
    // for (const user of apiData.users) {
    //   if (user._id === choosenUser._id) {
    //     setChoosenUser(user)
    //   }

    // }
    setLoading(false);
    setMessage({ message: message, success: true });
  }

  const submitPost = async (post) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: choosenUser.username, post: post, userID: choosenUser._id })
    }
    setLoading(true);
    const res = await fetchUsersAndPosts(url, requestOptions);
    if (!res.success) { setLoading(false); return writeMessage(res.message, res.success) };

    getUsersAndPosts(res.message);

  }

  const deletePost = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    }
    setLoading(true);
    const res = await fetchUsersAndPosts(`${url}/${id}`, requestOptions);
    if (!res.success) { setLoading(false); return writeMessage(res.message, res.success) };
    getUsersAndPosts(res.message);
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
    if (!res.success) { setLoading(false); return writeMessage(res.message, res.success); }
    getUsersAndPosts(res.message);
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
    if (!res.success) { setLoading(false); return writeMessage(res.message, res.success); }
    getUsersAndPosts(res.message);

  }

  const resetMessage = function () {
    if (message.message) setMessage({ message: "", success: null })
  }

  const writeMessage = function (msg, success) {
    setMessage({ message: msg, success: success })
  }

  return (

    <div>
      <Navbar
        loggedIn={loggedIn}
        handleLogout={logOut}
      />

      <BackEndMessage
        message={message}
      />

      {!loggedIn

        ?
        <Login
          handleLogin={logIn}
          resetMessageHandler={resetMessage}
          handleWriteMessage={writeMessage}
        />

        :

        <main>

          <div className="somethingContainer">

          </div>
          <div className="postsAndPostFormcontainer">
            <PostForm
              choosenUser={choosenUser}
              handleSubmit={submitPost}
              maxPostLength={maxPostLength}
              resetMessageHandler={resetMessage}
              handleWriteMessage={writeMessage}
              maxUsernameLength={maxUsernameLength}
              defaultImage={defaultImage}
              typeOfPost="Post"
              handleUpdateUser={updateUser}

            />
            <h3 className="postsAndPostFormConntainer--title">News-reel:</h3>


            {backEndData && !loading ?
              backEndData.map(post =>

                < Posts
                  key={post._id}
                  postValues={post}
                  choosenUser={choosenUser}
                  users={users}
                  defaultImage={defaultImage}
                  handleDeletePost={deletePost}
                  handleUpdatePost={updatePost}
                  resetMessageHandler={resetMessage}
                  handleWriteMessage={writeMessage}
                  maxPostLength={maxPostLength}
                  handleSubmit={submitPost}

                />).reverse()
              :
              <>loading...</>
            }


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