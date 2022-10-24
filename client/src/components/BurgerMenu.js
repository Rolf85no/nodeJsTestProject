import React from "react";

export default function BurgerMenu({ handleLogout }) {
    const linksList = React.useRef(null);
    const showLinks = () => {
        const burgerLines = document.querySelector('.burgerMenu--ul');
        if (linksList.current.classList.contains('hidden')) {
            linksList.current.classList.remove('hidden');
            burgerLines.classList.add('cross');
        }
        else {
            linksList.current.classList.add('hidden')
            burgerLines.classList.remove('cross');

        }
        ;
    }

    return (
        <section className="burgerMenu">
            <ul onClick={showLinks} className="burgerMenu--ul">
                <li className="burgerMenu--lines"></li>
                <li className="burgerMenu--lines"></li>
                <li className="burgerMenu--lines"></li>
            </ul>
            <ul className="burgerMenu--linksList hidden" ref={linksList}>
                <li className="burgerMenu--linksList--links"><button>Edit profile</button></li>
                <li className="burgerMenu--linksList--links" ><button onClick={handleLogout} name="PATCH">Log out </button></li>
            </ul>
        </section>
    )
}