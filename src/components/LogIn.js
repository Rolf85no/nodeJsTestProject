
import React from 'react';

export default function LogIn(props) {
    return (
        <form className="logIn">
            <div>
                <label htmlFor="logIn--username"> Username:</label>
                <input name="logIn--username" />
            </div>
            <div>
                <label htmlFor="logIn--password">Password:</label>
                <input name="logIn--password" type="password" />
            </div>

            <button className="logIn--button" onClick={props.handleLogin}> Log In</button>
        </form>
    )
}