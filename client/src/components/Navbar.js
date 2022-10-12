import React from "react";
import BurgerMenu from "./BurgerMenu";

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <h3> POST STUFF</h3>
            {props.loggedIn && <BurgerMenu
                handleLogout={props.handleLogout}
            />}
            {props.loggedIn && <button onClick={props.handleLogout} className="navbar--logout" name="PATCH">Log Out</button>}
        </nav>
    )
}