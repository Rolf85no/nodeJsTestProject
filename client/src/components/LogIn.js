
import React from 'react';

export default function LogIn(props) {
    const inputUser = React.useRef('');
    const inputPassword = React.useRef('')

    return (
        <form className="logIn" onChange={props.resetErrorHandler}>
            <div>
                <label htmlFor="logIn--username"> Username:</label>
                <input name="logIn--username" ref={inputUser} id="logIn--username" />
            </div>
            <div>
                <label htmlFor="logIn--password">Password:</label>
                <input name="logIn--password" type="password" ref={inputPassword} id="logIn--password" />
            </div>
            <div className="login--buttons">
                <button className="logIn--button" name="PATCH" onClick={props.handleLogin}> Log In</button>
                <button className="logIn--button" name="POST" onClick={props.handleLogin}> Register</button>
            </div>

        </form>
    )
}