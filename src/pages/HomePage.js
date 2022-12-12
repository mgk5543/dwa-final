import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

import { getDocs, getFirestore, collection } from "firebase/firestore";
import { getStorage,ref } from 'firebase/storage';
import Header from '../components/Header';
import Post from '../components/Post'
import { async } from '@firebase/util';

const queryData = async (app) => {
    if (!app) return [];
    const db = getFirestore(app);
    const data = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
};

function HomePage({ app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) //dependencies

    useEffect(() => {
        if(!app) return;
        queryData(app).then(setPostData);
    }, [app])

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper">
                <div className="cover">
                    <div className="cover--left">
                        <h1>brandspiration</h1>
                        <h3>Simple branding templates to start off your designs!</h3>
                    </div>
                    <div className="cover--right">
                        <h2 style={{color: "#D8AC90"}}>1 IMAGE!</h2>
                        <h2 style={{color: "#D83D66"}}>2 FONTS!</h2>
                        <h2 style={{color: "#15183B"}}>3 COLORS!</h2>
                    </div>
                </div>
                {isLoggedIn && (
                    <li className="create-post--home">
                        <Link to="/create-post"><p>Create your own</p></Link>
                    </li>
                )}
                {!isLoggedIn && (
                    <li className="create-post--home">
                        <Link to="/login"><p>Create your own</p></Link>
                    </li>
                )}
                <a className="explore--home" href="#scroll-to">Explore</a>
                <section id="scroll-to">
                    {postData.map((post) => (
                        <Post
                            caption={post.caption}
                            imageAlt={post.imageAlt}
                            imageUrl={post.imageUrl}
                            userId={post.userId}
                            userName={post.userName}
                        />
                    ))}
                </section>
            </div>
        </>
    );
}

export default HomePage;