import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignupPage from './signup'; // Assuming you have the signup component
import LoginPage from './login';   // The newly created login component
import HomePage from './home'; // Athlete home page
import Dashboard from './dashboard'; // Coach dashboard

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
