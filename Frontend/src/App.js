import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignupPage from './components/signup'; // Assuming you have the signup component
import LoginPage from './components/login';   // The newly created login component
import HomePage from './components/home'; // Athlete home page
import Dashboard from './components/dashboard'; // Coach dashboard
import EventPage from "./components/EventPage";
import './navbar.css';

const App = () => {
    return (
        <Router>
            <div className="navbar">
                <div className="logo">Sports </div> {/* Logo or title */}
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/EventPage">Events</Link></li>
                    <li><Link to="/">Results</Link></li>
                    <li><Link to="/">News</Link></li>
                    <li><Link to="/">Athletes</Link></li>
                </ul>
                <div className="auth-links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path={"/EventPage"} element={<EventPage />} />
            </Routes>
        </Router>
    );
};

export default App;