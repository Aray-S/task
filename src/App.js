import "./App.css"

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import HomePage from "./homePage"
import LoginPage from "./loginPage"
import SingerPage from "./singerPage/SingerPage"

import { useState } from "react"

import { signOut } from 'firebase/auth'
import {auth} from "./firebase"


function App (){
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [user] = useState(localStorage.getItem("user"));
    
    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            window.location.pathname = "/login"
        })
    }
    
    return (
    <Router>
        <nav>
            <Link to="/"> Home </ Link>
            {!isAuth? <Link to="/login">Login</Link> : <button onClick={signUserOut}>Log Out</button>}<br/>
            {isAuth? <p>Posting as: {user} </p> : <p>You're not logged in.</p>}
        </ nav>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setIsAuth={setIsAuth}/>} />
            <Route path="/artist" element={<SingerPage singerName="Fake Singer"/>}/>
        </Routes>
    </ Router>
    );

}

export default App;
