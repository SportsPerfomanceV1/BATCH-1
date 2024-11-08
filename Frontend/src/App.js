import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignupPage from './components/signup';
import LoginPage from './components/login';
import HomePage from './components/home';
import Dashboard from './components/dashboard';
import EventPage from './components/EventPage';
import ProfilePage from "./components/profile";
import './navbar.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
        setLoggedIn(isLoggedIn);
    }, []);

    const ProtectedRoute = ({ children }) => {
        return loggedIn ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <div className="navbar">
                <div className="logo">Sports</div>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/EventPage">Events</Link></li>
                    <li><Link to="/">Results</Link></li>
                    <li><Link to="/">News</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
                <div className="auth-links">
                    {loggedIn ? (
                        <button onClick={() => { setLoggedIn(false); sessionStorage.removeItem("loggedIn"); }}className="logout-button">Logout</button>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/EventPage" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
                <Route path={"/profile"} element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
