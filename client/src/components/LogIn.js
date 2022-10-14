
import React from 'react';

export default function LogIn(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const [methodType, setMethodType] = React.useState("");
    const [registering, setRegistering] = React.useState(false);

    const logInOrRegister = (event) => {
        event.preventDefault();
        const requestBody = { username: username, password: password, loggedIn: true };
        props.handleLogin(requestBody, event.target.name)
    }

    const handleChange = (event) => {
        props.resetErrorHandler()
        if (event.target.name === "logIn--username") setUsername(event.target.value)
        if (event.target.name === "logIn--password") setPassword(event.target.value)
    }
    return (
        <form className="logIn" onSubmit={logInOrRegister} name={registering ? 'POST' : 'PATCH'}>
            <h3>{registering ? "Create new user" : "Log in"}</h3>
            <div>
                <label htmlFor="logIn--username"> Username:</label>
                <input name="logIn--username" id="logIn--username" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="logIn--password">Password:</label>
                <input name="logIn--password" type="password" id="logIn--password" onChange={handleChange} />
            </div>
            {registering
                ?
                <div className="login--buttons">
                    <button className="logIn--button" disabled={username.length === 0 || password.length === 0}> Submit</button>
                    <button className="logIn--button" onClick={() => setRegistering(false)} type="button">Back</button>

                </div>
                :
                <div className="login--buttons">
                    <button className="logIn--button" disabled={username.length === 0 || password.length === 0}> Log In</button>
                    <button className="logIn--button" onClick={() => setRegistering(true)} type="button">Register</button>
                </div>
            }

        </form>
    )
}