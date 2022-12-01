import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useEffect, React, useState, useCallback } from 'react';
import CreateUserForm from '../components/CreateUserForm';
import Header from '../components/Header';

function CreateUserPage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn && !isLoading) return navigate('/'); //Home
    }, [isLoggedIn, isLoading, navigate])

    const [errors, setErrors] = useState();

    const signUpUser = useCallback(
        (e) => {
            e.preventDefault();

            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;

            //console.log({email, password});
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, password)
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
        },
        [setErrors, setIsLoggedIn, setUserInformation]
    );
    

    return (
        <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation}/>
            <div className="PageWrapper">
                <h1>Create User</h1>
                <CreateUserForm signUpUser={signUpUser}/>
                <p>{errors}</p>
            </div>
        </>
    );
}

export default CreateUserPage;