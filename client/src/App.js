import React from 'react'
import Navbar from './components/Navbar'
import Posts from './components/Posts'
import PostForm from './components/PostForm'
import ErrorMessage from './components/ErrorMessage';
import Login from './components/LogIn';

export default function App() {
  const [backEndData, setBackEndData] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [choosenUser, setChoosenUser] = React.useState("");
  const url = "https://localhost:3000/api/v1/posts";
  const maxPostLength = 150;
  const maxUsernameLength = 20;
  const [error, setError] = React.useState(null);

  const logIn = async (event) => {
    try {
      event.preventDefault();
      const username = document.querySelector('#logIn--username');
      const password = document.querySelector('#logIn--password');
      if (!username.value && !password.value) return writeError('Please write username and password')

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value, loggedIn: true })
      }

      if (event.target.name === 'login') {
        const res = await fetch(`${url}/login`, requestOptions)
        const apiData = await res.json();
        if (!apiData.userFound) return writeError('Can`t find password or username')
      }
      else {
        const res = await fetch(`${url}/register`, requestOptions)
        const apiData = await res.json();
        if (apiData.userFound) return writeError('Username already taken')
      }
      users.forEach(user => {
        if (user.username === username.value) setChoosenUser(user);
      })
      setLoggedIn(true);
      setLoading(true);
    }
    catch (error) {
      console.log(error)
    }

  }

  const logOut = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: choosenUser.username, loggedIn: false })
    }

    fetch(url, requestOptions)
    setLoggedIn(false)
  }

  React.useEffect(() => {
    if (!loading) return
    const getUsers = async () => {
      try {

        const resPosts = await fetch(url);
        if (!resPosts.status === 200) return writeError('Could not connect API');
        const apiData = await resPosts.json();
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

    getUsers();
  }, [loading, choosenUser, users])

  const submitPost = async (event) => {
    try {
      event.preventDefault();
      const username = choosenUser.username;
      const post = document.querySelector('.postForm--postText');

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username, post: post.value, userID: choosenUser._id })
      }
      if (!post.value) {
        throw new Error('Please write something')
      }
      const res = await fetch(url, requestOptions);
      if (!res.status === 200) throw new Error('Something went wrong');
      post.value = '';
      setLoading(true);

    }
    catch (err) {
      console.log(err)
      setLoading(false)
      setError(err.message)
    }
  }

  const deletePost = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!res.status === 200) throw new Error('Something went wrong');
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
      const res = await fetch(`${url}/${id}`, requestOptions);
      if (!res.status === 200) throw new Error('Could not update post, try again later')
      setLoading(true);
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
      const requestOptions =
      {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username.value ? username.value : choosenUser.username, img: img.value ? img.value : choosenUser.img })
      }
      const res = await fetch(`${url}/user/${id}`, requestOptions);
      if (!res.status === 200) throw new Error('Could not update post, try again later')
      setLoading(true);
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
          <PostForm
            handleSubmit={submitPost}
            maxPostLength={maxPostLength}
            resetErrorHandler={resetError}
            handleError={writeError}
            maxUsernameLength={maxUsernameLength}
            img={choosenUser.img ? choosenUser.img : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"}
            typeOfPost="Post"
            handleUpdateUser={updateUser}
            username={choosenUser.username}
            id={choosenUser._id}
          />
          <h3>News-reel:</h3>

          {postsElements}
        </main>

      }
    </div>

  )
}