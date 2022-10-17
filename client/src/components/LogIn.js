
import React from 'react';

export default function LogIn(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [registering, setRegistering] = React.useState(false);

    const logInOrRegister = (event) => {
        event.preventDefault();
        if (!username.length > 0 || !password.length > 0) return props.handleWriteMessage('Please write username and password', false);
        const requestBody = { username: username, password: password, loggedIn: true };
        props.handleLogin(requestBody, event.target.name)
    }

    const handleChange = (event) => {
        props.resetMessageHandler()
        if (event.target.name === "logIn--username") setUsername(event.target.value)
        if (event.target.name === "logIn--password") setPassword(event.target.value)
    }
    return (
        <form className="logIn" onSubmit={logInOrRegister} name={registering ? 'POST' : 'PATCH'}>
            <h3>{registering ? "Create new user" : "Log in"}</h3>
            <div>
                <label htmlFor="logIn--username"> Username:</label>
                <input name="logIn--username" id="logIn--username" onChange={handleChange} autoFocus />
            </div>
            <div>
                <label htmlFor="logIn--password">Password:</label>
                <input name="logIn--password" type="password" id="logIn--password" onChange={handleChange} />
            </div>
            {registering
                ?
                <div className="login--buttons">
                    <button className="logIn--button"> Submit</button>
                    <button className="logIn--button" onClick={() => setRegistering(false)} type="button">Back</button>

                </div>
                :
                <div className="login--buttons">
                    <button className="logIn--button"> Log In</button>
                    <button className="logIn--button" onClick={() => setRegistering(true)} type="button">Register</button>
                </div>
            }

        </form>
    )
}