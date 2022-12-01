import React from 'react';
import { getAuth, signOut } from 'firebase/auth'

function Header( {isLoggedIn, setIsLoggedIn, setUserInformation}) {
    function logout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation({});
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    return (
        <header>
            <nav>
                {isLoggedIn && (<a href="/"><p>Home</p></a>)}
                {!isLoggedIn && (<a href="/login"><p>Login</p></a>)}
                {!isLoggedIn && (<a href="/create"><p>Create User</p></a>)}
                {isLoggedIn && (<p onClick={() => logout()} className="logout-button">Log Out</p>)}
            </nav>
        </header>
    );
}

export default Header;