import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ loggedIn, onLogout }) => {
    const userType = sessionStorage.getItem('userType');
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/home" className="logo">Athletyics</Link>
                <ul>
                    {(userType === 'admin') ? (
                        <>
                            <li><Link to="/admin-dashboard">Dashboard</Link></li>
                            <li><Link to="/admin-events">Events</Link></li>
                            <li><Link to="/admin-results">Results</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/admin-profile">Profile</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/results">Results</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </>
                    )}
                </ul>
                <div className="auth-links">
                    {loggedIn ? (
                        <button onClick={onLogout} className="logout-button">Logout</button>
                    ) : (
                        <Link to="/login">Login/Signup</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;