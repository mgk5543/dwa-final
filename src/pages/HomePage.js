import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getDocs, getFirestore, collection } from "firebase/firestore";
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
                <h1>Home Page</h1>
                {postData.map((post) => (
                    <Post
                        caption={post.caption}
                        imageAlt={post.imageAlt}
                        imageUrl={post.imageUrl}
                        userId={post.userId}
                        userName={post.userName}
                    />
                ))}
            </div>
        </>
    );
}

export default HomePage;