import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignupPage from './components/signup';
import LoginPage from './components/login';
import HomePage from './components/home';
import Dashboard from './components/admin/dashboard';
import EventPage from './components/EventPage';
import ProfilePage from './components/profile';
import AdminLogin from './components/admin/login';
import AddEventPage from './components/admin/AddEventPage';
import ResultPublicPage from './components/admin/ResultPublicPage';
import UserDetailsPage from './components/admin/UserDetailsPage';
import './navbar.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Load login and admin status on mount
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
        const adminStatus = sessionStorage.getItem("isAdmin") === "true";
        setLoggedIn(isLoggedIn);
        setIsAdmin(adminStatus);
    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
        setIsAdmin(false);
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("isAdmin");
    };

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

                    {isAdmin && (
                        <>
                            <li><Link to="/admin/dashboard">Home</Link></li>
                            <li><Link to="/admin/add-event">Add Event</Link></li>
                            <li><Link to="/admin/result-public">Result Public</Link></li>
                            <li><Link to="/admin/user-details">User Details</Link></li>
                        </>
                    )}

                    {!isAdmin && !loggedIn && <li><Link to="/admin/login">Admin</Link></li>}
                </ul>
                <div className="auth-links">
                    {loggedIn ? (
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>

            <Routes>
                {/* Default route */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public routes */}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
                <Route path="/admin/login" element={<AdminLogin setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />

                {/* Protected routes */}
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/EventPage" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                {/* Admin-only routes */}
                <Route
                    path="/admin/add-event"
                    element={
                        <ProtectedRoute>
                            {isAdmin ? <AddEventPage /> : <Navigate to="/login" replace />}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/result-public"
                    element={
                        <ProtectedRoute>
                            {isAdmin ? <ResultPublicPage /> : <Navigate to="/login" replace />}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/user-details"
                    element={
                        <ProtectedRoute>
                            {isAdmin ? <UserDetailsPage /> : <Navigate to="/login" replace />}
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
