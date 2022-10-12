
import React from 'react';

export default function LogIn(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [methodType, setMethodType] = React.useState("");

    const logInOrRegister = (event) => {
        event.preventDefault();
        const requestBody = { username: username, password: password, loggedIn: true };
        props.handleLogin(requestBody, methodType)
    }

    const handleChange = (event) => {
        if (event.target.name === "logIn--username") setUsername(event.target.value)
        if (event.target.name === "logIn--password") setPassword(event.target.value)
    }
    return (
        <form className="logIn" onSubmit={logInOrRegister}>
            <div>
                <label htmlFor="logIn--username"> Username:</label>
                <input name="logIn--username" id="logIn--username" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="logIn--password">Password:</label>
                <input name="logIn--password" type="password" id="logIn--password" onChange={handleChange} />
            </div>
            <div className="login--buttons">
                <button className="logIn--button" disabled={username.length === 0 || password.length === 0} onClick={() => setMethodType('PATCH')}> Log In</button>
                <button className="logIn--button" name="POST" disabled={username.length === 0 || password.length === 0} onClick={() => setMethodType('POST')}> Register</button>
            </div>

        </form>
    )
}