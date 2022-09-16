import React from 'react'

export default function App() {
  const [backEndData, setBackEndData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [choosenUser, setChoosenUser] = React.useState("");
  const url = "http://10.2.0.228:3000/api/v1/posts"

  React.useEffect(() => {
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
      }
      finally {
        setLoading(false);
      }
    }

    getUsers();
  }, [])

  const getUserPost = async (event) => {
    try {
      setLoading(true)
      setChoosenUser(event.target.value);
      const res = await fetch(`${url}/${event.target.value}`)
      const apiData = await res.json();
      setBackEndData(apiData.posts);

    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false);
    }

  }

  const postsElements = !loading
    ?
    backEndData.map(item => {
      return (
        <div key={item._id}>
          <h3>{item.username}</h3>
          <p>{item.post}</p>

        </div>

      )
    })

    :

    <div> loading </div>

  const uniqueUsersEl = !loading ? users.map(user => <option key={user} value={user}> {user}</option>) : ''

  return (
    <main>
      <h2>Posts:</h2>
      <div>
        <h3>Choose poster:</h3>
        <select onChange={getUserPost} value={choosenUser}>
          <option value={""}> All</option>
          {uniqueUsersEl}
        </select>
      </div>

      {postsElements}
    </main>
  )
}