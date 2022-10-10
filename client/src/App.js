import React from 'react'
import Navbar from './components/Navbar'
import Posts from './components/Posts'
import PostForm from './components/PostForm'
import Users from './components/Users'
import ErrorMessage from './components/ErrorMessage';
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

  const logIn = async (event) => {
    try {
      event.preventDefault();
      const username = document.querySelector('#logIn--username');
      const password = document.querySelector('#logIn--password');
      if (!username.value || !password.value) return writeError('Please write username and password')
      const requestOptions = {
        method: event.target.name,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value, loggedIn: true })
      }
      const response = await checkLogin_RegisterUser_Logout(requestOptions, `${url}/login`);
      if (!response.success) return writeError(response.message);
      setChoosenUser(response.user);
      setLoggedIn(true);
    }
    catch (error) {
      console.log(error)
    }

  }

  const logOut = async () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: choosenUser.username })
    }
    const response = await checkLogin_RegisterUser_Logout(requestOptions, `${url}/logout`);
    if (!response.success) return writeError(response.message);
    setLoggedIn(false)
  }

  const getUsersAndPosts = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        method: 'GET'
      }
      const resPosts = await fetchUsersAndPosts(requestOptions, url);
      if (!resPosts.success) return writeError(resPosts.message);
      const apiData = await resPosts;
      setBackEndData(apiData.posts);
      setUsers(apiData.users);
      if (choosenUser) {
        apiData.users.forEach(user => {
          user._id === choosenUser._id && setChoosenUser(user);
        })
      }
    }
    catch (err) {
      console.log(err);
      setBackEndData(null)
      writeError('Could not connect with database')
    }
    finally {
      setLoading(false);
    }
  }


  React.useEffect(() => {
    getUsersAndPosts();
  }, [])


  const submitPost = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const post = document.querySelector('.postForm--postText');
      if (!post.value) {
        writeError('Please write something')
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: choosenUser.username, post: post.value, userID: choosenUser._id })
      }
      const res = await fetchUsersAndPosts(requestOptions, url);
      if (!res.success) return writeError(res.message);
      post.value = '';
      setLoading(false);
      getUsersAndPosts();

    }
    catch (err) {
      console.log(err)
      setLoading(true)
      setError(err.message)
    }
  }

  const deletePost = async (id) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      }
      setLoading(true);
      const res = await fetchUsersAndPosts(requestOptions, `${url}/${id}`,);
      if (!res.success) return writeError(res.message);
      setLoading(false);
      getUsersAndPosts();
    }
    catch (err) {
      console.log(err)
      writeError(err.message)
    }
  }


  const updatePost = async (id, updateOrReply) => {
    try {
      const postInput = updateOrReply === 'update' ? document.querySelector('.postContainer--updateInput') : document.querySelector('#replyPost');
      if (!postInput.value) return
      const requestOptions =
        updateOrReply === 'update' ?
          {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ post: postInput.value })
          }

          :
          {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ reply: { userID: choosenUser._id, post: postInput.value } })
          }

      const res = await fetchUsersAndPosts(requestOptions, `${url}/${id}`);
      if (!res.status === 200) throw new Error('Could not update post, try again later')
      getUsersAndPosts();
    }
    catch (err) {
      console.log(err)
      writeError(err.message)
    }
  }

  const resetError = function () {
    if (error) setError(null)
  }

  const writeError = function (msg) {
    setError(msg)
  }

  const updateUser = async (id) => {
    try {
      const img = document.querySelector('.imgInput');
      const username = document.querySelector('#updateUsername');
      if (!img.value && !username.value) return

      const requestOptions =
      {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username.value ? username.value : choosenUser.username, img: img.value ? img.value : choosenUser.img })
      }

      const res = await fetchUsersAndPosts(requestOptions, `${url}/user/${id}`);
      if (!res.success) writeError(res.message);
      getUsersAndPosts();
    }
    catch (err) {
      setLoading(false);
      console.log(err)
      writeError(err.message);
    }

  }

  const postsElements = !loading
    ?
    backEndData.map(post => {
      return (
        < Posts
          key={post._id}
          id={post._id}
          postUserId={post.userID}
          choosenUserName={choosenUser.username}
          choosenUserId={choosenUser._id}
          choosenUserImg={choosenUser.img}
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
    })

    :

    <div> loading </div>


  return (

    <div>
      <Navbar
        loggedIn={loggedIn}
        handleLogout={logOut}
      />
      <ErrorMessage
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