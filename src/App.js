import React from 'react'
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
  const url = "http://localhost:3000/api/v1/posts";
  const maxPostLength = 150;
  const maxUsernameLength = 20;
  const [error, setError] = React.useState(null);

  const logIn = function () {
    setLoggedIn(true);
  }

  React.useEffect(() => {
    if (!loading) return
    const getUsers = async () => {
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setBackEndData(apiData.posts);
        const uniqueSet = new Set(apiData.posts.map(item => item.username))
        const uniqueUsers = [...uniqueSet]
        setUsers(uniqueUsers);
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
  }, [loading])


  const getUserPost = async (event) => {
    try {
      setChoosenUser(event.target.value);
      const res = await fetch(`${url}/${event.target.value}`)
      const apiData = await res.json();
      setBackEndData(apiData.posts);
      setLoading(true)
    }
    catch (err) {
      console.log(err)
      writeError('Could not connect with database')
    }
    finally {
      setLoading(false);
    }

  }

  const submitPost = async (event) => {
    try {
      event.preventDefault();
      const username = document.querySelector('.postForm--username');
      const post = document.querySelector('.postForm--postText');

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username.value, post: post.value })
      }
      if (!username.value || !post.value) {
        throw new Error('Please write username or post')
      }
      const res = await fetch(url, requestOptions);
      if (!res.status === 200) throw new Error('Something went wrong');
      username.value = '';
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


  const updatePost = async (id) => {
    try {
      const updateInput = document.querySelector('.postContainer--updateInput');
      if (!updateInput.value) return
      setLoading(true);
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ post: updateInput.value })
      }
      const res = await fetch(`${url}/${id}`, requestOptions);
      if (!res.status === 200) throw new Error('Could not update post, try again later')
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


  const postsElements = !loading
    ?
    backEndData.map(item => {
      return (
        < Posts
          key={item._id}
          id={item._id}
          username={item.username}
          post={item.post}
          handleDeletePost={deletePost}
          handleUpdatePost={updatePost}
          maxPostLength={maxPostLength}
          resetErrorHandler={resetError}
          handleError={writeError}
        />
      )
    })

    :

    <div> loading </div>
  const uniqueUsersEl = !loading ? users.map(user => <option key={user} value={user}> {user}</option>) : ''

  return (
    <div>

      {!loggedIn

        ?
        <Login
          handleLogin={logIn}
        />

        :

        <main>
          <ErrorMessage
            message={error}

          />
          <PostForm
            handleSubmit={submitPost}
            maxPostLength={maxPostLength}
            resetErrorHandler={resetError}
            handleError={writeError}
            maxUsernameLength={maxUsernameLength}
          />
          <h3>News-reel:</h3>
          <div>
            <h4>Choose poster:</h4>
            <select onChange={getUserPost} value={choosenUser}>
              <option value={""}> All</option>
              {uniqueUsersEl}
            </select>
          </div>

          {postsElements}
        </main>

      }
    </div>

  )
}