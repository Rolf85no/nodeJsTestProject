
import React from 'react';

export default function LogIn({ handleLogin, resetMessageHandler, handleWriteMessage }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [registering, setRegistering] = React.useState(false);

    const logInOrRegister = (event) => {
        event.preventDefault();
        if (!username.length > 0 || !password.length > 0) return handleWriteMessage('Please write username and password', false);
        const requestBody = { username: username, password: password, loggedIn: true };
        handleLogin(requestBody, event.target.name)
    }

    return (
        <form className="logIn" onSubmit={logInOrRegister} name={registering ? 'POST' : 'PATCH'} onChange={resetMessageHandler}>
            <h3>{registering ? "Create new user" : "Log in"}</h3>
            <div>
                <label htmlFor="logIn--username"> Username:</label>
                <input name="logIn--username" id="logIn--username" onChange={e => setUsername(e.target.value)} autoFocus type="text" value={username} />
            </div>
            <div>
                <label htmlFor="logIn--password">Password:</label>
                <input name="logIn--password" type="password" id="logIn--password" onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            {registering
                ?
                <div className="logIn--buttons">
                    <button className="logIn--button" disabled={!username || !password}> Submit</button>
                    <button className="logIn--button" onClick={() => setRegistering(false)} type="button">Back</button>

                </div>
                :
                <div className="logIn--buttons">
                    <button className="logIn--button" disabled={!username || !password}> Log In</button>
                    <button className="logIn--button" onClick={() => setRegistering(true)} type="button">Register</button>
                </div>
            }

        </form>
    )
}