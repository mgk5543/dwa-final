import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Styles and components
import './App.css';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUser';
import LoginPage from './pages/Login';
import UserOverview from './pages/UserOverview';
import CreatePostPage from './pages/CreatePost';
import FindFriendsPage from './pages/FindFriends';
import Dashboard from './pages/Dashboard';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz8UyYj6vUzf7ANZAM9HWQeV98cbUrpoY",
  authDomain: "dwa-finalproj.firebaseapp.com",
  projectId: "dwa-finalproj",
  storageBucket: "dwa-finalproj.appspot.com",
  messagingSenderId: "998628744693",
  appId: "1:998628744693:web:0094eb6d27475d2e1714bc"
};
  
function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomePage 
          isLoading={isLoading} 
          isLoggedIn={isLoggedIn} 
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation}
         />
      ),
    },
    {
      path: "/user:id",
      element: (
        <UserOverview 
          isLoading={isLoading} 
          isLoggedIn={isLoggedIn} 
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation}
         />
      ),
    },
    {
        path: "/login",
        element: (
          <LoginPage 
            isLoading={isLoading} 
            isLoggedIn={isLoggedIn}
            userInformation={userInformation}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation}
          />
        ),//prop isLogged in tells us if false, go to login or create, if true, go to user profile
    },
    {
        path: "/create-user",
        element: (
          <CreateUserPage 
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            userInformation={userInformation}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation} />
        ),
    },
    {
      path: "/create-post",
      element: (
        <CreatePostPage 
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
    {
      path: "/find-friends",
      element: (
        <FindFriendsPage 
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Dashboard 
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
  ]);
  //ensure app is initialized when it is ready to be
  useEffect(() => { //only do after first render
    //initialize firebase
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, [])

  //check to see if user is logged in
  //if logged in, load page and check user status
  //set state accordingly
  useEffect(() => {
    if(appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) =>{
        if(user) {
          //user is signed in, see docs for a list of available properties
          setUserInformation(user);
          setIsLoggedIn(true);
        }
        else {
          //user is signed out
          setUserInformation({});
          setIsLoggedIn(false);
        }
        //whenever state changes setLoading to false
        setIsLoading(false);
      })
    }
  }, [appInitialized])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;