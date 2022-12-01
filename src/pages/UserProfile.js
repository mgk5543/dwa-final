import { React, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';

function UserProfile({ isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) //dependencies

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper">
                <h1>User Profile</h1>
                <p>{userInformation.displayName}</p>
                <p>{userInformation.email}</p>
            </div>
        </>
    );
}

export default UserProfile;