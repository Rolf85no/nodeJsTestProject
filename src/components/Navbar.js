import React from "react";

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <h3> POST STUFF</h3>
            {props.loggedIn && <button onClick={props.handleLogout} className="navbar--logout">Log Out</button>}
        </nav>
    )
}