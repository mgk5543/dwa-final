import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router";
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


function LoginPage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn && !isLoading) return navigate('/'); //Home
    }, [isLoggedIn, isLoading, navigate])

    const [errors, setErrors] = useState();

    const loginUser = useCallback((e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation({
                        email: user.email,
                        displayName: user.displayName,
                        uid: user.uid,
                        accessToken: user.accessToken,
                    });
                    setErrors();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage});
                    setErrors(errorMessage);
                });
    }, [setErrors, setIsLoggedIn, setUserInformation]);
    
    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation}/>
            <div className="PageWrapper">
                <h1>Login</h1>
                <LoginForm loginUser={loginUser}/>
                <p>{errors}</p>
            </div>
        </>
    );
}

export default LoginPage;