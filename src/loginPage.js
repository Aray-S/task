import React from "react";
import {useNavigate} from 'react-router-dom';

import {auth, provider} from "./firebase"
import {signInWithPopup} from 'firebase/auth';

function LoginPage({setIsAuth}){
    let navigate=useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("user", auth.currentUser.displayName);
            setIsAuth(true)
            navigate("/")
        })
    }
    return <div className="loginPage">
        <button className='login-with-google-btn' onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    </div>;
}

export default LoginPage;