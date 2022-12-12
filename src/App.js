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
  const [appInitialized, setAppInitialized] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAppInitialized(app);
  }, []);

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomePage 
          app={appInitialized}
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
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation} />
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;