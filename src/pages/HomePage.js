import { React, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Post from '../components/Post'

function HomePage({ isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) //dependencies

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper">
                <h1>Home Page</h1>
                <Post/>
            </div>
        </>
    );
}

export default HomePage;