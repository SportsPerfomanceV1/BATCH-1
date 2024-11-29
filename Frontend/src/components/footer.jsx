import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = ({ onLogout }) => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>Athletyics</h3>
                <p>Hello, Welcome to Athletyics!</p>
                <p>Empowering athletes, connecting communities, and celebrating the spirit of sports.</p>
            </div>
            <div className="footer-section">
                <h3>Links</h3>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/registrations">Registrations</Link></li>
                    <li><Link to="/results">Results</Link></li>
                    <li><Link to="/news">News</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Account</h3>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button className='logout-link' onClick={onLogout}>Logout</button></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;